
'use strict';

//set environment to test
process.env.NODE_ENV = 'test';

//dependencies
const path = require('path');
const mongoose = require('mongoose');
require(path.join(__dirname, '..', 'app', 'application'));

/**
 * @description wipe all mongoose model data and drop all indexes
 */
function wipe(done) {
  const cleanups = mongoose.modelNames()
    .map(function (modelName) {
      //grab mongoose model
      return mongoose.model(modelName);
    })
    .map(async Model => {
      //clean up all model data
      await Model.deleteMany({});
      //drop all indexes
      await Model.collection.dropIndexes();
      return;
    });

  //run all clean ups parallel
  Promise
    .all(cleanups)
    .then(() => { done(null) })
    .catch(error => {
      if (error && error.message !== 'ns not found') {
        done(error);
      } else {
        done(null);
      }
    });
}


//restore initial environment
after('After tests clean up', function (done) {
  wipe(done);
});


