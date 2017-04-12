"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var imageUrlsI_1 = require("../interface/imageUrlsI");
var defaultSize = imageUrlsI_1.imageSizeE.large;
exports.getImageFromUrls = function (imageUrls) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSize;

    var keys = Object.keys(imageUrls);
    var s = keys.map(function (value) {
        return Math.abs(exports.String2imageSizeE(value) - size);
    });
    var lowest = s.reduce(function (lowest, next, index) {
        return next < s[lowest] ? index : lowest;
    }, 0);
    var key = keys[lowest];
    return imageUrls[key];
};
exports.getSingleImageFromIllust = function (illust) {
    var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultSize;

    if (illust.pageCount == 1) {
        return exports.getImageFromUrls(Object.assign({}, illust.imageUrls, { "original": illust.metaSinglePage.originalImageUrl }), size);
    } else {
        return exports.getImageFromUrls(illust.metaPages[0].imageUrls, size);
    }
};
exports.imageSizeE2String = function (size) {
    switch (size) {
        case imageUrlsI_1.imageSizeE.large:
            return "large";
        case imageUrlsI_1.imageSizeE.medium:
            return "medium";
        case imageUrlsI_1.imageSizeE.original:
            return "original";
        case imageUrlsI_1.imageSizeE.squareMedium:
            return "squareMedium";
    }
};
exports.String2imageSizeE = function (size) {
    switch (size) {
        case "large":
            return imageUrlsI_1.imageSizeE.large;
        case "medium":
            return imageUrlsI_1.imageSizeE.medium;
        case "original":
            return imageUrlsI_1.imageSizeE.original;
        case "squareMedium":
            return imageUrlsI_1.imageSizeE.squareMedium;
        default:
            return defaultSize;
    }
};
//# sourceMappingURL=getIllustPage.js.map
