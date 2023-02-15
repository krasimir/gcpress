const { db } = require('./admin');

const express = require('express');

const oneWeek = 604800000;
const app = express();

app.use(express.static(__dirname + '/../public', { maxAge: oneWeek }));

app.get('/', (req, res) => {
  res.send('ok');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});