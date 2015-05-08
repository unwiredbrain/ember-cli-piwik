# ember-cli-piwik

[![Build Status](https://travis-ci.org/unwiredbrain/ember-cli-piwik.svg?branch=master)](https://travis-ci.org/unwiredbrain/ember-cli-piwik)
[![Dependency Status](https://david-dm.org/unwiredbrain/ember-cli-piwik.svg?branch=master)](https://david-dm.org/unwiredbrain/ember-cli-piwik)
[![Inline docs](http://inch-ci.org/github/unwiredbrain/ember-cli-piwik.svg?branch=master)](http://inch-ci.org/github/unwiredbrain/ember-cli-piwik)

Inject the Piwik tracking code into an ember-cli application.

**Please note that this is not production-ready software** and that it may lack 
many features. Should you feel something is missing or just not right, feel free 
to file a new issue or submit a new PR. Your contribution is mostly appreciated.

## Installation

In your project root, run:

```bash
ember install ember-cli-piwik
```

## Configuration

This addon is configured via your application's `config/environment.js` file by 
adding two configuration options: `ENV.piwik.sid` and `ENV.piwik.url`.

In order to configure your application, add the following object to your 
environments:

```javascript
piwik: {
  sid: 123,
  url: 'https://your-piwik.endpoint.com'
}
```

You can have independent site IDs and URLs per environment, for example:

```javascript
if (environment === 'development') {
  ENV.piwik = {
    sid: 3,
    url: 'http://your.piwik.domain/and/path'
  }
}

// ...

if (environment === 'production') {
  ENV.piwik = {
    sid: 7,
    url: '//another-piwik.endpoint.com'
  }
}
```

Usually though the only difference between environments is the site ID. In such 
a situation, the best approach is the following:

```javascript
// config/environment.js
module.exports = function(environment) {
  var ENV = {
    // ...
    piwik: {
      url: 'https://piwik.endpoint.com'
    },
    // ...
  };

  if (environment === 'development') {
    // ...
    ENV.piwik.sid = 2;
  }

  if (environment === 'test') {
    // ...
    ENV.piwik.sid = 7;
  }

  if (environment === 'production') {
    // ...
    ENV.piwik.sid = 19;
  }

  return ENV;
};
```

## Automatic PageView Tracking

This addon can take care of notifying pageviews to the Piwik server when 
transitioning into a route automatically.

All you have to do is to extend the main application router with the provided 
mixin:

```javascript
// app/router.js
import Ember from 'ember';
import config from './config/environment';
import Piwik from 'ember-cli-piwik/mixins/page-view-tracker';

var Router = Ember.Router.extend(Piwik, {
  location: config.locationType
});

Router.map(function() {
  // ...
});

export default Router;
```

Now when the `didTransition` event fires, the router will call the Piwik tracker 
which in turn will emit a `trackPageView` event passing the current URL as the 
event title.

## Content Security Policy (CSP)

Please be aware that [since version 0.0.47][1] ember-cli ships with CSP support 
out of the box through the [ember-cli-content-security-policy][2] addon. 
This is a good thing, as in the proper Ember spirit, it nudges you towards 
adopting the best practices from day 1.

There is an "issue" though: by default, it is configured to be extremely strict 
about script sources and script capabilities.

To make everything run smoothly, make sure you add the URLs you used in your 
Piwik configuration to the relevant options of the CSP settings.

For more information, please refer to the [ember-cli-content-security-policy 
documentation][3].

[1]: https://github.com/ember-cli/ember-cli/releases/tag/v0.0.47
[2]: https://github.com/rwjblue/ember-cli-content-security-policy
[3]: https://github.com/rwjblue/ember-cli-content-security-policy/blob/master/README.md

## Running Tests

Clone this project, install the dependencies, then run the tests:

```bash
$ git clone https://github.com/unwiredbrain/ember-cli-piwik.git
$ npm install && bower install
$ npm test
```

## Acknowledgements

[Peter Grippi][4], for his [ember-cli-google-analytics][5] addon.

[4]: https://github.com/pgrippi
[5]: https://github.com/pgrippi/ember-cli-google-analytics

## License

The MIT License (MIT)

Copyright (c) 2015 Massimo Lombardo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---

Still here!? Go develop something amazing!

EOF
