module.exports = function (grunt) {

    'use strict';

    var config = require('rui-grunt-config'),
        _ = require('lodash');
    //rui grunt config has smarts to include rui dependencies in the tests
    // if you need to use them, problem here is that rui core is a dev dependencies
    // to get the docs looking pretty. This creates a circular dependency as
    // rui-browser-utils is a dependency of rui-grunt-config and the tests are
    // overidden with the browsertools from bower_components. rui-browser-tools
    // is a fairly basic module, we will never need this magic from rui-grunt-config.
    config.karma.options.exclude = ['bower_components/rui-*/**'];
    // Override the default JSHINT settings. Try fixing these up mmmkay.
    _.merge(config.jshint.options, {
        maxcomplexity: 5,
        maxdepth: 3,
        maxstatements: 10
    });

    grunt.initConfig(config);

};
