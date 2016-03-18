# request-har-capture
Wrapper for request module that saves all traffic as a HAR file, useful for auto mocking a client

[![Build Status](https://travis-ci.org/larsthorup/node-request-har-capture.png)](https://travis-ci.org/larsthorup/node-request-har-capture)
[![Coverage Status](https://coveralls.io/repos/larsthorup/node-request-har-capture/badge.svg?branch=master&service=github)](https://coveralls.io/github/larsthorup/node-request-har-capture?branch=master)
[![Dependency Status](https://david-dm.org/larsthorup/node-request-har-capture.png)](https://david-dm.org/larsthorup/node-request-har-capture#info=dependencies)
[![devDependency Status](https://david-dm.org/larsthorup/node-request-har-capture/dev-status.png)](https://david-dm.org/larsthorup/node-request-har-capture#info=devDependencies)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Use this module as drop-in replacement for https://www.npmjs.com/package/request-promise

All traffic can be saved by calling

    request.saveHar('traffic.har');

Collected traffic can be cleared by calling

    request.clear();

This is especially useful for capturing all test traffic from your back-end test suite, for doing auto mocking in your front-end test suite. See this project for an example: https://github.com/larsthorup/http-auto-mock-demo

Blog post about this technique: http://www.zealake.com/2015/01/05/unit-test-your-service-integration-layer/