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

    config.concat.css = {
        files: {
            //Core stuff to make a REA branded site and nothing more
            '<%= distDir %>/rui-core.css':
            [
                '<%= distDir %>/css/rui-reset.css',
                '<%= distDir %>/css/rui-grid.css',
                '<%= distDir %>/css/rui-grid-advanced.css',
                '<%= distDir %>/css/rui-font.css',
                '<%= distDir %>/css/rui-icon.css',
                '<%= distDir %>/css/rui-typography.css',
                '<%= distDir %>/css/rui-social.css',
                '<%= distDir %>/css/rui-button.css',
                '<%= distDir %>/css/rui-toggle.css',
                '<%= distDir %>/css/rui-pagination.css',
                '<%= distDir %>/css/rui-hero.css'
            ]
        }
    };
    config.concat.js = {
        files:{
            //Core stuff to make a REA branded site and nothing more
            '<%= distDir %>/rui-core.js':
            [
                '<%= distDir %>/js/rui-toggle.js',
                '<%= distDir %>/js/rui-social.js',
                '<%= distDir %>/js/rui-social-list.js',
                '<%= distDir %>/js/rui-social-list-factory.js',
                '<%= distDir %>/js/rui-cid.js'
            ]
        }
    };

    config.uglify.jsComponent = {
        files: {
            '<%= distDir %>/js/rui-cid.min.js': ['<%= distDir %>/js/rui-cid.js'],
            '<%= distDir %>/js/rui-social.min.js': ['<%= distDir %>/js/rui-social.js'],
            '<%= distDir %>/js/rui-social-list.min.js': ['<%= distDir %>/js/rui-social-list.js'],
            '<%= distDir %>/js/rui-social-list-factory.min.js': ['<%= distDir %>/js/rui-social-list-factory.js'],
            '<%= distDir %>/js/rui-toggle.min.js': ['<%= distDir %>/js/rui-toggle.js'],
            '<%= distDir %>/rui-core.min.js': ['<%= distDir %>/rui-core.js']
        }
    };

    grunt.initConfig(config);
};
