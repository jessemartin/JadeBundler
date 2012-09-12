var express = require('express'),
  server = express(),
  fs = require('fs'),
  jadeBundler = require('jadeBundler');

// Compile specific views
jadeBundler.bundle(process.cwd() + '/templates');

// Compile other views
// jadeBundler.compile(process.cwd() + '/node_modules/other_view_directory');

// Define and export the views
jadeBundler.exportJson('./public/js/allViews.js');

server.use(express.staticCache());
server.use(express['static'](process.cwd() + '/public'));
server.use(express['static'](process.cwd() + '/node_modules/jade'));

server.get('/', function (req, res) {
  res.sendfile('./public/index.html');
});

server.listen(8080);
