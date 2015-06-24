import Ember from 'ember';
import PiwikMixin from 'ember-cli-piwik/mixins/piwik';

/**
 * Injects the Piwik mixin into routes and controllers taking care of the host
 * app configuration and listens for `didTransition` events emitted by the
 * `Ember.Router` to send `trackPageView` events to the Piwik server.
 *
 * @public
 * @since 0.1.0
 */
export function initialize(container, application) {
  var router = container.lookup('router:main');
  var config = container.lookupFactory('config:environment').piwik;
  var service = Ember.Object.extend(PiwikMixin, {config: config});

  application.register('service:piwik', service, {singleton: true});
  application.inject('route', 'piwik', 'service:piwik');
  application.inject('controller', 'piwik', 'service:piwik');

  /** @see {@link http://emberjs.com/api/classes/Ember.Route.html#event_didTransition|didTransition event} */
  router.on('didTransition', function() {
    var piwik = container.lookup('service:piwik');
    var url = Ember.get(this, 'url');

    piwik.trackPageView(url);
  });
}

/**
 * The default exports.
 *
 * @public
 * @since 0.1.0
 */
export default {
  name: 'piwik',
  initialize: initialize
};
