const { ADMIN_ROUTE } = require('../config');

const { db } = require('../helpers/admin');

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
        <div id="root"></div>
        <script>
          window.API = '/${ADMIN_ROUTE}/api/';
        </script>
        <script src="/gcpress.js"></script>
      </body>
      </html>
  `);
}

function models(req, res) {

  res.json({});
}

function content(req, res) {

  res.json({});
}

module.exports = {
  ui,
  models,
  content
}