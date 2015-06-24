import { module, test } from 'qunit';
import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { initialize } from '../../../initializers/piwik';

var application;
var container;
var originalPush;

module('initializer:piwik', {
  beforeEach: function() {
    application = startApp();
    container = application.__container__;

    originalPush = window._paq.push;
  },

  afterEach: function() {
    container = undefined;
    Ember.run(application, 'destroy');

    window._paq.push = originalPush;
  }
});

test('should inject into routes and controllers', function(assert) {
  initialize(container, application);

  assert.expect(2);

  visit('/');

  andThen(function() {
    var route = application.registry.lookup('route:index');
    var controller = application.registry.lookup('controller:index');

    assert.ok(Ember.get(route, 'piwik'), 'can inject in routes');
    assert.ok(Ember.get(controller, 'piwik'), 'can inject in controllers');
  });
});

test('should attach a listener to the `didTransition` event', function(assert) {
  var called = false;

  window._paq.push = function() {
    called = true;
  };

  assert.expect(1);

  visit('/');
  andThen(function() {
    assert.equal(called, true, 'transitioning into route triggers a call to `_paq.push`');
  });
});
