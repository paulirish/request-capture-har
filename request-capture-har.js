var fs = require('fs');
var pkg = require('./package.json');

var harEntries = [];
var earliestTime = new Date(2099, 1, 1);

function buildHarHeaders (headers) {
  return headers ? Object.keys(headers).map(function (key) {
    return {
      name: key,
      value: headers[key]
    };
  }) : [];
}

function buildPostData (body) {
  return body ? {
    mimeType: 'application/json',
    text: body
  } : null;
}

function buildHarEntry (response) {
  var startTimestamp = response.request.startTime;
  var responseStartTimestamp = response.request.response.responseStartTime;
  var endTimestamp = startTimestamp + response.elapsedTime;

  var waitingTime = responseStartTimestamp - startTimestamp;
  var totalTime = endTimestamp - startTimestamp;
  var receiveTime = endTimestamp - responseStartTimestamp;

  earliestTime = Math.min(new Date(startTimestamp), earliestTime);

  var entry = {
    startedDateTime: new Date(startTimestamp).toISOString(),
    time: totalTime,
    request: {
      method: response.request.method,
      url: response.request.uri.href,
      httpVersion: 'HTTP/' + response.httpVersion,
      cookies: [],
      headers: buildHarHeaders(response.request.headers),
      queryString: [],
      postData: buildPostData(response.request.body),
      headersSize: -1,
      bodySize: -1
    },
    response: {
      status: response.statusCode,
      statusText: response.statusMessage,
      httpVersion: 'HTTP/' + response.httpVersion,
      cookies: [],
      headers: buildHarHeaders(response.headers),
      _transferSize: response.body.length,
      content: {
        size: response.body.length,
        mimeType: response.headers['content-type'],
      },
      redirectURL: '',
      headersSize: -1,
      bodySize: -1
    },
    cache: {},
    timings: {
      send: -1,
      wait: waitingTime,
      receive: receiveTime
    }
  };
  return entry;
}

function requestHarCapture(modulename) {
  var request = require(modulename);
  requestHarCapture.request = request;
  return function(options) {
    Object.assign(options, { time: true });
    var req = requestHarCapture.request(options, function(err, incomingMessage, response) {
      if (err) return;
      harEntries.push(buildHarEntry(incomingMessage));
    });
    return req;
  }
}

requestHarCapture.saveHar = function (fileName) {
  var httpArchive = {
    log: {
      version: '1.2',
      creator: {name: 'request-capture-har', version: pkg.version},
      pages: [{
        startedDateTime: new Date(earliestTime).toISOString(),
        id: 'request-capture-har',
        title: 'request-capture-har',
        pageTimings: { }
      }],
      entries: harEntries
    }
  };
  fs.writeFileSync(fileName, JSON.stringify(httpArchive, null, 2));
};

requestHarCapture.clearHar = function () {
  harEntries = [];
  earliestTime = new Date(2099, 1, 1);
};

module.exports = requestHarCapture;
