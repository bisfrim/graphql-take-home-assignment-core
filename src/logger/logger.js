/**
 * @file: logger.js
 * @author: Bismark
 * @version: 1.0
 * Created Date: 05/27/2021
 */
const log4js = require('log4js');
const applicationPropertiesSingleton = require('../modules/applicationPropertiesSingleton');
const debugLevel = applicationPropertiesSingleton.VAR_LOGGER_LEVEL;
const logger = log4js.getLogger();

// configure log4js with standard output file
log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
    },
    app: {
      type: 'file',
      filename: './logs/server.log',
      maxLogSize: 10485760,
      backups: 1,
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ['out', 'app'],
      level: debugLevel,
    },
  },
});
logger.debug('Logger Level On : ', debugLevel);
module.exports = logger;
