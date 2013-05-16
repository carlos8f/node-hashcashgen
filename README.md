# hashcashgen

Simple javascript/node.js module implementing the [hashcash algorithm](http://en.wikipedia.org/wiki/Hashcash)

[![build status](https://secure.travis-ci.org/carlos8f/node-hashcashgen.png)](http://travis-ci.org/carlos8f/node-hashcashgen)

## Install

```bash
$ npm install hashcashgen
```

## Usage

```js
var hashcashgen = require('hashcashgen')
  , idgen = require('idgen')
  , assert = require('assert')

var challenge = idgen();

// to generate a hashcash, call hashcashgen(challenge [, strength] [, callback])
// default strength is 3.
var hashcash = hashcashgen(challenge, 4);

// to check the hashcash, call hashcashgen.check(challenge [, strength], hashcash)
assert(hashcashgen.check(challenge, 4, hashcash));
```

Example output:

```
5zzwQZv3:ORoffSKg
```

## Async version

If callback is passed, it will be called with (err, hashcash) as arguments
instead of returning a hashcash. Useful to avoid blocking the event loop.

```js
hashcashgen(challenge, function (err, hashcash) {
  assert.ifError(err);
  assert(hashcashgen.check(challenge, hashcash));
  done();
});
```

## Browser-side version (new!)

hashcashgen is usable in the browser thanks to [browserify](https://github.com/substack/node-browserify)!

Universal browser module is packaged in `./browser/hashcashgen.js`. Easily servable
by your node server with this method:

```js
var hashcashgen = require('hashcashgen')
  , express = require('express')

var app = express();

app.get('/js/hashcashgen.js', hashcashgen.middleware());
```

Then in your HTML:

```html
<script src="/js/hashcashgen.js"></script>
```

See `./test/server` for an example.

## CLI version

```
$ npm install -g hashcashgen
$ hashcashgen -s 4 somepig
somepig:30998
$ echo -n "somepig:30998" | shasum
000007620b1539af6cf6145f368cc406b77ebaae  -
```

- - -

### Developed by [Terra Eclipse](http://www.terraeclipse.com)
Terra Eclipse, Inc. is a nationally recognized political technology and
strategy firm located in Aptos, CA and Washington, D.C.

- - -

### License: MIT

- Copyright (C) 2012 Carlos Rodriguez (http://s8f.org/)
- Copyright (C) 2012 Terra Eclipse, Inc. (http://www.terraeclipse.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
