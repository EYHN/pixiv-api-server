"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
var nextTick_1 = require("../util/nextTick");
var pixivimg = require("./pixiv-img");
var illustDetailTestDetail_1 = require("./illustDetailTestDetail");
var rewire = require("rewire");
var test_helper_1 = require("../testhelper/test.helper");
var wait = require("../util/wait");
describe('illustDetail', function () {
    var illustDetail = void 0;
    var testDate = illustDetailTestDetail_1.default;
    beforeEach(function () {
        illustDetail = rewire("./illustDetail.js");
    });
    afterEach(function () {
        test_helper_1.sandbox.restore();
        illustDetail.__set__("DetailIllusts", []);
    });
    it("update when don't have any data and return undefined", _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        illustDetail.__set__("DetailIllusts", []);
                        test_helper_1.sandbox.stub(illustDetail, "updateDetailIllust");
                        _context.next = 4;
                        return illustDetail.detailillust();

                    case 4:
                        res = _context.sent;

                        test_helper_1.expect(res).to.be.undefined;
                        test_helper_1.expect(illustDetail.updateDetailIllust).to.be.calledOnce;

                    case 7:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    })));
    it("update when data has error and return undefined", _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        illustDetail.__set__("DetailIllusts", [1]);
                        test_helper_1.sandbox.stub(illustDetail, "updateDetailIllust");
                        _context2.next = 4;
                        return illustDetail.detailillust();

                    case 4:
                        res = _context2.sent;

                        test_helper_1.expect(res).to.be.undefined;
                        test_helper_1.expect(illustDetail.updateDetailIllust).to.be.calledOnce;

                    case 7:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    })));
    it("It is not updated when data is already available and return one of them", _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        illustDetail.__set__("DetailIllusts", testDate);
                        test_helper_1.sandbox.stub(illustDetail, "updateDetailIllust");
                        test_helper_1.sandbox.stub(pixivimg, "default");
                        _context3.next = 5;
                        return illustDetail.detailillust({
                            size: "medium"
                        });

                    case 5:
                        res = _context3.sent;

                        test_helper_1.expect(pixivimg.default).to.be.calledOnce;
                        test_helper_1.expect(pixivimg.default.args[0][0]).to.be.oneOf(testDate.map(function (value) {
                            return value.imageUrls.medium;
                        }));
                        test_helper_1.expect(illustDetail.updateDetailIllust.called).to.be.false;

                    case 9:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    })));

    var testpixiv = function () {
        function testpixiv() {
            _classCallCheck(this, testpixiv);

            this.pointer = 0;
            this.oncelength = 5;
            this.data = testDate;
            this.times = this.data.length / this.oncelength;
        }

        _createClass(testpixiv, [{
            key: "next",
            value: function next() {
                var _this = this;

                var pointer = this.pointer;
                var returns = nextTick_1.default.then(function () {
                    return {
                        illusts: [].concat(_toConsumableArray(_this.data.slice(pointer, pointer + _this.oncelength)))
                    };
                });
                this.pointer += this.oncelength;
                return returns;
            }
        }, {
            key: "hasNext",
            value: function hasNext() {
                return typeof this.data[this.pointer] !== "undefined";
            }
        }, {
            key: "illustRanking",
            value: function illustRanking() {
                return this.next();
            }
        }]);

        return testpixiv;
    }();

    it("Update detail illust", _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
        var pixiv, res;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        pixiv = new testpixiv();

                        illustDetail.__set__("pixiv", pixiv);
                        illustDetail.__set__("updating", false);
                        test_helper_1.sandbox.stub(wait, "default");
                        res = illustDetail.updateDetailIllust();

                        test_helper_1.expect(illustDetail.__get__("updating"), "put the flag true").to.be.true;
                        _context4.next = 8;
                        return res;

                    case 8:
                        test_helper_1.expect(wait.default).to.be.callCount(Math.ceil(pixiv.times)).and.to.be.calledWith(100);
                        test_helper_1.expect(illustDetail.__get__("DetailIllusts")).to.be.deep.equal(testDate);
                        test_helper_1.expect(illustDetail.__get__("updating"), "put the flag false").to.be.false;

                    case 11:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    })));
    it("on update detail illust err", _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
        var pixiv, res;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        pixiv = new testpixiv();

                        illustDetail.__set__("pixiv", pixiv);
                        illustDetail.__set__("updating", false);
                        test_helper_1.sandbox.stub(wait, "default");
                        test_helper_1.sandbox.stub(pixiv, "hasNext").throws("err");
                        test_helper_1.sandbox.stub(logger_1.default, "error");
                        res = illustDetail.updateDetailIllust();

                        test_helper_1.expect(illustDetail.__get__("updating"), "put the flag true").to.be.true;
                        _context5.next = 10;
                        return res;

                    case 10:
                        test_helper_1.expect(logger_1.default.error).to.be.calledOnce;
                        test_helper_1.expect(illustDetail.__get__("DetailIllusts").length).to.be.equal(0);

                    case 12:
                    case "end":
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    })));
});
//# sourceMappingURL=illustDetail.test.js.map
