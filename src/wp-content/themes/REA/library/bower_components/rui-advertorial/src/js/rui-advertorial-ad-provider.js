(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(
            'rui-advertorial-ad-provider',
            ['rui-advertorial-doubleclick', 'rui-advertorial-sas', 'rui-debug-tools'],
            factory
        );
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialAdProvider = factory(
            root.RUI.AdvertorialDoubleClick, root.RUI.AdvertorialSas, root.RUI.Debug
        );
    }
}(this, function (AdvertorialDoubleClick, AdvertorialSas, RuiDebug) {

    var AdvertorialAdProvider = function () {};

    AdvertorialAdProvider.PROVIDERS = {
        "SAS":  AdvertorialSas,
        "DC":   AdvertorialDoubleClick
    };

    AdvertorialAdProvider.DEFAULT_PROVIDER = AdvertorialSas;

    AdvertorialAdProvider.getCode = function() {
        // TODO: need to find a place for this other than window
        return window.ruiAdProvider || null;
    };

    AdvertorialAdProvider.getCurrent = function () {
        return this.PROVIDERS[ this.getCode() ] || this.DEFAULT_PROVIDER;
    };

    AdvertorialAdProvider.isDefault = function() {
        var isDefault = this.getCurrent() === AdvertorialAdProvider.DEFAULT_PROVIDER;

        if (!isDefault) {
            RuiDebug.warn("Advertorial", "Not using default ad provider. Using " + this.getCode() + ".");
        }

        return isDefault;
    };

    return AdvertorialAdProvider;

}));
