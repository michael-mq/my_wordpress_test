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
