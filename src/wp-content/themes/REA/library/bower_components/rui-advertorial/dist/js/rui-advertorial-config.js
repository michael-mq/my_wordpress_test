/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-config', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialConfig = factory();
    }
}(this, function () {

    // Third party toggles

    var AdvertorialConfig = {};
    AdvertorialConfig.kruxLoadingAdsEnabled = false;
    AdvertorialConfig.loadAllAdsAsLazyJsAds = false;
    AdvertorialConfig.defaultNativeAdTemplateUrl = 'https://ads-cdn.reastatic.net/rea-native-ad/m-site/template.html.mst';

    return AdvertorialConfig;
}));
