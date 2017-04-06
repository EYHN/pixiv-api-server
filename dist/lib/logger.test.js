"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var logger_1 = require("./logger");
var test_helper_1 = require("../testhelper/test.helper");
describe('logger', function () {
    var logSpy = void 0;
    beforeEach(function () {
        logSpy = test_helper_1.sandbox.stub(winston.Logger.prototype, 'log');
    });
    afterEach(function () {
        test_helper_1.sandbox.restore();
    });
    describe('info', function () {
        it('calls winston\'s info log', function () {
            logger_1.default.info(1, 2, 3);
            test_helper_1.expect(logSpy).to.be.calledOnce;
            test_helper_1.expect(logSpy).to.be.calledWith('info', 1, 2, 3);
        });
    });
    describe('error', function () {
        context('non-error object', function () {
            it('passes through arguments if the first arg is not an error object', function () {
                logger_1.default.error(1, 2, 3, 4);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', 1, 2, 3, 4);
            });
        });
        context('error object', function () {
            it('logs the stack and the err data', function () {
                var errInstance = new Error('An error.');
                logger_1.default.error(errInstance, {
                    data: 1
                }, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', errInstance.stack, { data: 1, fullError: errInstance }, 2, 3);
            });
            it('logs the stack and the err data with it\'s own fullError property', function () {
                var errInstance = new Error('An error.');
                var anotherError = new Error('another error');
                logger_1.default.error(errInstance, {
                    data: 1,
                    fullError: anotherError
                }, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', errInstance.stack, { data: 1, fullError: anotherError }, 2, 3);
            });
            it('logs the error when errorData is null', function () {
                var errInstance = new Error('An error.');
                logger_1.default.error(errInstance, null, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', errInstance.stack, null, 2, 3);
            });
            it('logs the error when errorData is not an object', function () {
                var errInstance = new Error('An error.');
                logger_1.default.error(errInstance, true, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', errInstance.stack, true, 2, 3);
            });
            it('logs the error when errorData does not include isHandledError property', function () {
                var errInstance = new Error('An error.');
                logger_1.default.error(errInstance, { httpCode: 400 }, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', errInstance.stack, { httpCode: 400, fullError: errInstance }, 2, 3);
            });
            it('logs the error when errorData includes isHandledError property but is a 500 error', function () {
                var errInstance = new Error('An error.');
                logger_1.default.error(errInstance, {
                    isHandledError: true,
                    httpCode: 502
                }, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('error', errInstance.stack, { httpCode: 502, isHandledError: true, fullError: errInstance }, 2, 3);
            });
            it('logs a warning when errorData includes isHandledError property and is not a 500 error', function () {
                var errInstance = new Error('An error.');
                logger_1.default.error(errInstance, {
                    isHandledError: true,
                    httpCode: 403
                }, 2, 3);
                test_helper_1.expect(logSpy).to.be.calledOnce;
                test_helper_1.expect(logSpy).to.be.calledWith('warn', errInstance.stack, { httpCode: 403, isHandledError: true, fullError: errInstance }, 2, 3);
            });
        });
    });
});
//# sourceMappingURL=logger.test.js.map
