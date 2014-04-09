module.exports = {
 "jquery": "$",
  "handlebars": "Handlebars",
  "ember": {
    "exports": "Ember",
    "depends": [
      "jquery:jQuery",
      "handlebars:Handlebars"
    ]
  },
  'ember-data': {
    exports: 'DS',
    depends: ['ember']
  },
  'collapse': {
    depends: ['jquery:jQuery']
  }
};
