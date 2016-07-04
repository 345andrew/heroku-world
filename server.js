/**
 * server.js
 * Entry point into the application.  This is a simple listener
 */
var restify = require('restify'),
fs = require('fs');

var server = restify.createServer({
  name: 'heroku-world',
  version: "1.0.0"
});

/**
 * Sends a canned response.
 */
function sendHerokuWorld(req, res, next) {
  res.send('heroku world');
  return next();
}

server.get("/", sendHerokuWorld);

server.listen(process.env.PORT || 8080);
