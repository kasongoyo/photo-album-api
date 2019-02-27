'use strict';

/**
 * Picture represent image with caption
 */

// dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
    // base 64 image uri
    uri: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    // album this picture belong to
    album: {
        type: Schema.Types.ObjectId,
        required: true
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

PictureSchema.index({ name: 'text', description: 'text' });

// export album model
module.exports = mongoose.model('Picture', PictureSchema);