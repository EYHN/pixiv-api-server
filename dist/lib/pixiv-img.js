"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var fs = require('fs');
require("isomorphic-fetch");
var pixivimg = function pixivimg(imgUrl) {
    return new Promise(function (resolve, reject) {
        if (typeof imgUrl !== 'string') {
            reject(new TypeError('Expected a string'));
        }
        resolve(fetch(imgUrl, {
            headers: {
                Referer: 'http://www.pixiv.net/'
            }
        }).then(function (res) {
            return res.body;
        }));
    });
};
exports.default = pixivimg;
//# sourceMappingURL=pixiv-img.js.map
