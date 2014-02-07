var express = require('express'),
  livereload = require('connect-livereload'),
  config = require('./config'),
  app = express(),
  env = app.get('env'),
  port = process.env.PORT || config.serverPort || 3000;

if (env === 'development') {
  app.use(livereload());
  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

app.use(express.compress());
app.use(express.urlencoded());
app.use(express.json());

app.use(express.static('./public'));

app.listen(port);
console.log('Express server (' + env + ') running on port ' + port);
