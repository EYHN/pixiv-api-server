"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

Object.defineProperty(exports, "__esModule", { value: true });
// Logger utility
var winston = require("winston");
var nconf = require("nconf");
var _ = require("lodash");
var IS_PROD = nconf.get('IS_PROD');
var IS_TEST = nconf.get('IS_TEST');
var ENABLE_LOGS_IN_TEST = nconf.get('ENABLE_CONSOLE_LOGS_IN_TEST') === 'true';
var ENABLE_LOGS_IN_PROD = nconf.get('ENABLE_CONSOLE_LOGS_IN_PROD') === 'true';
var winstonLogger = new winston.Logger();
if (IS_PROD) {
    if (ENABLE_LOGS_IN_PROD) {
        winstonLogger.add(winston.transports.Console, {
            timestamp: true,
            colorize: false,
            prettyPrint: false
        });
    }
} else if (!IS_TEST || IS_TEST && ENABLE_LOGS_IN_TEST) {
    winstonLogger.add(winston.transports.Console, {
        timestamp: true,
        colorize: true,
        prettyPrint: true
    });
}
// exports a public interface insteaf of accessing directly the logger module
var logger = {
    info: winstonLogger.info,
    // Accepts two argument,
    // an Error object (required)
    // and an object of additional data to log alongside the error
    // If the first argument isn't an Error, it'll call logger.error with all the arguments supplied
    error: function error() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var err = args[0],
            _args$ = args[1],
            errorData = _args$ === undefined ? {} : _args$,
            otherArgs = args.slice(2);

        if (err instanceof Error) {
            // pass the error stack as the first parameter to logger.error
            var stack = err.stack || err.message || err;
            if (_.isPlainObject(errorData) && !errorData.fullError) {
                errorData.fullError = err;
            }
            var loggerArgs = [stack, errorData].concat(_toConsumableArray(otherArgs));
            // Treat 4xx errors that are handled as warnings, 5xx and uncaught errors as serious problems
            if (!errorData || !errorData.isHandledError || errorData.httpCode >= 500) {
                winstonLogger.error.bind(winstonLogger).apply(undefined, _toConsumableArray(loggerArgs));
            } else {
                winstonLogger.warn.bind(winstonLogger).apply(undefined, _toConsumableArray(loggerArgs));
            }
        } else {
            winstonLogger.error.bind(winstonLogger).apply(undefined, args);
        }
    }
};
// Logs unhandled promises errors
// when no catch is attached to a promise a unhandledRejection event will be triggered
process.on('unhandledRejection', function handlePromiseRejection(reason) {
    logger.error(reason);
});
exports.default = logger;
//# sourceMappingURL=logger.js.map
