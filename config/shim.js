module.exports = {
  'handlebars': 'Handlebars',
  'ember': {
    exports: 'Ember',
    depends: ['jquery', 'handlebars']
  },
  'ember-data': {
    exports: 'DS',
    depends: ['ember']
  },
  'collapse': {
    depends: ['jquery']
  }
};
