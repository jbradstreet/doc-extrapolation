'use strict';

var app = require('../..');
import request from 'supertest';

var newCreate;

describe('Create API:', function() {

  describe('GET /api/creates', function() {
    var creates;

    beforeEach(function(done) {
      request(app)
        .get('/api/creates')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          creates = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(creates).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/creates', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/creates')
        .send({
          name: 'New Create',
          info: 'This is the brand new create!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newCreate = res.body;
          done();
        });
    });

    it('should respond with the newly created create', function() {
      expect(newCreate.name).to.equal('New Create');
      expect(newCreate.info).to.equal('This is the brand new create!!!');
    });

  });

  describe('GET /api/creates/:id', function() {
    var create;

    beforeEach(function(done) {
      request(app)
        .get('/api/creates/' + newCreate._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          create = res.body;
          done();
        });
    });

    afterEach(function() {
      create = {};
    });

    it('should respond with the requested create', function() {
      expect(create.name).to.equal('New Create');
      expect(create.info).to.equal('This is the brand new create!!!');
    });

  });

  describe('PUT /api/creates/:id', function() {
    var updatedCreate;

    beforeEach(function(done) {
      request(app)
        .put('/api/creates/' + newCreate._id)
        .send({
          name: 'Updated Create',
          info: 'This is the updated create!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCreate = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCreate = {};
    });

    it('should respond with the updated create', function() {
      expect(updatedCreate.name).to.equal('Updated Create');
      expect(updatedCreate.info).to.equal('This is the updated create!!!');
    });

  });

  describe('DELETE /api/creates/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/creates/' + newCreate._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when create does not exist', function(done) {
      request(app)
        .delete('/api/creates/' + newCreate._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
