var chalk = require('chalk');
var app = require('./server');
var config = require('./server/config');
var port = process.env.PORT || config.serverPort || 3000;

app.listen(port, function () {
  console.log(chalk.green('Express server (' + app.get('env') + ') running on port ' + port));
});
