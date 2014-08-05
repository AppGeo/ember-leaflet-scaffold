import Ember from 'ember';

export default Ember.View.extend({
  isSidebarOpen: false,

  initLeaflet: function () {
    this.get('leaflet').attachTo(this.$().find('#map'));
  }.on('didInsertElement'),

  actions: {
    toggleSidebar: function () {
      this.toggleProperty('isSidebarOpen');
    }
  }
});
