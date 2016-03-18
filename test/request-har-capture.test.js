/* eslint-env mocha */

var fs = require('fs');
var sinon = require('sinon');
var requestHarCapture = require('../request-har-capture.js');

describe('request-har-capture', function () {
  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
    this.sinon.stub(requestHarCapture, 'request', function (options) {
      return new Promise(function (resolve) {
        resolve({
          request: options,
          httpVersion: 'HTTP/1.1',
          statusCode: 200,
          statusMessage: 'OK',
          headers: {
            'content-type': 'application/json'
          },
          body: '{"result": "-20"}'
        });
      });
    });
    this.sinon.stub(fs, 'writeFileSync');
  });

  afterEach(function () {
    this.sinon.restore();
  });

  describe('when performing a request', function () {
    var actualResponse;

    beforeEach(function () {
      return requestHarCapture({
        method: 'GET',
        uri: 'http://localhost:1719/somePath'
      }).then(function (response) {
        actualResponse = response;
      });
    });

    afterEach(function () {
      requestHarCapture.clear();
    });

    it('should return the response', function () {
      actualResponse.statusCode.should.equal(200);
      actualResponse.body.should.equal('{"result": "-20"}');
    });

    describe('saveHar', function () {
      beforeEach(function () {
        requestHarCapture.saveHar('test.har');
      });

      it('should save the file in har format', function () {
        var saveArgs = fs.writeFileSync.getCall(0).args;
        saveArgs[0].should.equal('test.har');
        var harFile = JSON.parse(saveArgs[1]);
        harFile.log.creator.name.should.equal('request-har-capture');
        harFile.log.entries.length.should.equal(1);
        var entry = harFile.log.entries[0];
        entry.request.method.should.equal('GET');
        entry.request.url.should.equal('http://localhost:1719/somePath');
        entry.response.status.should.equal(200);
        entry.response.content.text.should.equal('{"result": "-20"}');
        entry.response.content.mimeType.should.equal('application/json');
        entry.response.headers.length.should.equal(1);
        entry.response.headers[0].should.deep.equal({
          name: 'content-type',
          value: 'application/json'
        });
      });
    });
  });
});
