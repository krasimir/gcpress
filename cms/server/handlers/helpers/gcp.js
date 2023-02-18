// firebase-admin: https://firebase.google.com/docs/reference/admin/node/
// firebase firestore: https://firebase.google.com/docs/firestore/query-data/queries
// firebase storage: https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket

const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { SERVICE_ACCOUNT_KEY, BUCKET_NAME } = require("../../config");

const serviceAccount = require(SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
const bucket = getStorage().bucket(BUCKET_NAME);

async function ensureCollection(collection) {
  const collections = await db.listCollections();
  if (!collections.find(c => c.id === collection)) {
    await db.collection(collection).doc('__').set({})
    console.log(`"${collection}" collection created.`);
  }
}
async function getAll(collection) {
  let data = [], cursor;
  await ensureCollection(collection);
  async function query() {
    const request = db
      .collection(collection)
      .where('__name__', '!=', '__')
      .orderBy('__name__')
      .limit(50);
    const res = cursor
      ? await request.startAfter(cursor).get()
      : await request.get();
    if (res.size === 0) return data;
    cursor = res.docs[res.docs.length - 1];
    data = data.concat(res.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })));
    return query();
  }
  return await query();
}

module.exports = {
  admin,
  db,
  bucket,
  getAll
};