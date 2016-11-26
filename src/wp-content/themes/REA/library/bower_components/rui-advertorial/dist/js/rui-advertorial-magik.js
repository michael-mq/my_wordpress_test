/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-magik', ['jquery', 'rui-advertorial'], function ($, Advertorial) {
            return factory($);
        });
    } else {
        factory(root.jQuery, root.RUI.Advertorial);
    }
}(this, function ($, Advertorial) {
    $(function () {
        Advertorial.loadAds();
    });
}));