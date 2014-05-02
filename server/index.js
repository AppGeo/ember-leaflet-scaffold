var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var serveStatic = require('serve-static');
var app = express();
var env = app.get('env');

if (env === 'development') {
  var logger = require('morgan');
  var livereload = require('connect-livereload');
  var errorHandler = require('errorhandler');

  app.use(livereload());
  app.use(logger('dev'));
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

app.use(compression());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(serveStatic('./static'));
app.use(serveStatic('./dist'));


module.exports = app;
