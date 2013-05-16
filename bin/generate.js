#!/usr/bin/env node
var argv = require('optimist')
  .usage('Usage: $0 [-s <strength>] challenge')
  .demand(1)
  .alias('s', 'strength')
  .argv
  , hashcash = require('../')(argv._[0], argv.strength)

process.stdout.write(hashcash);

if (!argv.n) {
  process.stdout.write('\n');
}