'use strict';

/**
 * Album represent picture store with the very specific
 * theme. It's possible to have multiple albums for multiple
 * themes like birthday album or trip to Italy album etc
 */

// dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
},
{
    toObject: {
      getters: true,
      virtuals: true
    },
    toJSON: {
      getters: true,
      virtuals: true
    },
    timestamps: true
  });

AlbumSchema.index({title:'text', description: 'text'});

// export album model
module.exports = mongoose.model('Album', AlbumSchema);
