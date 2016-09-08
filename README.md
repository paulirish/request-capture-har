# request-capture-har

> Wrapper for [`request` module](https://www.npmjs.com/package/request) that saves all network traffic data as a HAR file.

Full functionality is dependent on merged [request PR #2352](https://github.com/request/request/pull/2352) which is not yet shipped to a release. You can use it in your dependencies as `"request": "request/request#bfb3a46",`.

### Usage

```js
// wrap around your request module
const request = require('request-capture-har')('request');

// ...
// Use request as you normally would
// ...

// Save HAR file to disk
request.saveHar(`network-waterfall_${new Date().toISOString()}.har`);

// You can also clear any collected traffic
request.clearHar();
```

This repo is a fork of [larsthorup's `node-request-har-capture`](https://github.com/larsthorup/node-request-har-capture). Instead of monkey-patching `request-promise`, we now are based on `request` including their streaming API. We also added better support for transfer timings.

![image](https://cloud.githubusercontent.com/assets/39191/18031306/9401070c-6c8f-11e6-994d-03e6b8b511e4.png)
_Above is a HAR captured by using `request-capture-har` from within `npm` to capture an `npm install`._

### Background
This is especially useful for capturing all test traffic from your back-end test suite, for doing auto mocking in your front-end test suite. See this project for an example: https://github.com/larsthorup/http-auto-mock-demo. Blog post about this technique: http://www.zealake.com/2015/01/05/unit-test-your-service-integration-layer/
