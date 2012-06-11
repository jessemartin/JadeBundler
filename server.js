var express = require('express'),
  server = express.createServer(),
  fs = require('fs'),
  jadeBundler = require('jadeBundler');

// Compile specific views
jadeBundler.bundle(process.cwd() + '/templates');

// Compile general views
// jadeBundler.compile(process.cwd() + '/node_modules/ensPrivacyUserInterface/public/templates');

// Define and export the views
jadeBundler.exportJson('./public/js/allViews.js');

server.use(express.staticCache());
server.use(express['static'](process.cwd() + '/public'));
server.use(express['static'](process.cwd() + '/node_modules/jade'));

server.get('/', function (req, res) {
  res.sendfile('./public/index.html');
});

server.listen(8080);
