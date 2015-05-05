import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';
import config from '../../config/environment';


var App;


module('Acceptance - Injection', {
  beforeEach: function () {
    App = startApp();
  },

  afterEach: function () {
    Ember.run(App, 'destroy');
  }
});


test('should inject two script tags in the html', function (assert) {
  assert.expect(4);

  visit('/');
  andThen(function () {
    var sid, php, js;

    // Use the values from the dummy config
    sid = config.piwik.sid;
    php = '//' + config.piwik.url + '/piwik.php';
    js = '//' + config.piwik.url + '/piwik.js';

    // Make sure the _paq object is there after the injection
    assert.ok(Ember.isArray(window._paq));

    // Inspect the head script for the right replacements
    assert.equal(window._paq[0][1], sid);
    assert.equal(window._paq[1][1], php);

    // Inspect the body script src attribute
    assert.equal(Ember.$('script').last().attr('src'), js);
  });
});
