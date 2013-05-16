var crypto = require('crypto')
  , default_strength = 3
  , default_separator = ':'
  ;

module.exports = exports = function generateHashCash(challenge, options) {
  options || (options = {});
  options.strength || (options.strength = default_strength);
  options.search || (options.search = repeat('0', options.strength));
  options.separator || (options.separator = default_separator);
  options.counter || (options.counter = 0);
  var attempt;
  do {
    attempt = challenge + options.separator + options.counter++;
  }
  while (!module.exports.check(challenge, attempt, options.search));
  return attempt;
};

exports.async = function generateHashCashAsync(challenge, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  options.strength || (options.strength = default_strength);
  options.search || (options.search = repeat('0', options.strength));
  options.separator || (options.separator = default_separator);
  options.counter || (options.counter = 0);
  var attempt = challenge + options.separator + options.counter++;
  if (module.exports.check(challenge, attempt, options.search)) {
    cb(attempt);
  }
  else {
    process.nextTick(generateHashCashAsync.bind(null, challenge, options, cb));
  }
};

exports.check = function checkHashCash(challenge, hashcash, strength) {
  var search;
  if (typeof strength === 'string') {
    search = strength;
  }
  else {
    strength || (strength = default_strength);
    search = repeat('0', strength);
  }
  return (hashcash.indexOf(challenge) === 0 && sha1(hashcash).indexOf(search) === 0);
};

exports.middleware = function exportMiddleware(options) {
  var dish = require('dish');
  return dish.file(__dirname + '/browser/hashcashgen.js', options);
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