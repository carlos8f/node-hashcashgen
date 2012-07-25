var crypto = require('crypto')
  , idgen = require('idgen')
  , default_strength = 3
  , default_separator = ':'
  ;

module.exports = function generateHashCash(challenge, options) {
  options || (options = {});
  options.strength || (options.strength = default_strength);
  options.search || (options.search = repeat('0', options.strength));
  options.separator || (options.separator = default_separator);
  var attempt;
  do {
    attempt = challenge + options.separator + idgen();
  }
  while (sha1(attempt).indexOf(options.search) !== 0);
  return attempt;
};

module.exports.async = function generateHashCashAsync(challenge, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options.strength || (options.strength = default_strength);
  options.search || (options.search = repeat('0', options.strength));
  options.separator || (options.separator = default_separator);
  var attempt = challenge + options.separator + idgen();
  if (sha1(attempt).indexOf(options.search) === 0) {
    cb(attempt);
  }
  else {
    process.nextTick(generateHashCashAsync.bind(null, challenge, options, cb));
  }
};

module.exports.check = function checkHashCash(challenge, hashcash, strength) {
  strength || (strength = default_strength);
  var search = repeat('0', strength);
  return (hashcash.indexOf(challenge) === 0 && sha1(hashcash).indexOf(search) === 0);
};

function repeat(input, length) {
  var ret = '';
  for (var i = 0; i < length; i++) {
    ret += input;
  }
  return ret;
}

function sha1(input) {
  return crypto.createHash('sha1')
    .update(input)
    .digest('hex');
}