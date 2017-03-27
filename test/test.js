import test from 'ava';
import RCH from '../';

import requestsPlaybackJSON from './fixtures/requestsplayback.json';

const respMockEntry = requestsPlaybackJSON[0];

const fakeRequestModule = function (opt, callback) {
  callback = callback || opt.callback;
  callback(null, respMockEntry, {});
};

test('RCH public API is available', t => {
  const rch = new RCH();
  t.is(typeof rch.request, 'function');
  t.is(typeof rch.saveHar, 'function');
  t.is(typeof rch.clear, 'function');
});

test.cb('callback is called', t => {
  const rch = new RCH(fakeRequestModule);
  rch.request({
    url: respMockEntry.request.uri.href,
    callback: function (err, resp, body) {
      t.is(err, null);
      t.is(typeof resp, 'object');
      t.is(Array.isArray(rch.entries), true);
      t.is(rch.entries.length, 1);
      t.end();
    }
  });
});

test.cb('make one request and verify the results', t => {
  const rch = new RCH(fakeRequestModule);
  rch.request({
    url: respMockEntry.request.uri.href,
    callback: function (err, resp, body) {
      t.is(err, null);
      const harRequest = rch.entries[0];
      t.is(harRequest.startedDateTime, '2017-03-27T18:57:21.072Z');
      t.is(harRequest.time, 366);
      t.deepEqual(harRequest.timings, {
        blocked: 20.091,
        dns: 93.816,
        connect: 158.251,
        send: 0,
        wait: 87.894,
        receive: 6.172
      });
      t.end();
    }
  });
});
