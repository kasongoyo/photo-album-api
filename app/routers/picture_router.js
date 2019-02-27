'use strict';

// dependencies
const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require(path.resolve(__dirname, '..', 'controllers', 'picture_controller'));


/**
 * Handle Http POST on /photos
 */
router.post('/photos', (request, response, next) => {
    controller
        .create(request.body)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http PATCH on /photos
 */
router.patch('/photos/:photoId', (request, response, next) => {
    controller
        .update(request.params.photoId, request.body)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http GET on /photos/search
 */
router.get('/photos/search', (request, response, next) => {
    controller
        .search(request.query.q)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http GET on /photos/:photoId
 */
router.get('/photos/:photoId', (request, response, next) => {
    controller
        .findById(request.params.photoId)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http GET on /photos
 */
router.get('/photos', (request, response, next) => {
    controller
        .find(request.query)
        .then(result => response.json(result))
        .catch(error => next(error));
});

// export router
module.exports = router;