module.exports = function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  if (req.notFound) {
    res.status(404);
  }
  res.send('Hey!');
}