import {
  module,
  test
} from 'qunit';
import Ember from 'ember';
import startApp from '../../helpers/start-app';
import PageViewTrackerMixin from 'ember-cli-piwik/mixins/page-view-tracker';


var application, originalPush;


module('mixin:page-view-tracker', {
  beforeEach: function () {
    application = startApp();
    originalPush = window._paq.push;
  },

  afterEach: function () {
    Ember.run(application, 'destroy');
    window._paq.push = originalPush;
  }
});


// Replace this with your real tests.
test('it works', function (assert) {
  var PageViewTrackerObject = Ember.Object.extend(PageViewTrackerMixin);
  var subject = PageViewTrackerObject.create();
  assert.ok(subject);
});


test('shoud call the tracker when transitioning into a route', function (assert) {
  var called = false;

  window._paq.push = function () {
    called = true;
  };

  assert.expect(1);

  visit('/');
  andThen(function () {
    assert.equal(called, true);
  });
});
