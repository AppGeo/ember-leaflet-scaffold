// this file is auto-generated, do not edit
require('ember'); // get Ember global around for the templates

Ember.DefaultResolver.reopen({
  resolveTemplate: function(parsedName) {
    this.useRouterNaming(parsedName);
    return this.resolveOther(parsedName);
  }  
});

var App = require('./app/config/application');
App.Router.map(require('./app/config/routes'));




App.SidebarTemplate = require('./app/templates/sidebar.hbs');
App.IndexTemplate = require('./pods/index/template.hbs');
App.AboutTemplate = require('./pods/about/template.hbs');
App.IndexView = require('./pods/index/view');
App.AboutView = require('./pods/about/view');

module.exports = App;
