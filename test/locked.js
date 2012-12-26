describe('lock(obj)', function () {

});

describe('.set(key, value)', function () {
  it('can set a property', function () {
    var obj = {}
      , api = lock(obj);

    api.set('hello', 'universe');
    obj.hello.should.equal('universe');
  });

  it('cannot set an original property', function () {
    var obj = { 'hello': 'universe' }
      , api = lock(obj);

    (function () {
      api.set('hello', 'world');
    }).should.throw('`hello` is a reserved property.');
  });

  it('cannot set an existing property', function () {
    var obj = {}
      , api = lock(obj);

    api.set('hello', 'universe');

    (function () {
      api.set('hello', 'world');
    }).should.throw('`hello` property already defined.');
  });
});

describe('.unset(key)', function () {
  it('can unset a property', function () {
    var obj = {}
      , api = lock(obj);

    api.set('hello', 'universe');
    obj.hello.should.equal('universe');
    api.unset('hello');
    obj.should.not.have.property('hello');
  });

  it('will not unset an original property', function () {
    var obj = { hello: 'universe' }
      , api = lock(obj);

    api.unset('hello');
    obj.should.have.property('hello');
  });
});

describe('.lock()', function () {
  it('can be locked', function () {
    var obj = {}
      , api = lock(obj);

    api.set('hello', 'universe');
    api.lock();
    api.locked.should.be.an('array')
      .that.contain('hello');
  });

  it('will not unset a locked property', function () {
    var obj = {}
      , api = lock(obj);

    api.set('hello', 'universe');
    api.lock();
    api.locked.should.be.an('array')
      .that.contain('hello');
    api.unset();
    obj.should.have.property('hello', 'universe');
  });
});

describe('.reset()', function () {
  it('can be reset', function () {
    var obj = { 'orig': 'prop' }
      , api = lock(obj);

    api.original.should.be.an('array')
      .that.contain('orig');
    api.set('hello', 'universe');

    obj.should.have.property('orig', 'prop');
    obj.should.have.property('hello', 'universe');

    api.lock();
    api.locked.should.be.an('array')
      .that.contain('hello');

    api.reset();

    obj.should.have.property('orig', 'prop');
    obj.should.not.have.property('hello');
  });
});
