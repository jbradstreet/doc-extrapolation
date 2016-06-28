'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var createCtrlStub = {
  index: 'createCtrl.index',
  show: 'createCtrl.show',
  create: 'createCtrl.create',
  update: 'createCtrl.update',
  destroy: 'createCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var createIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './create.controller': createCtrlStub
});

describe('Create API Router:', function() {

  it('should return an express router instance', function() {
    expect(createIndex).to.equal(routerStub);
  });

  describe('GET /api/creates', function() {

    it('should route to create.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'createCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/creates/:id', function() {

    it('should route to create.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'createCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/creates', function() {

    it('should route to create.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'createCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/creates/:id', function() {

    it('should route to create.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'createCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/creates/:id', function() {

    it('should route to create.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'createCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/creates/:id', function() {

    it('should route to create.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'createCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
