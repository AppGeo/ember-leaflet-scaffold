var ApplicationView = Ember.View.extend({
  isSidebarOpen: false,

  actions: {
    toggleSidebar: function () {
      this.toggleProperty('isSidebarOpen');
    }
  } 
});

module.exports = ApplicationView;
