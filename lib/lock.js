/*!
 * tea-objlock
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

module.exports = function (obj) {
  return new Locked(obj);
};

/**
 * ### lock (obj)
 *
 * @param {Object} object to lock
 * @api public
 */

function Locked (obj) {
  this.obj = obj;
  this.original = Object.keys(obj);
  this.locked = null;
}

/**
 * #### .lock ()
 *
 * Lock the objects current properties to prevent
 * removal upon `.unset`.
 *
 * @api public
 */

Locked.prototype.lock = function () {
  this.locked = Object.keys(this.obj);
  return this;
};

/**
 * #### .unlock ()
 *
 * Quickly remove the locked state.
 *
 * @api public
 */

Locked.prototype.unlock = function () {
  this.locked = null;
  return this;
};

/**
 * #### .reset ()
 *
 * Restore the object to its original state by
 * removing all previously set properties or methods.
 * This included removing all locked elements.
 *
 * @api public
 */

Locked.prototype.reset = function () {
  var obj = this.obj
    , orig = this.original
    , keys = Object.keys(obj);

  keys.forEach(function (el) {
    if (!~orig.indexOf(el)) {
      delete obj[el];
    }
  });

  return this;
};

/**
 * #### .set (key, value)
 *
 * Set a property by key to value on the referenced
 * object. Will now allow for writing over top of
 * original or existing methods.
 *
 * @param {String} property name key
 * @param {Function} value to use
 * @api public
 */

Locked.prototype.set = function (key, val) {
  if (~this.original.indexOf(key)) {
    throw new Error('`' + key + '` is a reserved property.');
  }

  if (~Object.keys(this.obj).indexOf(key)) {
    throw new Error('`' + key + '` property already defined.');
  }

  this.obj[key] = val;
  return this;
};

/**
 * #### .unmount (methodname)
 *
 * Unmount a method element from the object. Will
 * not permit the removal of locked properties or methods.
 *
 * Not providing a method name will remove all properties
 * or methods added since the last lock.
 *
 * @param {String} name (optional)
 * @api public
 */

Locked.prototype.unset = function (key) {
  var obj = this.obj
    , locked = this.locked || []
    , orig = this.original
    , keys = Object.keys(obj);

  function clean (el) {
    if (!~locked.indexOf(el) && !~orig.indexOf(el)) {
      delete obj[el];
    }
  }

  if (key) {
    clean(key);
  } else {
    keys.forEach(clean);
  }

  return this;
};
