// Add support for all files in the test directory
var testsContext = require.context(".", true, /(spec\.js$)/);
testsContext.keys().forEach(testsContext);
