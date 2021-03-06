import Ember from 'ember';

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

export default {
  name: 'map',

  initialize: function (container, application) {
    container.register('leaflet:main', LeafletInit);
    application.inject('view', 'leaflet', 'leaflet:main');
  }
};
