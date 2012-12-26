module.exports = process.env.lock_COV
  ? require('./lib-cov/lock')
  : require('./lib/lock');
