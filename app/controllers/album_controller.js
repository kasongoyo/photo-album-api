'use strict';

/**
 * Album Controller
 */

//  dependencies
const mongoose = require('mongoose');
const Album = mongoose.model('Album');

const albumController = {
    /**
     * It create new album
     * @param {object|object[]} payload - Album payload(s)
     */
    create(payload) {
        return Album.create(payload);
    },

    /**
     * Update album
     * @param {string} albumId - Album Id 
     * @param {object} updates - Update payload 
     */
    update(albumId, updates) {
        if (arguments.length < 2) {
            // Either vendor Id or updates not provided
            return Promise.reject(new Error('Invalid data'));
        }

        // Mongoose update option
        const updateOpt = {
            new: true, // return new update object
            runValidators: true, // run model validators on update
            setDefaultsOnInsert: true // set default on update
        };

        return Album.findByIdAndUpdate(albumId, updates, updateOpt).exec();
    },
    /**
     * It retrieve albums by filtering using keyword q provided
     * @param {string} q - filter query string
     */
    search(q) {
        const criteria = { $text: { $search: q } };
        return Album.find(criteria);
    },
    /**
     * Retrieve albums based on various criterias specified in criteria
     * @param {object} criteria - criteria 
     */
    find(criteria) {
        // TODO clean criterias
        return Album.find(criteria).exec();
    },
    /**
     * Retrieve album based on Id
     * @param {string} albumId - album Id 
     */
    findById(albumId) {
        if (!albumId) {
            // There is no vendor Id specified
            return Promise.reject(new Error('No album Id specified'));
        }
        return Album.findById(albumId).exec();
    }
}

//  export album controller
module.exports = albumController;