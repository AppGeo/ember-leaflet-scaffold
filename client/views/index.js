App.IndexView = Ember.View.extend({
  initLeaflet: function () {
    var $this = this.$(),
      leaflet = this.get('leaflet'),
      map = leaflet.attachTo($this);
  }.on('didInsertElement')
});
