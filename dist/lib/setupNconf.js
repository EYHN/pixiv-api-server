"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var nconf = require("nconf");
var path_1 = require("path");
require("babel-polyfill");
var PATH_TO_CONFIG = path_1.join(path_1.resolve(__dirname, '../../config.json'));
function setupNconf() {
    var file = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PATH_TO_CONFIG;

    var configFile = file;
    nconf.argv().env().file({ file: configFile });
    nconf.set('IS_PROD', nconf.get('NODE_ENV') === 'production');
    nconf.set('IS_DEV', nconf.get('NODE_ENV') === 'development');
    nconf.set('IS_TEST', nconf.get('NODE_ENV') === 'test');
}
exports.default = setupNconf;
;
//# sourceMappingURL=setupNconf.js.map
