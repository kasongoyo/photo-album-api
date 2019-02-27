
'use strict';

//dependencies
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const mongooseAutopopulate = require('mongoose-autopopulate');
const mongooseHidden = require('mongoose-hidden')({
  hidden: {
    _id: true,
    password: true
  }
});



/**
 * @description generate mongoose connection uri string
 * @type {String}
 */
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || '27017';
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const login = DB_USER && DB_USER.length ? `${DB_USER}:${DB_PASSWORD}@` : '';
const uristring = `mongodb://${login}${DB_HOST}:${DB_PORT}/${DB_NAME}`;


/**
 * @description mongodb options
 * @type {Object}
 */
const mongoOptions = {
  useNewUrlParser: true,
  useCreateIndex: true
}


/**
 * @description plugin schema wide mongoose plugins 
 */
mongoose.plugin(mongoosePaginate);
mongoose.plugin(mongooseAutopopulate);
mongoose.plugin(mongooseHidden);


/**
 * @description establish database connection
 */
mongoose.connect(uristring, mongoOptions);


mongoose.Promise = global.Promise;
/**
 * @description export mongoose
 * @type {Mongoose}
 */
module.exports = mongoose;

