/* jshint node: true */
'use strict';


/**
 * The raw templates.
 *
 * @private
 * @member {String} head
 * @member {String} body
 */
var templates = {
  head: '<script>var _paq=[["setSiteId",{{PIWIK_SID}}],["setTrackerUrl","//{{PIWIK_URL}}/piwik.php"],["enableLinkTracking"]]</script>',
  body: '<script src="//{{PIWIK_URL}}/piwik.js" async defer></script>'
};


/**
 * Checks that the minimum configuration has been set.
 *
 * @private
 * @param {Object} config The application config.
 * @return {Boolean} Returns `true` if configured, `false` otherwise.
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
 * @private
 * @param {String} template The template to hydrate.
 * @param {String} url The Piwik endpoint URL.
 * @param {Number} sid The Piwik site ID.
 * @return {String} Returns the hydrated template.
 */
function hydrate(template, url, sid) {
  template = template.replace('{{PIWIK_URL}}', url);
  template = template.replace('{{PIWIK_SID}}', sid);

  return template;
}


/**
 * Implements the logic to inject a hydrated template into the HTML page.
 *
 * @since 0.0.2
 * @type {Object}
 */
module.exports = {
  /**
   * The addon name.
   *
   * @readOnly
   * @type {String}
   */
  name: 'ember-cli-piwik',


  /**
   * Injects the templates into the HTML page at build time.
   *
   * Uses the `-footer` variation of the `head` and `body` tags to make sure the
   * `<script>` tag are the last injection.
   *
   * @param {String} type The tag type.
   * @param {Object} config The application config.
   * @return {String} Returns the content to be injected.
   */
  contentFor: function (type, config) {
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
