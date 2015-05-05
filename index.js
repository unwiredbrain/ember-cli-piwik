/* jshint node: true */
'use strict';


var templates = {
  head: '<script>var _paq=[["setSiteId",{{PIWIK_SID}}],["setTrackerUrl","//{{PIWIK_URL}}/piwik.php"],["trackPageView"],["enableLinkTracking"]]</script>',
  body: '<script src="//{{PIWIK_URL}}/piwik.js" async defer></script>'
};


function isConfigured(config) {
  if (config.piwik && config.piwik.url && config.piwik.sid) {
    return true;
  }

  return false;
}


function hydrate(template, url, sid) {
  template = template.replace('{{PIWIK_URL}}', url);
  template = template.replace('{{PIWIK_SID}}', sid);

  return template;
}


module.exports = {
  name: 'ember-cli-piwik',

  contentFor: function (type, config) {
    if (isConfigured(config)) {
      if (type === 'head-footer') {
        return hydrate(templates.head, config.piwik.url, config.piwik.sid);
      }

      if (type === 'body-footer') {
        return hydrate(templates.body, config.piwik.url, config.piwik.sid);
      }
    }

    return '';
  }
};
