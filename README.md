# request-capture-har

Wrapper for [`request` module](https://www.npmjs.com/package/request) that saves all traffic as a HAR file.

[![Build Status](https://travis-ci.org/paulirish/node-request-capture-har.png)](https://travis-ci.org/paulirish/node-request-capture-har)
[![Dependency Status](https://david-dm.org/paulirish/node-request-capture-har.png)](https://david-dm.org/paulirish/node-request-capture-har#info=dependencies)
[![devDependency Status](https://david-dm.org/paulirish/node-request-capture-har/dev-status.png)](https://david-dm.org/paulirish/node-request-capture-har#info=devDependencies)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

### Usage

```js
// require in request-capture-har in place of request
const request = require('request-capture-har');

// ...
// Use request as you normally would
// ...

// Save HAR file to disk 
request.saveHar(`kpm-install_${new Date().toISOString()}.har`);

// You can also clear any collected traffic
request.clearHar();
```

This repo is a fork of [larsthorup's `node-request-har-capture`](https://github.com/larsthorup/node-request-har-capture). Instead of monkey-patching `request-promise`, we now are based on `request` including their streaming API. We also added better support for transfer timings.

### Background
This is especially useful for capturing all test traffic from your back-end test suite, for doing auto mocking in your front-end test suite. See this project for an example: https://github.com/larsthorup/http-auto-mock-demo. Blog post about this technique: http://www.zealake.com/2015/01/05/unit-test-your-service-integration-layer/