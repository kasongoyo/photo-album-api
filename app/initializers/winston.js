
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
      level: process.env.LOGGER_CONSOLE_LEVEL || 'info',
      color: true
    }),
    new (winston.transports.File)({
      timestamp: true,
      level: process.env.LOGGER_FILE_LEVEL || 'debug',
      filename: path.join(
        __dirname, '..', '..',
        process.env.LOGGER_DIR || 'logs',
        process.env.LOGGER_FILE || 'logs.json'
      ),
      json: true
    })
  ]
});

module.exports = logger;
