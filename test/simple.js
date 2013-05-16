var hashcashgen = require('../')
  , idgen = require('idgen')
  , assert = require('assert')

describe('hashcashgen', function () {
  it('creates valid hashcash (sync)', function () {
    var challenge = idgen();
    var hashcash = hashcashgen(challenge);
    assert(hashcashgen.check(challenge, hashcash));
  });
  it('creates valid hashcash (async)', function (done) {
    var challenge = idgen();
    hashcashgen(challenge, function (err, hashcash) {
      assert.ifError(err);
      assert(hashcashgen.check(challenge, hashcash));
      done();
    });
  });
});
