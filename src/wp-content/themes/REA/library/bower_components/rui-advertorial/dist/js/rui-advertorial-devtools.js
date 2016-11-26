/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-devtools', ['rui-browser-utils', 'rui-debug-tools'], factory);
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialDevTools = factory(root.RUI.BrowserUtils, root.RUI.Debug);
    }
}(this, function (RuiBrowserUtils, RuiDebug) {

    var KILL_SWITCH_PARAM = 'rui_ads_disabled';
    var POS_WHITELIST_PARAM = 'rui_ads_only_pos';

    var paramOverrideWhitelist = [
        {name: 'env', queryStringKey: 'rui_ads_env'},
        {name: 'fcid', queryStringKey: 'rui_ads_fcid'}
    ];

    /*jshint sub:true*/
    function allAdsDisabled(params) {
        return params[KILL_SWITCH_PARAM] === 'true';
    }

    function hasQueryParam(key, params) {
        return params[key] !== undefined && params[key] !== null;
    }

    function posRestricted(params) {
        return hasQueryParam(POS_WHITELIST_PARAM, params);
    }

    function posInWhitelist(params, adSpot) {
        return params[POS_WHITELIST_PARAM].split(',').indexOf(adSpot.params.pos) > -1;
    }

    function addTargetingParam(adSpot, name, queryStringKey, params) {
        adSpot.params[name] = params[queryStringKey].replace(/[^\w-]/g, '');
        RuiDebug.log('Advertorial', 'AdvertorialDevTools setting "' + name + '=' +
            adSpot.params[name] + '" for AdSpot', adSpot);
        return adSpot;
    }
    /*jshint sub:false*/

    return {
        isDisabled: function (adSpot) {
            var params = RuiBrowserUtils.getQueryParams();
            return allAdsDisabled(params) ||
                (posRestricted(params) && !posInWhitelist(params, adSpot));
        },
        addDebuggingParams: function (adSpot) {
            var params = RuiBrowserUtils.getQueryParams();
            for (var i = 0; i < paramOverrideWhitelist.length; i++) {
                if (hasQueryParam(paramOverrideWhitelist[i].queryStringKey, params)) {
                    adSpot = addTargetingParam(adSpot, paramOverrideWhitelist[i].name,
                        paramOverrideWhitelist[i].queryStringKey, params);
                }
            }
            return adSpot;
        }
    };

}));
