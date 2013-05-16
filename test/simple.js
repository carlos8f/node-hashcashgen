var hashcashgen = require('../')
  , idgen = require('idgen')
  , assert = require('assert')

describe('hashcashgen', function () {
  it('creates valid hashcash (sync, default strength)', function () {
    var challenge = idgen();
    var hashcash = hashcashgen(challenge);
    assert(hashcashgen.check(challenge, hashcash));
  });
  it('creates valid hashcash (sync, custom strength)', function () {
    var challenge = idgen();
    var hashcash = hashcashgen(challenge, 4);
    assert(hashcashgen.check(challenge, 4, hashcash));
  });
  it('creates valid hashcash (async, default strength)', function (done) {
    var challenge = idgen();
    hashcashgen(challenge, function (err, hashcash) {
      assert.ifError(err);
      assert(hashcashgen.check(challenge, hashcash));
      done();
    });
  });
  it('creates valid hashcash (async, custom strength)', function (done) {
    var challenge = idgen();
    hashcashgen(challenge, 4, function (err, hashcash) {
      assert.ifError(err);
      assert(hashcashgen.check(challenge, 4, hashcash));
      done();
    });
  });
});
