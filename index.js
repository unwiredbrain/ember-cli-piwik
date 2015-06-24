/* jshint node: true */
'use strict';

var assign = require('lodash.assign');

/**
 * The default options.
 *
 * @constant
 * @namespace
 * @private
 * @readOnly
 * @since 0.1.0
 * @type {Object}
 */
var defaults = {
  /**
   * The Piwik options root.
   *
   * @namespace
   * @since 0.1.0
   * @type {Object}
   */
  piwik: {
    /**
     * Let the addon log debug messages about what's going on. `false` by default.
     *
     * @default false
     * @since 0.1.0
     * @type {Boolean}
     */
    debug: false
  }
};

/**
 * The raw templates.
 *
 * @constant
 * @member {String} head
 * @member {String} body
 * @private
 * @readOnly
 * @since 0.0.2
 */
var templates = {
  // jscs:disable maximumLineLength
  head: '<script>var _paq=[["setSiteId",{{PIWIK_SID}}],["setTrackerUrl","{{PIWIK_URL}}/piwik.php"],["enableLinkTracking"]]</script>',
  body: '<script src="{{PIWIK_URL}}/piwik.js" async defer></script>'
  // jscs:enable maximumLineLength
};

/**
 * Checks that the minimum configuration has been set.
 *
 * @param {Object} config The application config.
 * @private
 * @return {Boolean} Returns `true` if configured, `false` otherwise.
 * @since 0.0.2
 */
function isConfigured(config) {
  if (config.piwik && config.piwik.url && config.piwik.sid) {
    return true;
  }

  return false;
}

/**
 * Hydrates the templates with the proper values.
 *
 * @param {String} template The template to hydrate.
 * @param {String} url The Piwik endpoint URL.
 * @param {Number} sid The Piwik site ID.
 * @private
 * @return {String} Returns the hydrated template.
 * @since 0.0.2
 */
function hydrate(template, url, sid) {
  template = template.replace('{{PIWIK_URL}}', url);
  template = template.replace('{{PIWIK_SID}}', sid);

  return template;
}

/**
 * @public
 * @type {Object}
 */
module.exports = {
  /**
   * The addon name.
   *
   * @constant
   * @public
   * @readOnly
   * @type {String}
   * @since 0.0.2
   */
  name: 'ember-cli-piwik',

  /**
   * Extends the addon default configuration with the host application's one.
   *
   * @function config
   * @param {String} env The current build environment.
   * @param {Object} baseConfig The host application configuration.
   * @public
   * @return {Object} Returns the altered host app configuration.
   * @since 0.1.0
   */
  config: function(env, baseConfig) {
    return assign({}, defaults, baseConfig);
  },

  /**
   * Injects the templates into the HTML page at build time.
   *
   * Uses the `-footer` variation of the `head` and `body` tags to make sure the
   * `<script>` tag are the last injection.
   *
   * @function contentFor
   * @param {String} type The tag type.
   * @param {Object} config The application config.
   * @public
   * @return {String} Returns the content to be injected.
   * @since 0.0.2
   */
  contentFor: function(type, config) {
    if (isConfigured(config)) {
      if (type === 'head-footer') {
        return hydrate(templates.head, config.piwik.url, config.piwik.sid);
      }

      if (type === 'body-footer') {
        return hydrate(templates.body, config.piwik.url, config.piwik.sid);
      }
    }

    // Keep it consistent: don't add anything at all.
    return '';
  }
};
