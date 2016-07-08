'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var postCtrlStub = {
  index: 'postCtrl.index',
  show: 'postCtrl.show',
  create: 'postCtrl.create',
  update: 'postCtrl.update',
  destroy: 'postCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var postIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './post.controller': postCtrlStub
});

describe('Post API Router:', function() {

  it('should return an express router instance', function() {
    expect(postIndex).to.equal(routerStub);
  });

  describe('GET /api/posts', function() {

    it('should route to post.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'postCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/posts/:id', function() {

    it('should route to post.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'postCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/posts', function() {

    it('should route to post.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'postCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/posts/:id', function() {

    it('should route to post.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'postCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/posts/:id', function() {

    it('should route to post.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'postCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/posts/:id', function() {

    it('should route to post.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'postCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
