/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('vendor/leaflet/dist/leaflet-src.js');

// Copy fontawesome fonts
var fonts = pickFiles('vendor/fontawesome/fonts', {
  srcDir: '/',
  files: ['**/*.{woff,ttf,otf,eot,svg}'],
  destDir: '/assets/fonts'
});

var images = pickFiles('vendor/leaflet/dist/images', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets/images'
});

// Merge the app tree and our new font assets.
module.exports = mergeTrees([app.toTree(), fonts, images]);
