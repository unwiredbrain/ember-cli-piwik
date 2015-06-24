import { module, test } from 'qunit';
import Ember from 'ember';
import startApp from '../../helpers/start-app';
import { initialize } from '../../../initializers/piwik';
import PiwikMixin from 'ember-cli-piwik/mixins/piwik';

var application;
var container;

module('mixin:piwik', {
  beforeEach: function() {
    application = startApp();
    container = application.__container__;
  },

  afterEach: function() {
    container = undefined;
    Ember.run(application, 'destroy');
  }
});

test('should work', function(assert) {
  var config;
  var Piwik;
  var subject;

  initialize(container, application);

  assert.expect(3);

  visit('/');

  andThen(function() {
    config = application.registry.lookupFactory('config:environment').piwik;
    Piwik = Ember.Object.extend(PiwikMixin, {config: config});
    subject = Piwik.create();

    assert.ok(subject, 'can be embedded');
  });

  andThen(function() {
    var called = false;
    var originalDebug = subject.debug;

    subject.debug = function() {
      called = true;
    };

    subject.push(['trackPageView', '/']);

    assert.equal(called, true, '`push` calls `debug`');

    subject.debug = originalDebug;
  });

  andThen(function() {
    var called = false;
    var originalPush = subject.push;

    subject.push = function() {
      called = true;
    };

    subject.trackPageView('/');

    assert.equal(called, true, '`trackPageView` calls `push`');

    subject.push = originalPush;
  });
});
