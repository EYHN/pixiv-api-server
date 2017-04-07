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
            landscape: [{
                url: {
                    "1200x1200": "https:\/\/i.pximg.net\/img-master\/img\/2013\/07\/08\/01\/50\/25\/36919122_p0_master1200.jpg"
                }
            }, {
                url: {
                    "1200x1200": "https:\/\/i.pximg.net\/img-master\/img\/2011\/02\/21\/14\/30\/27\/16848987_p0_master1200.jpg"
                }
            }]
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
    it("get pixivimg from pixivSlideshowIllusts()", function (done) {
        var pixivimgStub = test_helper_1.sandbox.stub(pixivimg, "default");
        var pixivSlideshowIllustsFunc = test_helper_1.sandbox.stub(pixivSlideshowIllustsO, "default");
        pixivSlideshowIllustsFunc.returnValue(new Promise(function (resolve, reject) {
            resolve([{
                url: {
                    "1200x1200": "321"
                }
            }, {
                url: {
                    "1200x1200": "123"
                }
            }]);
        }));
        pixivimgStub.returnValue(new Promise(function (resolve, reject) {
            resolve({ a: 1 });
        }));
        pixiv_slideshow_illusts_1.pixivSlideshowIllustImg().then(function (res) {
            console.log(res);
        });
        test_helper_1.expect(pixivSlideshowIllustsFunc).to.be.calledOnce;
        test_helper_1.expect(pixivimgStub).to.be.calledOnce;
    });
});
//# sourceMappingURL=pixiv-slideshow-illusts.test.js.map
