"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var setupNconf_1 = require("./setupNconf");
var path = require("path");
require("mocha");
var nconf = require("nconf");
var test_helper_1 = require("../testhelper/test.helper");
describe('setupNconf', function () {
    afterEach(function () {
        test_helper_1.sandbox.restore();
    });
    it('sets up nconf', function () {
        test_helper_1.sandbox.stub(nconf, 'argv').returnsThis();
        test_helper_1.sandbox.stub(nconf, 'env').returnsThis();
        test_helper_1.sandbox.stub(nconf, 'file').returnsThis();
        setupNconf_1.default();
        test_helper_1.expect(nconf.argv).to.be.calledOnce;
        test_helper_1.expect(nconf.env).to.be.calledOnce;
        test_helper_1.expect(nconf.file).to.be.calledOnce;
        test_helper_1.expect(nconf.file.lastCall.args[0].file).to.be.match(new RegExp("\\" + path.sep + "config.json$"));
    });
    it('sets IS_PROD variable', function () {
        setupNconf_1.default();
        test_helper_1.expect(nconf.get('IS_PROD')).to.exist;
    });
    it('sets IS_DEV variable', function () {
        setupNconf_1.default();
        test_helper_1.expect(nconf.get('IS_DEV')).to.exist;
    });
    it('allows a custom config.json file to be passed in', function () {
        test_helper_1.sandbox.stub(nconf, 'file').returnsThis();
        setupNconf_1.default('customfile.json');
        test_helper_1.expect(nconf.file.lastCall.args[0].file).to.be.equal("customfile.json");
    });
});
//# sourceMappingURL=setupNconf.test.js.map
