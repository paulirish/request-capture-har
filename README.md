# request-capture-har

Wrapper for request module that saves all traffic as a HAR file.

[![Build Status](https://travis-ci.org/paulirish/node-request-capture-har.png)](https://travis-ci.org/paulirish/node-request-capture-har)
[![Coverage Status](https://coveralls.io/repos/paulirish/node-request-capture-har/badge.svg?branch=master&service=github)](https://coveralls.io/github/paulirish/node-request-capture-har?branch=master)
[![Dependency Status](https://david-dm.org/paulirish/node-request-capture-har.png)](https://david-dm.org/paulirish/node-request-capture-har#info=dependencies)
[![devDependency Status](https://david-dm.org/paulirish/node-request-capture-har/dev-status.png)](https://david-dm.org/paulirish/node-request-capture-har#info=devDependencies)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Use this module as drop-in replacement for https://www.npmjs.com/package/request

All traffic can be saved by calling

    request.saveHar('traffic.har');

Collected traffic can be cleared by calling

    request.clear();

This is especially useful for capturing all test traffic from your back-end test suite, for doing auto mocking in your front-end test suite. See this project for an example: https://github.com/larsthorup/http-auto-mock-demo

Blog post about this technique: http://www.zealake.com/2015/01/05/unit-test-your-service-integration-layer/