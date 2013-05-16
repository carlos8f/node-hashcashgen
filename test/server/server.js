var hashcashgen = require('../../')
  , middler = require('middler')
  , http = require('http')
  , idgen = require('idgen')
  , dish = require('dish')
  , formidable = require('formidable')

var server = http.createServer()
  , challenges = {}

middler(server)
  .first(function (req, res, next) {
    var form = new formidable.IncomingForm();
    try {
      form.parse(req, function (err, fields, files) {
        req.fields = req.body = fields;
        req.files = files;
        next(err);
      });
    }
    catch (e) {
      // formidable throws if there is no content-type. weird.
      if (e.message === 'bad content-type header, no content-type') {
        e = null;
      }
      next(e);
    }
  })
  .get('/js/hashcashgen.js', hashcashgen.middleware())
  .get('/js/challenge.js', function (req, res, next) {
    var challenge;
    do {
      challenge = idgen(16);
    }
    while (challenge in challenges);

    challenges[challenge] = false;
    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.end('setHashcash(' + JSON.stringify(challenge) + ');');
    //console.log('sent challenge: ' + challenge);
  })
  .get('/', dish.file(__dirname + '/index.html'))
  .post('/', function (req, res, next) {
    // validate post
    if (!req.body.hashcash) {
      return next(new Error("your user-agent doesn't appear to be running javascript!"));
    }
    var challenge = req.body.hashcash.split(':')[0];
    if (!challenge || !(challenge in challenges) || challenges[challenge] !== false) {
      return next(new Error('invalid hashcash challenge!'));
    }
    if (!hashcashgen.check(challenge, req.body.hashcash, 4)) {
      return next(new Error('invalid hashcash!'));
    }
    //console.log('client sent valid hashcash: ' + req.body.hashcash);
    challenges[challenge] = true;
    res.writeHead(302, {'Location': '/success'});
    res.end();
  })
  .get('/success', dish.file(__dirname + '/success.html'))
  .add('/favicon.ico', function (req, res, next) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('no favicon, sorry');
  })
  .add(function (req, res, next) {
    next(new Error('cannot ' + req.method + ' ' + req.url));
  })

server.listen(0, function () {
  console.log('server listening on port ' + server.address().port);
});
