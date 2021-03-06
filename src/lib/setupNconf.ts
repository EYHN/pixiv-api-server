import * as nconf from 'nconf';
import { join, resolve } from 'path';
import 'babel-polyfill';

const PATH_TO_CONFIG = join(resolve(__dirname, '../../config.json'));

export default function setupNconf(file: string = PATH_TO_CONFIG) {
  let configFile = file;

  nconf
    .argv()
    .env()
    .file({file:configFile});

  nconf.set('IS_PROD', nconf.get('NODE_ENV') === 'production');
  nconf.set('IS_DEV', nconf.get('NODE_ENV') === 'development');
  nconf.set('IS_TEST', nconf.get('NODE_ENV') === 'test');
};