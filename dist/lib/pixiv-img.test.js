"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pixiv_img_1 = require("./pixiv-img");
var test_helper_1 = require("../testhelper/test.helper");
var fetchMock = require("fetch-mock");
var stream_1 = require("stream");
var concat = require("concat-stream");
describe('pixiv-img', function () {
    var fetchURL = "https://huaji8.top/";
    var data = "data";
    beforeEach(function () {
        fetchMock.getOnce("https://huaji8.top/", data, {
            headers: {
                Referer: 'http://www.pixiv.net/'
            }
        });
    });
    afterEach(function () {
        fetchMock.reset();
    });
    it("fetch pixiv img", function (done) {
        pixiv_img_1.default(fetchURL).then(function (res) {
            test_helper_1.expect(res).to.be.instanceOf(stream_1.Readable);
            res.pipe(concat(function (buf) {
                test_helper_1.expect(buf.toString()).to.be.eql("data");
                done();
            }));
        });
    });
});
//# sourceMappingURL=pixiv-img.test.js.map
