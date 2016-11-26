module.exports = function (grunt) {

    'use strict';

    var config = require('rui-grunt-config'),
        _ = require('lodash');
    // Override the default JSHINT settings. Try fixing these up mmmkay.
    _.merge(config.jshint.options, {
        maxlen: 196,
        maxcomplexity: 11,
        maxstatements: 33,
        maxparams: 8,
        maxdepth: 4
    });
    _.merge(config.jshint.test.options, {
        maxlen: 290,
        maxparams: 6
    });

    _.merge(config.concat, {
        'rui-advertorial-all-css': {
            dest: '<%= distDir %>/rui-advertorial-all.css',
            src: [
                '<%= distDir %>/css/rui-advertorial.css'
            ]
        },

        'rui-advertorial-all-js': {
            dest: '<%= distDir %>/rui-advertorial-all.js',
            src: [
                '<%= distDir %>/js/rui-advertorial-devtools.js',
                '<%= distDir %>/js/rui-template-renderer.js',
                '<%= distDir %>/js/rui-advertorial-config.js',
                '<%= distDir %>/js/rui-advertorial-postscribe.js',
                '<%= distDir %>/js/rui-iframe-generator.js',
                '<%= distDir %>/js/rui-iframe-load-listener.js',
                '<%= distDir %>/js/rui-advertorial-ad-client.js',
                '<%= distDir %>/js/rui-advertorial-sas.js',
                '<%= distDir %>/js/rui-advertorial-doubleclick.js',
                '<%= distDir %>/js/rui-advertorial-ad-provider.js',
                '<%= distDir %>/js/rui-advertorial-adspot-resizer.js',
                '<%= distDir %>/js/rui-advertorial-adspot.js',
                '<%= distDir %>/js/rui-advertorial.js'
            ]
        },

        'rui-advertorial-all-magik-js': {
            dest: '<%= distDir %>/rui-advertorial-all-magik.js',
            src: [
                '<%= distDir %>/rui-advertorial-all.js',
                '<%= distDir %>/js/rui-advertorial-magik.js'
            ]
        }
    });

    grunt.registerTask('package', ['clean', 'copy', 'concat', 'cssmin:dist', 'uglify', 'usebanner']);
    grunt.initConfig(config);

};
