/* global _paq */
import Ember from 'ember';


/**
 * Implements the logic to use the Piwik tracker to send pageview events.
 *
 * Make sure to extend the main application router with this mixin to enable the
 * automatic pageview tracking when transitioning into a new route.
 *
 * @class PageViewTrackerMixin
 * @example
 * import Piwik from 'ember-cli-piwik/mixins/page-view-tracker'
 * var Router = Ember.Router.extend(Piwik, {
 *   // ...
 * });
 * @see {@link http://emberjs.com/api/classes/Ember.Route.html#event_didTransition|didTransition event}
 * @since 0.0.2
 */
export default Ember.Mixin.create({
  /**
   * Calls the Piwik tracker to send a pageview.
   *
   * Listens to the `didTransition` event.
   *
   * @member {Function} trackPiwikPageView
   * @since 0.0.2
   */
  trackPiwikPageView: Ember.on('didTransition', function () {
    _paq.push([ 'trackPageView', Ember.get(this, 'url') ]);
  })
});
