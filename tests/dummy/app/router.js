import Ember from 'ember';
import config from './config/environment';
import Piwik from 'ember-cli-piwik/mixins/page-view-tracker';

var Router = Ember.Router.extend(Piwik, {
  location: config.locationType
});

Router.map(function() {
});

export default Router;
