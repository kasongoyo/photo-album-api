'use strict';

// dependencies
const path = require('path');
const express = require('express');
const router = express.Router();
const controller = require(path.resolve(__dirname, '..', 'controllers', 'album_controller'));


/**
 * Handle Http POST on /albums
 */
router.post('/albums', (request, response, next) => {
    controller
        .create(request.body)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http PATCH on /albums
 */
router.patch('/albums/:albumId', (request, response, next) => {
    controller
        .create(request.params.albumId, request.body)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http GET on /albums/search
 */
router.get('/albums/search', (request, response, next) => {
    controller
        .search(request.query.q)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http GET on /albums/:albumId
 */
router.get('/albums/:albumId', (request, response, next) => {
    controller
        .findById(request.params.albumId)
        .then(result => response.json(result))
        .catch(error => next(error));
});

/**
 * Handle Http GET on /albums
 */
router.get('/albums', (request, response, next) => {
    controller
        .find(request.query)
        .then(result => response.json(result))
        .catch(error => next(error));
});

// export router
module.exports = router;