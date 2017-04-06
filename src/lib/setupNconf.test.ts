import setupNconf from './setupNconf';
import * as path from 'path';
import 'mocha';
import * as nconf from 'nconf';
import { sandbox, expect } from "../testhelper/test.helper";

describe('setupNconf', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('sets up nconf', () => {
    sandbox.stub(nconf, 'argv').returnsThis();
    sandbox.stub(nconf, 'env').returnsThis();
    sandbox.stub(nconf, 'file').returnsThis();

    setupNconf();

    expect(nconf.argv).to.be.calledOnce;
    expect(nconf.env).to.be.calledOnce;
    expect(nconf.file).to.be.calledOnce;

    expect(((nconf.file as sinon.SinonStub).lastCall.args[0].file as string)).to.be.match(new RegExp(`\\${path.sep}config.json$`));
  });

  it('sets IS_PROD variable', () => {
    setupNconf();
    expect(nconf.get('IS_PROD')).to.exist;
  });

  it('sets IS_DEV variable', () => {
    setupNconf();
    expect(nconf.get('IS_DEV')).to.exist;
  });

  it('allows a custom config.json file to be passed in', () => {
    sandbox.stub(nconf, 'file').returnsThis();

    setupNconf('customfile.json');
    expect(((nconf.file as sinon.SinonStub).lastCall.args[0].file as string)).to.be.equal("customfile.json");
  });
});
