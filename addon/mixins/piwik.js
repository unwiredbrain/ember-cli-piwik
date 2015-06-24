import Ember from 'ember';

/**
 * Implements the logic to use the Piwik tracker to send pageview events.
 *
 * Make sure to extend the main application router with this mixin to enable the
 * automatic pageview tracking when transitioning into a new route.
 *
 * @class PiwikMixin
 * @since 0.1.0
 */
export default Ember.Mixin.create({
  /**
   * Debug utility.
   *
   * @function debug
   * @param {String} message The message to log.
   * @since 0.1.0
   */
  debug: function() {
    if (this.config.debug) {
      Ember.Logger.debug(arguments);
    }
  },

  /**
   * Generic `_paq.push` entry point.
   *
   * @function push
   * @param {Array} tracking The Piwik tracking command.
   * @since 0.1.0
   */
  push: function(tracking) {
    this.debug(tracking.slice(0));

    // This is going outside of Ember, make sure it happens in its own runloop.
    Ember.run(function() {
      window._paq.push(tracking);
    });
  },

  /**
   * Calls the Piwik tracker to send a pageview.
   *
   * @function trackPageView
   * @param {String} url The URL to track.
   * @since 0.1.0
   */
  trackPageView: function(url) {
    this.push(['trackPageView', url]);
  }
});
