# request-capture-har

> Wrapper for [`request` module](https://www.npmjs.com/package/request) that saves all network traffic data as a HAR file.

[![Build Status](https://travis-ci.org/paulirish/node-request-capture-har.png)](https://travis-ci.org/paulirish/node-request-capture-har) [![NPM request-capture-har package](https://img.shields.io/npm/v/request-capture-har.svg)](https://npmjs.org/package/request-capture-har)

Full functionality is dependent on merged [request PR #2352](https://github.com/request/request/pull/2352) which is not yet shipped to a release. You can use it in your dependencies as `"request": "request/request#bfb3a46",`.

### Usage

```js
// wrap around your request module
const RequestCaptureHar = require('request-capture-har');
const requestCaptureHar = new RequestCaptureHar(require('request'));

// ...
// `requestCaptureHar.request` is your `request` module's API.
// ...
requestCaptureHar.request(uri, options, callback);

// Save HAR file to disk
requestCaptureHar.saveHar(`network-waterfall_${new Date().toISOString()}.har`);

// You can also clear any collected traffic
requestCaptureHar.clearHar();
```

This repo is a fork of [larsthorup's `node-request-har-capture`](https://github.com/larsthorup/node-request-har-capture). Instead of monkey-patching `request-promise`, we now are based on `request` including their streaming API. We also added better support for transfer timings.

![image](https://cloud.githubusercontent.com/assets/39191/18031306/9401070c-6c8f-11e6-994d-03e6b8b511e4.png)
_Above is a HAR captured by using `request-capture-har` from within `npm` to capture an `npm install`._

### Background
This is especially useful for capturing all test traffic from your back-end test suite, for doing auto mocking in your front-end test suite. See this project for an example: https://github.com/larsthorup/http-auto-mock-demo. Blog post about this technique: http://www.zealake.com/2015/01/05/unit-test-your-service-integration-layer/
