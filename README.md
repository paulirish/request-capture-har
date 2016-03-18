# request-har-capture
Wrapper for request module that saves all traffic as a HAR file, useful for auto mocking a client

Use this module as drop-in replacement for https://www.npmjs.com/package/request-promise

All traffic can be saved by calling

    request.saveHar('traffic.har');

Collected traffic can be cleared by calling

    request.clear();

This is especially useful for capturing all test traffic from your back-end test suite, for doing auto mocking in your front-end test suite. See this project for an example: https://github.com/larsthorup/http-auto-mock-demo

Blog post about this technique: http://www.zealake.com/2015/01/05/unit-test-your-service-integration-layer/