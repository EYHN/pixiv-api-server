"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var test_helper_1 = require("../testhelper/test.helper");
var pixiv_slideshow_illusts_1 = require("./pixiv-slideshow-illusts");
var pixivSlideshowIllustsO = require("./pixiv-slideshow-illusts");
var fetchMock = require("fetch-mock");
var pixivimg = require("./pixiv-img");
describe('pixiv-slideshow-illusts', function () {
    var data = {
        "pixivBackgroundSlideshow.illusts": {
            portrait: [],
            landscape: [{ url: { "1200x1200": "123" } }, { url: { "1200x1200": "123" } }, { url: { "1200x1200": "123" } }, { url: { "1200x1200": "123" } }, { url: { "1200x1200": "123" } }, { url: { "1200x1200": "123" } }, { url: { "1200x1200": "321" } }, { url: { "1200x1200": "1111" } }]
        }
    };
    var html = "\n  <input id=\"init-config\" value='" + JSON.stringify(data) + "'/>\n  ";
    beforeEach(function () {
        fetchMock.getOnce("http://www.pixiv.net/", html);
    });
    afterEach(function () {
        fetchMock.reset();
        test_helper_1.sandbox.restore();
    });
    it("return pixivBackgroundSlideshow.illusts from input in the html ", function (done) {
        pixiv_slideshow_illusts_1.pixivSlideshowIllusts().then(function (res) {
            test_helper_1.expect(res).to.be.deep.equal(data["pixivBackgroundSlideshow.illusts"].landscape);
            done();
        });
    });
    it("get pixivimg from pixivSlideshowIllusts() and Math.random", function (done) {
        var returnValue = { a: 1 };
        test_helper_1.sandbox.stub(pixivimg, "default");
        test_helper_1.sandbox.stub(Math, "random");
        test_helper_1.sandbox.stub(pixivSlideshowIllustsO, "pixivSlideshowIllusts");
        Math.random.returns(1);
        pixivSlideshowIllustsO.pixivSlideshowIllusts.returns(new Promise(function (resolve, reject) {
            resolve(data["pixivBackgroundSlideshow.illusts"].landscape);
        }));
        pixivimg.default.withArgs("1111").returns(new Promise(function (resolve, reject) {
            resolve(returnValue);
        }));
        pixiv_slideshow_illusts_1.pixivSlideshowIllustImg().then(function (res) {
            test_helper_1.expect(res).to.be.deep.equal(returnValue);
            test_helper_1.expect(Math.random).to.be.calledOnce;
            test_helper_1.expect(pixivimg.default).to.be.calledOnce;
            test_helper_1.expect(pixivSlideshowIllustsO.pixivSlideshowIllusts).to.be.calledOnce;
            done();
        });
    });
});
//# sourceMappingURL=pixiv-slideshow-illusts.test.js.map
