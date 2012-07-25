var hashcashgen = require('../')
  , idgen = require('idgen')
  , assert = require('assert')
  ;

describe('hashcashgen', function() {
  it('creates valid hashcash (sync)', function() {
    var challenge = idgen();
    var hashcash = hashcashgen(challenge);
    assert.strictEqual(hashcash.length, 17);
    assert(hashcashgen.check(challenge, hashcash));
  });
  it('creates valid hashcash (async)', function(done) {
    var challenge = idgen();
    hashcashgen.async(challenge, function(hashcash) {
      assert.strictEqual(hashcash.length, 17);
      assert(hashcashgen.check(challenge, hashcash));
      done();
    });
  });
});