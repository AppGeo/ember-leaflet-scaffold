var Ember = require('ember');
var L = require('leaflet');

require('collapse');

var App = Ember.Application.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
});

var LeafletInit = Ember.Object.extend({
  map: null,
  initMap: function (options) {
    var $container = Ember.$('<div/>'),
      map;

    options = options || {};

    $container.attr('id', options.containerId || 'map');
    map = L.map($container.get(0), {
      center: new L.LatLng(41.80408, -72.47131),
      zoom: 5
    });
    
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.set('map', map);
    this.set('$container', $container);
  }.on('init'),

  attachTo: function ($el) {
    var $container = this.get('$container'),
      map = this.get('map');

    $container.appendTo($el);
    map.invalidateSize(true);
  }
});

App.deferReadiness();
App.register('leaflet:main', LeafletInit);
App.inject('view', 'leaflet', 'leaflet:main');
App.advanceReadiness();

window.App = App;

module.exports = App;
