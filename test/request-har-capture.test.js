/* eslint-env mocha */

var should = require('chai').should();
var sinon = require('sinon');
var fs = require('fs');
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
          body: '{"result":"-20"}'
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
        method: 'POST',
        uri: 'http://localhost:1719/somePath',
        body: '{"pass":"secret"}',
        headers: {
          'accept-version': '0.1.0'
        }
      }).then(function (response) {
        actualResponse = response;
      });
    });

    beforeEach(function () {
      return requestHarCapture({
        method: 'GET',
        uri: 'http://localhost:1719/simplePath'
      });
    });

    afterEach(function () {
      requestHarCapture.clear();
    });

    it('should return the response', function () {
      actualResponse.statusCode.should.equal(200);
      actualResponse.body.should.equal('{"result":"-20"}');
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
        harFile.log.creator.version.should.equal('0.3.0');
        harFile.log.entries.length.should.equal(2);
        var entry = harFile.log.entries[0];
        entry.request.method.should.equal('POST');
        entry.request.url.should.equal('http://localhost:1719/somePath');
        entry.request.headers.length.should.equal(1);
        entry.request.headers[0].should.deep.equal({
          name: 'accept-version',
          value: '0.1.0'
        });
        entry.request.postData.mimeType.should.equal('application/json');
        entry.request.postData.text.should.deep.equal('{"pass":"secret"}');
        entry.response.status.should.equal(200);
        entry.response.content.text.should.equal('{"result":"-20"}');
        entry.response.content.mimeType.should.equal('application/json');
        entry.response.headers.length.should.equal(1);
        entry.response.headers[0].should.deep.equal({
          name: 'content-type',
          value: 'application/json'
        });
      });

      it('should hand simple requests without headers and body', function () {
        var saveArgs = fs.writeFileSync.getCall(0).args;
        saveArgs[0].should.equal('test.har');
        var harFile = JSON.parse(saveArgs[1]);
        var entry = harFile.log.entries[1];
        entry.request.method.should.equal('GET');
        entry.request.url.should.equal('http://localhost:1719/simplePath');
        entry.request.headers.should.deep.equal([]);
        should.not.exist(entry.request.postData);
      });
    });
  });
});
