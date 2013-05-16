var hashcashgen = require('../')
  , idgen = require('idgen')
  , assert = require('assert')

describe('hashcashgen (0.x compat)', function () {
  it('creates valid hashcash (async)', function (done) {
    var challenge = idgen();
    hashcashgen.async(challenge, function (hashcash) {
      assert(hashcashgen.check(challenge, hashcash));
      done();
    });
  });
});
