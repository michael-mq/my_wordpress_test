(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-browser-utils', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.BrowserUtils = factory();
    }
} (this, function () {

    var BrowserUtils = {
        defineDeviceType: function(){
            if ((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
                    .test(navigator.userAgent.toLowerCase()))) {
                document.documentElement.className += " is-tablet";
            } else {
                document.documentElement.className += " is-desktop";
            }
        },

        getHistoryLength: function(){
            return window.history.length;
        },

        go: function(howFar){
            window.history.go(howFar);
        },

        getReferrer: function () {
            return document.referrer;
        },

        getHref: function () {
            return window.location.href;
        },

        getPathName: function () {
            return window.location.pathname;
        },

        getQueryString: function () {
            return window.location.search;
        },

        getQueryParams: function () {
            var keyValuePairs = this.getQueryString().substr(1).split('&'),
                params = {};

            if (keyValuePairs.length > 0) {
                for (var i = 0; i < keyValuePairs.length; i++) {
                    var keyVal = keyValuePairs[i].split('=');
                    if (keyVal.length === 2) {
                        params[keyVal[0]] = decodeURIComponent(keyVal[1].replace(/\+/g, ' '));
                    }
                }
            }
            return params;
        },

        lastNavigatedREAURL: function(){
            if(isPreviousReferrerFromREA()){
                return this.getReferrer();
            }else{
                return false;
            }
        },

        redirect: function (url) {
            window.location = url;
        }
    };
    function isPreviousReferrerFromREA(){
        return (BrowserUtils.getReferrer().indexOf('realestate.com.au') != -1 &&
                BrowserUtils.getHistoryLength() > 1);
    }
    return BrowserUtils;

}));
