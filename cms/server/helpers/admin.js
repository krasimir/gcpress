// firebase-admin: https://firebase.google.com/docs/reference/admin/node/
// firebase firestore: https://firebase.google.com/docs/firestore/query-data/queries
// firebase storage: https://googlecloudplatform.github.io/google-cloud-node/#/docs/storage/latest/storage/bucket

const admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { SERVICE_ACCOUNT_KEY, BUCKET_NAME } = require("../config");

const serviceAccount = require(SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();
const bucket = getStorage().bucket(BUCKET_NAME);

module.exports = { admin, db, bucket };