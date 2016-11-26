(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-sas-forecast', ['rui-advertorial', 'rui-advertorial-sas'], function (Advertorial, AdvertorialSas) {
            return factory(Advertorial, AdvertorialSas);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialSasForecast = factory(root.RUI.Advertorial, root.RUI.AdvertorialSas);
    }
}(this, function (Advertorial, AdvertorialSas) {

    return {
        'run': function () {
            var sasProductionUrl = AdvertorialSas.getSingleRequestUrl(Advertorial.allAds, Advertorial.random);
            var sasForecastingUrl = sasProductionUrl.replace('sasinator.realestate.com.au/rea', 'crtlt2.aimatch.com/readev');
            var bodyElement = document.getElementsByTagName('body')[0];
            var scriptTag = document.createElement('script');
            scriptTag.type = "text/javascript";
            scriptTag.id = 'rui-ad-sas-forecaster';
            scriptTag.src = sasForecastingUrl;
            bodyElement.appendChild(scriptTag);
        }
    };
}));
