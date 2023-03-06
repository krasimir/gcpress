const express = require('express');

const { ADMIN_ROUTE } = require('./config');
const admin = require('./handlers/admin');
const home = require('./handlers/home');

const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/../client/public', { maxAge: 604800000 })); // one week

app.use(`/${ADMIN_ROUTE}/api/models`, admin.models());
app.use(`/${ADMIN_ROUTE}/api/content`, admin.content());
app.get(`/${ADMIN_ROUTE}`, admin.ui);
app.get('/', home);

// not found
app.use((req, res, next) => {
  req.notFound = true;
  next();
}, home);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});