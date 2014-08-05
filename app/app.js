import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'els', // TODO: loaded via config
  podModulePrefix: 'els/pods',
  Resolver: Resolver
});

loadInitializers(App, 'els');

export default App;
