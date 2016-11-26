(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-template-renderer', ['mustache', 'rui-advertorial-config'], function (Mustache, AdvertorialConfig) {
            return factory(Mustache, AdvertorialConfig);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialNativeRenderer = factory(root.Mustache, root.RUI.AdvertorialConfig);
    }
}(this, function (Mustache, AdvertorialConfig) {

    var TemplateRenderer = {};

    TemplateRenderer.render = function(json, renderTarget, loadCompleteCallback, adLoaded) {
        var adTemplateUrl =  json.templateurl ? json.templateurl : AdvertorialConfig.defaultNativeAdTemplateUrl;

        fetch(adTemplateUrl).then(function(response) {
            return response.text();
        }).then(function(template) {
            var rendered = Mustache.render(template, json);
            renderTarget.innerHTML = rendered;
            if(typeof loadCompleteCallback === 'function') {
                loadCompleteCallback(json, adLoaded);
            }
        });
    };

    return TemplateRenderer;
}));


