// modify from https://www.sitepoint.com/cache-fetched-ajax-requests/
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
require("isomorphic-fetch");
require("babel-polyfill");
var utils = require('utility');
exports.Storage = new Map();
function getContent(content) {
    try {
        content = JSON.parse(content);
    } catch (e) {}
    return content;
}
function reset() {
    exports.Storage.clear();
}
exports.reset = reset;
function cachedFetch(url) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var expiry = 10 * 60; // 5 min default
    var cacheKey = undefined;
    // Use the URL as the cache key to localStorage
    cacheKey = 'cf_' + utils.md5(url);
    var cached = exports.Storage.get(cacheKey);
    var cachedExpiresAt = exports.Storage.get(cacheKey + ':ts');
    if (cached !== undefined && cachedExpiresAt !== undefined) {
        var age = (Date.now() - cachedExpiresAt) / 1000;
        if (age < expiry) {
            logger_1.default.info("Cache Hit : " + cacheKey);
            var buffer = Buffer.from([]);
            var response = new Response(cached);
            return Promise.resolve(response);
        } else {
            exports.Storage.delete(cacheKey);
            exports.Storage.delete(cacheKey + ':ts');
        }
    }
    return fetch(url, options).then(function (response) {
        if (response.status === 200) {
            var ct = response.headers.get('Content-Type');
            if (ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
                response.clone().text().then(function (content) {
                    exports.Storage.set(cacheKey, content).set(cacheKey + ':ts', Date.now());
                });
            }
        }
        return response;
    });
}
exports.default = cachedFetch;
//# sourceMappingURL=cachedFetch.js.map
