/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-postscribe', ['postscribe'],
            function (postscribe) {
                return factory(postscribe);
            });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialPostscribe = factory(root.postscribe);
    }
}(this, function (postscribe) {

    var AdvertorialPostscribe = {
        createLazyAd: function (element, scriptTag) {
            postscribe(element, scriptTag);
        }
    };

    return AdvertorialPostscribe;
}));
