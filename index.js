var dish = require('dish');

module.exports = exports = require('./hashcashgen');

exports.middleware = function exportMiddleware (options) {
  return dish.file(__dirname + '/browser/hashcashgen.js', options);
};
