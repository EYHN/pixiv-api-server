"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var test_helper_1 = require("../testhelper/test.helper");
var cachedFetch = require("./cachedFetch");
var fetchMock = require("fetch-mock");
describe('cachedFetch', function () {
    var data = { a: 1 };
    var url = "https://huaji8.top";
    afterEach(function () {
        cachedFetch.Storage.clear();
        fetchMock.restore();
    });
    it("fetch twice called once", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var response, res, json;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        response = new Response(JSON.stringify(data), {
                            headers: {
                                "Content-Type": "application/json"
                            }
                        });

                        fetchMock.getOnce(url, response);
                        _context.next = 4;
                        return cachedFetch.default(url);

                    case 4:
                        res = _context.sent;
                        _context.next = 7;
                        return res.json();

                    case 7:
                        json = _context.sent;

                        test_helper_1.expect(json).to.be.deep.equal(data);
                        _context.next = 11;
                        return cachedFetch.default(url);

                    case 11:
                        res = _context.sent;
                        _context.next = 14;
                        return res.json();

                    case 14:
                        json = _context.sent;

                        test_helper_1.expect(json).to.be.deep.equal(data);

                    case 16:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
    it("only cache when the status is 200 ", _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var response, res, json;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        response = new Response(JSON.stringify(data), {
                            headers: {
                                "Content-Type": "application/json"
                            },
                            status: 404
                        });

                        fetchMock.getOnce(url, response);
                        console.log(response.bodyUsed);
                        _context2.next = 5;
                        return cachedFetch.default(url);

                    case 5:
                        res = _context2.sent;
                        _context2.next = 8;
                        return res.json();

                    case 8:
                        json = _context2.sent;

                        test_helper_1.expect(json).to.be.deep.equal(data);
                        test_helper_1.expect(cachedFetch.Storage.size).to.be.eql(0);

                    case 11:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    })));
    it("only cache when the Content-Type is application/json or text ", _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var response, res, json;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        response = new Response(JSON.stringify(data), {
                            headers: {
                                "Content-Type": "image/jpeg"
                            },
                            status: 200
                        });

                        fetchMock.getOnce(url, response);
                        _context3.next = 4;
                        return cachedFetch.default(url);

                    case 4:
                        res = _context3.sent;
                        _context3.next = 7;
                        return res.json();

                    case 7:
                        json = _context3.sent;

                        test_helper_1.expect(json).to.be.deep.equal(data);
                        test_helper_1.expect(cachedFetch.Storage.size).to.be.eql(0);

                    case 10:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    })));
    it("reset cache will clean ", _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        cachedFetch.Storage.set("123", "321");
                        cachedFetch.reset();
                        test_helper_1.expect(cachedFetch.Storage.size).to.be.eql(0);

                    case 3:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    })));
});
//# sourceMappingURL=cachedFetch.test.js.map
