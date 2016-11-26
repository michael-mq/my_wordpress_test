module.exports = function (grunt) {

    'use strict';

    var config = require('rui-grunt-config'),
        _ = require('lodash');

    _.merge(config.jshint.options, {
        maxlen: 140,
        maxcomplexity: 13,
        maxstatements: 17,
        maxdepth:3
    });

    grunt.initConfig(config);

    // override default task - no tests
    grunt.registerTask('test', ['jshint']);

};
