/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/creates              ->  index
 * POST    /api/creates              ->  create
 * GET     /api/creates/:id          ->  show
 * PUT     /api/creates/:id          ->  update
 * DELETE  /api/creates/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Create from './create.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Creates
export function index(req, res) {
  return Create.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Create from the DB
export function show(req, res) {
  return Create.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Create in the DB
export function create(req, res) {
  return Create.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Create in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Create.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Create from the DB
export function destroy(req, res) {
  return Create.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
