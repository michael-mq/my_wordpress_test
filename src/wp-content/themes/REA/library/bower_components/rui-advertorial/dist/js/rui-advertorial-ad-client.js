/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-ad-client', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialAdClient = factory();
    }
}(this, function () {

    var AdvertorialAdClient = function () {};

    AdvertorialAdClient.getCurrent = function () {
        var ruiAdClient = window.ruiAdClient ? window.ruiAdClient : 'rea';
        return ruiAdClient;
    };

    return AdvertorialAdClient;
}));