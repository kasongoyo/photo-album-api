
'use strict';

/**
 * @description application logger
 */

//dependencies
const path = require('path');
const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      level: process.env.LOGGER_CONSOLE_LEVEL,
      color: true
    }),
    new (winston.transports.File)({
      timestamp: true,
      level: process.env.LOGGER_FILE_LEVEL,
      filename: path.join(
        __dirname, '..', '..',
        process.env.LOGGER_DIR,
        process.env.LOGGER_FILE
      ),
      json: true
    })
  ]
});

module.exports = logger;
