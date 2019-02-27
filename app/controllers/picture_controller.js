'use strict';

/**
 * Picture Controller
 */

//  dependencies
const mongoose = require('mongoose');
const Picture = mongoose.model('Picture');

const pictureController = {
    /**
     * It create new picture
     * @param {object|object[]} payload - Picture payload(s)
     */
    create(payload) {
        return Picture.create(payload);
    },

    /**
     * Update picture
     * @param {string} pictureId - Picture Id 
     * @param {object} updates - Update payload 
     */
    update(pictureId, updates) {
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

        return Picture.findByIdAndUpdate(pictureId, updates, updateOpt).exec();
    },
    /**
     * It retrieve pictures by filtering using keyword q provided
     * @param {string} q - filter query string
     */
    search(q) {
        const criteria = { $text: { $search: q } };
        return Picture.find(criteria);
    },
    /**
     * Retrieve pictures based on various criterias specified in criteria
     * @param {object} criteria - criteria 
     */
    find(criteria) {
        // TODO clean criterias
        return Picture.find(criteria).exec();
    },
    /**
     * Retrieve picture based on Id
     * @param {string} pictureId - picture Id 
     */
    findById(pictureId) {
        if (!pictureId) {
            // There is no picture Id specified
            return Promise.reject(new Error('No picture Id specified'));
        }
        return Picture.findById(pictureId).exec();
    }
}

//  export picture controller
module.exports = pictureController;