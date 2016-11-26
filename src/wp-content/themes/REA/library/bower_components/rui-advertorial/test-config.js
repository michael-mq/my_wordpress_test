REA.testConfig.paths.postscribe = '../../bower_components/postscribe/dist/postscribe';
REA.testConfig.paths.mustache = '../../bower_components/mustache/mustache';
REA.testConfig.paths.fetch = '../../bower_components/fetch/fetch';
REA.testConfig.paths.promise = '../../bower_components/es6-promise/promise';

REA.testConfig.shim = REA.testConfig.shim || {};
REA.testConfig.shim.postscribe = {
  exports: 'postscribe'
};

REA.testConfig.shim.fetch = {
  exports: 'fetch'
};
