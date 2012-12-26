/*!
 * Attach chai to global should
 */

global.chai = require('chai');
global.should = global.chai.should();

/*!
 * Chai Plugins
 */

//global.chai.use(require('chai-spies'));
//global.chai.use(require('chai-http'));

/*!
 * Import project
 */

global.lock = require('../..');

/*!
 * Helper to load internals for cov unit tests
 */

function req (name) {
  return process.env.lock_COV
    ? require('../../lib-cov/lock/' + name)
    : require('../../lib/lock/' + name);
}

/*!
 * Load unexposed modules for unit tests
 */

global.__lock = {};
