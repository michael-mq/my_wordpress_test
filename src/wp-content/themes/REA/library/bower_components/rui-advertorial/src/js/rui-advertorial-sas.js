(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-sas', ['rui-advertorial-ad-client'], function (AdvertorialAdClient) {
            return factory(AdvertorialAdClient);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialSas = factory(root.RUI.AdvertorialAdClient);
    }
}(this, function (AdvertorialAdClient) {
    var AdvertorialSas = function () {
    };
    AdvertorialSas.BASE_SAS_URL = "//sasinator.realestate.com.au/";
    AdvertorialSas.PARAMS_BLACKLIST = ["sect", "tile", "type", "dcopt", "areaprefix", "channel"];

    AdvertorialSas.getBaseUrl = function () {
        return AdvertorialSas.BASE_SAS_URL + AdvertorialAdClient.getCurrent();
    };

    AdvertorialSas.generateAdLink = function (adSpot, type, random) {
        var typeMapping = {
                "javascript": "jserver",
                "iframe": "hserver",
                "native": "hserver",
                "image": "iserver",
                "jump": "adclick"
            },
            url = AdvertorialSas.getBaseUrl() + "/";

        url += typeMapping[type];
        url += getPageParamUrlPart(adSpot, random);
        url += getUniqueParamUrlPart(adSpot);
        return url;
    };

    AdvertorialSas.loadSingleRequestAds = function (adSpots, random) {
        var url = AdvertorialSas.getSingleRequestUrl(adSpots, random),
            headElement = document.getElementsByTagName('head')[0],
            scriptTag = document.createElement('script');

        scriptTag.type = "text/javascript";
        scriptTag.id = 'rui-ad-singlerequest';

        onScriptTagLoaded(scriptTag, function() {
            AdvertorialSas.insertSingleRequestAds();
        });
        scriptTag.src = url;
        headElement.appendChild(scriptTag);
    };


    AdvertorialSas.getCacheBuster = function () {
        return Math.floor(Math.random() * 1e10);
    };

    AdvertorialSas.insertSingleRequestAds = function () {
        var adSpots = AdvertorialSas.singleRequestAdSpots;
        for (var i = 0; i < adSpots.length; i++) {
            var adSpot = adSpots[i];
            var adIFrame = document.createElement("iframe");
            adIFrame.frameBorder = 0;
            adIFrame.scrolling = "no";
            adIFrame.style.border = "0";
            adIFrame.marginWidth = "0";
            adIFrame.marginHeight = "0";

            adSpot.element.appendChild(adIFrame);

            adIFrame.contentWindow.contents = window["b" + (i + 1)];

            adIFrame.src = 'javascript-window["contents"];'.replace(/\-/g, ':');

            adSpot.resizeContainerToFitAd(adIFrame);
        }
    };

    AdvertorialSas.supportsSingleRequest = function () {
        return true;
    };

    function onScriptTagLoaded(scriptTag, callback) {
        if (typeof(scriptTag.onload) === 'undefined') {
            scriptTag.onreadystatechange = function () {
                if (scriptTag.readyState === 'loaded' || scriptTag.readyState === 'complete') {
                    scriptTag.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            scriptTag.onload = function () {
                callback();
            };
        }
    }

    function getKruxParams(adSpot) {
        var params = '',
            kruxUID = adSpot.getKruxUID(),
            kruxSegments = adSpot.getKruxSegments();

        if (kruxSegments.length > 0) {
            params += "/segment=" + kruxSegments.join(",");
        }

        if (kruxUID.length > 0) {
            params += "/kxkuid=" + kruxUID;
        }

        return params;
    }

    function getPageParamUrlPart(adSpot, random) {
        var config = mergeSasOverrideValues(adSpot.config, adSpot.sasOverrides),
            params = mergeSasOverrideValues(adSpot.getPageParams(), adSpot.sasOverrides),
            siteComponents = config.site.split('.'),
            siteAbbreviation = siteComponents[0],
            channel = params.areaprefix || params.channel || siteComponents[1],
            pageType = params.sect,
            url = "";

        url += "/viewid=" + random;
        url += "/site=" + siteAbbreviation;
        url += "/area=" + channel + "." + pageType;
        url += getKruxParams(adSpot);
        url += turnParamsIntoUrls(params);
        url += "/random=" + AdvertorialSas.getCacheBuster();

        return url;
    }


    function getUniqueParamUrlPart(adSpot) {
        mergeSasOverrideValues(adSpot.config, adSpot.sasOverrides);
        var params = mergeSasOverrideValues(adSpot.getUniqueParams(), adSpot.sasOverrides),
            url = turnParamsIntoUrls(params);

        url += "/size=" + adSpot.getAdSize();
        return url;
    }

    AdvertorialSas.getSingleRequestUrl = function (adSpots, random) {
        var url = AdvertorialSas.getBaseUrl();
        url += "/bserver/ball";
        url += getPageParamUrlPart(adSpots[0], random);

        AdvertorialSas.singleRequestAdSpots = adSpots;

        for (var i = 0; i < adSpots.length; i++) {
            var posValue = i + 1;
            url += "/b" + posValue + getUniqueParamUrlPart(adSpots[i], random);
        }
        return url;
    };

    function turnParamsIntoUrls(params) {
        var url = "",
            paramKeys = (Object.keys(params)).sort();
        for (var i = 0; i < paramKeys.length; i++) {
            var paramKey = paramKeys[i];
            if (AdvertorialSas.PARAMS_BLACKLIST.indexOf(paramKey) < 0) {
                var paramValue = params[paramKey];
                if (paramValue) {
                    var tagValue = "";

                    if (typeof paramValue === 'string') {
                        tagValue = paramValue.indexOf("|") ? paramValue.replace(/\|/g, ",") : paramValue;
                    }
                    else {
                        tagValue = paramValue;
                    }

                    url += "/" + paramKey + "=" + tagValue;
                }
            }
        }
        return url;
    }

    var mergeSasOverrideValues = function (values, overrides) {
        for (var key in overrides) {
            if (key in values) {
                values[key] = overrides[key];
            }
        }
        return values;
    };

    return AdvertorialSas;
}));
