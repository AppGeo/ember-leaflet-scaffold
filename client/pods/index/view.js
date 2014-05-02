var IndexView = Ember.View.extend({
  initLeaflet: function () {
    this.get('leaflet').attachTo(this.$());
  }.on('didInsertElement')
});

module.exports = IndexView;
