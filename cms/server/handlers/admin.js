const { ADMIN_ROUTE, MODELS_COLLECTION, CONTENT_COLLECTION } = require('../config');

const { getAll } = require('./helpers/gcp');

function ui(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GCPress</title>
        <link href="/gcpress.css" rel="stylesheet">
      </head>
      <body>
        <div id="root" class="max1000 mxauto"></div>
        <script>
          window.API = '/${ADMIN_ROUTE}/api/';
        </script>
        <script src="/gcpress.js"></script>
      </body>
      </html>
  `);
}

function handleCollectionRequests(collection) {
  return async function(req, res) {
    if (req.method === 'GET') {
      try {
        const models = await getAll(collection);
        res.json(models);
        return;
      } catch(error) {
        console.log(error);
        res.status(500);
        res.json({ error: 'Error getting data' });
        return;
      }
    }
    res.status(400);
    res.json({ error: 'Unsupported method' });
  }
}
function models() {
  return handleCollectionRequests(MODELS_COLLECTION);
}
function content(req, res) {
  return handleCollectionRequests(CONTENT_COLLECTION);
}

module.exports = {
  ui,
  models,
  content
}