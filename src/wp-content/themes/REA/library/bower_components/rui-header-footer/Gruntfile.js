module.exports = function (grunt) {

    'use strict';

    var config = require('rui-grunt-config'),
        _ = require('lodash');

    // Override the default jshint settings. Try fixing these up mmmkay.
    _.merge(config.jshint.options, {
        maxlen: 250,
        maxcomplexity: 10,
        maxstatements: 17,
        maxdepth: 4,
        maxparams: 8
    });

    config.concat.js = {
        files:{
            //Core stuff to make a REA branded site and nothing more
            '<%= distDir %>/rui-header-footer.js':
            [
                '<%= distDir %>/js/rui-click-buster.js',
                '<%= distDir %>/js/rui-touch-button.js',
                '<%= distDir %>/js/rui-side-panel.js',
                '<%= distDir %>/js/rui-user-view.js',
                '<%= distDir %>/js/rui-header.js'
            ]
        }
    };


    grunt.initConfig(config);
};
