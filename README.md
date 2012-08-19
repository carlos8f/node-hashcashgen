hashcashgen
-----------

Simple module implementing the hashcash algorithm

[![build status](https://secure.travis-ci.org/carlos8f/node-hashcashgen.png)](http://travis-ci.org/carlos8f/node-hashcashgen)

Install
=======

```bash
$ npm install hashcashgen
```

Usage
=====

```javascript
var hashcashgen = require('hashcashgen')
  , challenge = require('idgen')()
  , hashcash = hashcashgen(challenge)
  , assert = require('assert')
  ;

assert(hashcashgen.check(challenge, hashcash));
```

Example output:

```
5zzwQZv3:ORoffSKg
```

Manual validation:

```bash
$ echo -n "5zzwQZv3:ORoffSKg" | sha1sum
000d5a6b2269901c5e5621eb4c2624d4bf642d16  -
```

Async version:

```javascript
hashcashgen.async(challenge, function(hashcash) {
  assert(hashcashgen.check(challenge, hashcash));
  done();
});
```

License
=======

MIT