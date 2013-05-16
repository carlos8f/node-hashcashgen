var Browser = require('zombie')
  , assert = require('assert')
  , spawn = require('child_process').spawn

describe('browser test', function() {
  var server, browser = new Browser(), port;

  before(function (done) {
    server = spawn('node', [__dirname + '/server/server.js']);
    var pattern = /^server listening on port (\d+)/;
    function startupListener (chunk) {
      var match = String(chunk).match(pattern);
      if (match) {
        port = Number(match[1]);
        done();
      }
    }
    server.stdout.once('data', startupListener);
    setTimeout(function () {
      if (!port) {
        done(new Error('failed to start test server.'));
      }
    }, 5000);
    server.stderr.pipe(process.stdout);

    process.on('exit', function () {
      server.kill();
    });
  });

  it('load page', function (done) {
    browser.visit('http://localhost:' + port + '/', done);
  });

  it('submit form', function (done) {
    browser.fill('email', 'beep@boop.com');
    browser.pressButton('Sign up', done);
  });

  it('success', function (done) {
    assert.equal(browser.location.pathname, '/success');
    done();
  });
});
