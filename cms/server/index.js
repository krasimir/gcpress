const express = require('express');

const home = require('./handlers/home');

const app = express();

app.use(express.static(__dirname + '/../client/public', { maxAge: 604800000 })); // one week

// home and default page
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