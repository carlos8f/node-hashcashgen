var crypto = require('crypto')
  , default_strength = 3

module.exports = exports = function generateHashCash (challenge, strength, cb) {
  if (typeof strength === 'function') {
    cb = strength;
    strength = default_strength;
  }
  else if (!strength) {
    strength = default_strength;
  }
  var search = repeat('0', strength)
    , separator = ':'
    , counter = 0
    , attempt

  function doAttempt () {
    attempt = challenge + separator + counter++;
    return exports.check(challenge, strength, attempt, search) ? attempt : null;
  }

  if (cb) {
    (function findHashcash () {
      var ret = doAttempt();
      if (ret) return cb(null, ret);
      else {
        if (global.setImmediate) {
          setImmediate(findHashcash);
        }
        else {
          process.nextTick(findHashcash);
        }
      }
    })();
  }
  else {
    var ret;
    do {
      ret = doAttempt();
    }
    while (!ret);
    return ret;
  }
};

exports.check = function checkHashCash (challenge, strength, hashcash, search) {
  if (typeof strength === 'string') {
    hashcash = strength;
    strength = default_strength;
  }
  else {
    strength || (strength = default_strength);
  }
  if (!search) search = repeat('0', strength);
  return (hashcash.indexOf(challenge) === 0 && sha1(hashcash).indexOf(search) === 0);
};

function repeat (input, length) {
  var ret = '';
  for (var i = 0; i < length; i++) {
    ret += input;
  }
  return ret;
}

function sha1 (input) {
  return crypto.createHash('sha1')
    .update(input)
    .digest('hex');
}
