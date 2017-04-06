// Logger utility
import * as winston from 'winston';
import * as nconf from 'nconf';
import { LogCallback } from "winston";
import * as _ from 'lodash'

const IS_PROD = nconf.get('IS_PROD');
const IS_TEST = nconf.get('IS_TEST');
const ENABLE_LOGS_IN_TEST = nconf.get('ENABLE_CONSOLE_LOGS_IN_TEST') === 'true';
const ENABLE_LOGS_IN_PROD = nconf.get('ENABLE_CONSOLE_LOGS_IN_PROD') === 'true';

const winstonLogger = new winston.Logger();

if (IS_PROD) {
  if (ENABLE_LOGS_IN_PROD) {
    winstonLogger.add(winston.transports.Console, {
      timestamp: true,
      colorize: false,
      prettyPrint: false,
    });
  }
} else if (!IS_TEST || IS_TEST && ENABLE_LOGS_IN_TEST) { // Do not log anything when testing unless specified
  winstonLogger
    .add(winston.transports.Console, {
      timestamp: true,
      colorize: true,
      prettyPrint: true,
    });
}

// exports a public interface insteaf of accessing directly the logger module
const logger:{info:(...args:any[])=>void,error:(err:any,errorDate?:any,...otherArgs:any[])=>void} = {
  
  info : winstonLogger.info,

  // Accepts two argument,
  // an Error object (required)
  // and an object of additional data to log alongside the error
  // If the first argument isn't an Error, it'll call logger.error with all the arguments supplied
  error : (...args:any[])=> {
    let [err, errorData = {}, ...otherArgs] = args;

    if (err instanceof Error) {
      // pass the error stack as the first parameter to logger.error
      let stack = err.stack || err.message || err;

      if (_.isPlainObject(errorData) && !errorData.fullError) {
        errorData.fullError = err;
      }

      let loggerArgs = [stack, errorData, ...otherArgs];

      // Treat 4xx errors that are handled as warnings, 5xx and uncaught errors as serious problems
      if (!errorData || !errorData.isHandledError || errorData.httpCode >= 500) {
        winstonLogger.error.bind(winstonLogger)(...loggerArgs);
      } else {
        winstonLogger.warn.bind(winstonLogger)(...loggerArgs);
      }
    } else {
      winstonLogger.error.bind(winstonLogger)(...args);
    }
  }
};

// Logs unhandled promises errors
// when no catch is attached to a promise a unhandledRejection event will be triggered
process.on('unhandledRejection', function handlePromiseRejection (reason:any) {
  logger.error(reason);
});

export default logger;
