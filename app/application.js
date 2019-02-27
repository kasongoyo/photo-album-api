
'use strict';

//dependencies
const path = require('path');
const envFilename = `.env.${process.env.NODE_ENV}`;
require('dotenv').config({ path: path.join(__dirname, '..', envFilename) }); // init dotenv 
const mkdir = require('mkdir-p');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressWinston = require('express-winston');
const cors = require('cors');
const helmet = require('helmet');


//build logs directory if does not exists
mkdir.sync(path.join(__dirname, '..', 'logs'));


//setup winston application logger
const winston = require(path.join(__dirname, 'initializers', 'winston'));

//setup application mongoose instance
require(path.join(__dirname, 'initializers', 'mongoose'));


// load all models recursively
require('require-all')({
  dirname: __dirname,
  filter: /(.+_model)\.js$/,
  excludeDirs: /^\.(git|svn|md)$/
});



// create an express application
const app = express();

// configure helmet middleware
app.use(helmet.hidePoweredBy({
  setTo: 'photo-album 1.0.0'
}));

// setup public directories
app.use(express.static(path.join(__dirname, '..', 'public')));

// middleware to prevent browser cors errors
app.use(cors());

// middleware to parse application/json request 
app.use(bodyParser.json({limit:'50mb'}));
// middleware to parse text/plain request 
app.use(bodyParser.text());
// middleware to parse query string
app.use(bodyParser.urlencoded({
  extended: true
}));

// Let's use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride('_method'));


// app http request logger
app.use(expressWinston.logger({
  winstonInstance: winston
}));

// app errors pipeline logger
app.use(expressWinston.errorLogger({
  winstonInstance: winston
}));

// load all routers recursively
require('require-all')({
  dirname: __dirname,
  filter: /(.+_router)\.js$/,
  excludeDirs: /^\.(git|svn|md)$/,
  resolve: function (router) {
    app.use(router);
  }
});

// catch 404 and forward to error handler
app.use('/*', function (request, response, next) {
  const error = new Error({ message: 'Not Found' });
  next(error);
});



/**
 * @callback errorHandlerCallback
 * error handlers
 * @param {Object} error - Error throwed 
 * @param {Object} req - Http request
 * @param {Object} res - Http response
 * @param {errorHandlerCallback} next - Callback never used in this function but it's important
 * to remain for expressjs to recognize this function as error middleware. 
 * Note:
 * If you remove the callback among function parameters then this function will never get executed
 * when an error is throwing. 
 */
function errorHandler(error, req, res, next) { //eslint-disable-line  no-unused-vars
  winston.error(error); // print error into console and error log
  const { message, statusCode } = error;
  res.status(statusCode || 500);
  res.json({ message });
}

// handle error
app.use(errorHandler);


//export express application
module.exports = app;

