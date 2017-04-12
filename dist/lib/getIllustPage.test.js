"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var test_helper_1 = require("../testhelper/test.helper");
var imageUrlsI_1 = require("../interface/imageUrlsI");
var getIllustPage_1 = require("./getIllustPage");
var rewire = require("rewire");
describe('getIllustPage', function () {
    context("getImageFromUrls", function () {
        it("find the url with size", function () {
            test_helper_1.expect(getIllustPage_1.getImageFromUrls({
                "large": "1",
                "medium": "2",
                "original": "3",
                "squareMedium": "4"
            }, imageUrlsI_1.imageSizeE.medium)).to.be.equal("2");
        });
        it("find the url with default size", function () {
            var getIllustPage = rewire("./getIllustPage.js");
            getIllustPage.__set__("defaultSize", imageUrlsI_1.imageSizeE.medium);
            test_helper_1.expect(getIllustPage.getImageFromUrls({
                "large": "1",
                "medium": "2",
                "original": "3",
                "squareMedium": "4"
            })).to.be.equal("2");
        });
    });
});
//# sourceMappingURL=getIllustPage.test.js.map
