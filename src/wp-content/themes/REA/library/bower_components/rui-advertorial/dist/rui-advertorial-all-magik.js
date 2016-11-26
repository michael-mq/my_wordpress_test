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

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-iframe-generator', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.IFrameGenerator = factory();
    }
} (this, function () {
    var _generateEmptyIframe = function (uniqId) {
        var adIFrame = document.createElement("iframe");
        adIFrame.frameBorder = 0;
        adIFrame.scrolling = "no";
        adIFrame.style.border = "0";
        adIFrame.marginWidth = "0";
        adIFrame.marginHeight = "0";
        adIFrame.id = "rui_frame_" + uniqId;
        return adIFrame;
    };

    var _generateScriptTag = function (jsLink) {
        return "<script type='text/javascript' src='" + jsLink + "' ></script>";
    };

    var appendStandardIframe = function(src, container, uniqId) {
        var adIFrame = _generateEmptyIframe(uniqId);
        adIFrame.src = src;
        container.appendChild(adIFrame);
        return adIFrame;
    };

    var appendFriendlyIframeJs = function (jsLink, container, uniqId) {
        var adIFrame = _generateEmptyIframe(uniqId);
        var frameContent = "<!DOCTYPE html><html><head>" +
            "</head>" +
            "<body style='margin:0;'>" +
            _generateScriptTag(jsLink) +
            "</body></html>";

        container.appendChild(adIFrame);

        // The document domain needs to be set so cross-domain issues in IE 10 and below.
        try {
            adIFrame.contentWindow.contents = frameContent;
        } catch(e) {
            adIFrame.src = ("javascript-document.write('<script>document.domain=\"" + document.domain + "\"</script>')").replace(/\-/g, ':');
            adIFrame.contentWindow.contents = frameContent;
        }

        // quick fix for code check from lint. script URL is not a valid url in lint.
        adIFrame.src = 'javascript-window["contents"];'.replace(/\-/g, ':');
        return adIFrame;
    };

    var appendFriendlyIframeHtml = function(content, container, uniqId) {
        var adIFrame = _generateEmptyIframe(uniqId);
        container.appendChild(adIFrame);
        var frameContent = "<!DOCTYPE html><html><head>" +
            "</head>" +
            "<body style='margin:0;overflow:hidden;'>" +
            content +
            "</body></html>";
        var doc = adIFrame.contentWindow.document;
        doc.open();
        doc.write(frameContent);
        doc.close();
        return adIFrame;
    };

    return {
        appendStandardIframe: appendStandardIframe,
        appendFriendlyIframeJs: appendFriendlyIframeJs,
        appendFriendlyIframeHtml: appendFriendlyIframeHtml
    };
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-iframe-load-listener', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.IFrameLoadListener = factory();
    }
} (this, function () {

    var MAX_WAIT_TIME_WITHOUT_DOM_CHANGE = 200,
        DOM_CHECK_INTERVAL = 50,
        MAX_WAIT_TIME_WITHOUT_ANY_DOM_CHANGES = 400;

    return {
        addLoadCompleteListener: uberIframeLoadListener
    };

    function uberIframeLoadListener (iframe, callback) {
        var domLastModifiedTime = 0,
            timeSinceDomModified = 0,
            domHasChanged = false;

        attachIframeLoadEvent(iframe, function () {
            attachDomEventListener(iframe.contentWindow.document, function () {
                if (domLastModifiedTime === 0) {
                    domHasChanged = true;
                    var domChecker = setInterval(function () {
                        var now = new Date().getTime();
                        timeSinceDomModified = now - domLastModifiedTime;

                        if (timeSinceDomModified > MAX_WAIT_TIME_WITHOUT_DOM_CHANGE) {
                            clearInterval(domChecker);
                            callback();
                        }
                    }, DOM_CHECK_INTERVAL);
                }

                domLastModifiedTime = new Date().getTime();
            });

            // Make sure things are changing... if they haven't we must have a
            // fast loading iframe
            setTimeout(function () {
                if (!domHasChanged) {
                    callback();
                }
            }, MAX_WAIT_TIME_WITHOUT_ANY_DOM_CHANGES);
        });
    }

    function attachIframeLoadEvent (iframe, callback) {
        if (window.addEventListener) {
            iframe.addEventListener('load', callback, false);
        }
        else if (window.attachEvent) {
            iframe.attachEvent('onload', callback);
        }
        else {
            iframe.onload = callback;
        }
    }

    function attachDomEventListener (element, callback) {
        if (window.MutationObserver !== undefined) {
            // 'New' way to listen on Mutation events... IE don't like
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(callback);
            });
            observer.observe(element, {childList: true, subtree: true});
        } else {
            if (window.addEventListener) {
                element.addEventListener('DOMSubtreeModified', callback);
            }
            else if (window.attachEvent) {
                element.attachEvent('DOMSubtreeModified', callback);
            }
        }
    }

}));

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

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-doubleclick', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialDoubleClick = factory();
    }
}(this, function () {
    var AdvertorialDoubleClick = function () {};

    AdvertorialDoubleClick.generateAdLink = function (adSpot, type, random) {
        var notInU = ['sz', 'tile', 'dcopt', 'env', 'partner', '!c', 'network-id'],
            paramBlackList = ['areaprefix'],
            adHost = "//ad.au.doubleclick.net",
            adTypePrefixMap = {'iframe': '/adi/', 'image': '/ad/', 'jump': '/jump/', 'javascript': '/adj/'},
            adTypePrefix = adTypePrefixMap[type],
            propArray = [],
            uStrArray = [],
            params = adSpot.params,
            config = adSpot.config,
            kruxSegments = adSpot.getKruxSegments(),
            i = 0;

        params.sz = adSpot.getAdSize();

        if (params.partner) {
            params['!c'] = params.partner;
        }

        for (var index in params) {
            if (paramBlackList.indexOf(index) < 0) {
                var currentValue = params[index],
                    values = currentValue.indexOf("|") === -1 ? [currentValue] : currentValue.split("|");

                for (i = 0; i < values.length; i++) {
                    propArray.push(index + "=" + values[i]);
                    if (notInU.indexOf(index) < 0) {
                        uStrArray.push(index + "*" + values[i]);
                    }
                }
            }
        }

        for (i = 0; i < kruxSegments.length; i++) {
            propArray.push("segment=" + kruxSegments[i]);
        }

        var adLink = adTypePrefix + "|site|/|sect|" + optionalUrl("type", params) + optionalUrl("state", params) + optionalUrl("region", params) + ";" +
            propArray.sort().join(';') + ";u=" + uStrArray.sort().join('!') + ";ord=|ord|?";

        for (index in params) {
            if (params.hasOwnProperty(index)) {
                var value = params[index];
                adLink = adLink.replace(new RegExp("\\|" + index + "\\|", 'g'), value);
            }
        }

        if (config["increment-random"]) {
            random++;
        }

        var networkIdLink = optionalUrl("network-id", config).replace(/\|network-id\|/g, config['network-id']);
        return adHost + networkIdLink + adLink.replace(/\|ord\|/g, random).replace(/\|site\|/g, adSpot.config.site);
    };

    AdvertorialDoubleClick.supportsSingleRequest = function () {
        return false;
    };

    function optionalUrl(dataType, props) {
        return props[dataType] ? "/|" + dataType + "|" : "";
    }

    return AdvertorialDoubleClick;
}));

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

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-adspot-resizer', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialAdSpotResizer = factory();
    }
}(this, function () {

    var AdvertorialAdSpotResizer = function () {};

    AdvertorialAdSpotResizer.setToLargestSize = function (adSpotEl, adSpotSize, adEl) {
        var size = findMaxHeightAndWidth(adSpotSize);
        setSz(adSpotEl, size);
        setSz(adEl, size);
    };

    AdvertorialAdSpotResizer.setToNearestSize = function (adSpotEl, sz, adEl, width, height) {
        var sizes = sz.split(','),
            selectedSize = null;
        if (sizes.length === 1) {
            selectedSize = sz;
        } else {
            selectedSize = findSz(sz, width, height);
        }
        setSz(adSpotEl, selectedSize);
        setSz(adEl, selectedSize);
        return convertSingleSizeStringToArray(selectedSize);
    };

    AdvertorialAdSpotResizer.calculateMaxWidthOfElement = function (element) {
        var maxWidth = 0;
        for (var i = 0; i < element.children.length; i++) {
            var childElement = element.children.item(i);
            if (isElementVisible(childElement) && childElement.offsetWidth > maxWidth) {
                maxWidth = childElement.offsetWidth;
            }
        }
        return maxWidth;
    };

    var setSz = function (el, sz) {
        var size = sz.split('x');
        el.style.width = size[0] + "px";
        el.style.height = size[1] + "px";
    };

    var findMaxHeightAndWidth = function (szs) {
        var sizes = szs.split(','),
            maxWidth = 0, maxHeight = 0;
        for (var i = 0; i < sizes.length; i++) {
            var size = sizes[i].split('x');
            size[0] = parseInt(size[0], 10);
            size[1] = parseInt(size[1], 10);
            if (maxWidth < size[0]) {
                maxWidth = size[0];
            }
            if (maxHeight < size[1]) {
                maxHeight = size[1];
            }
        }
        return maxWidth + 'x' + maxHeight;
    };

    var findSz = function (szs, width, height) {
        var sizes = szs.split(','),
            ws = [],
            hs = [];
        for (var i = 0; i < sizes.length; i++) {
            var size = sizes[i].split('x');
            ws.push(+size[0]);
            hs.push(+size[1]);
        }
        var w = nearest(ws, width),
            h = nearest(hs, height);

        return w + "x" + h;
    };

    var nearest = function (array, value) {
        if (array.length === 1) {
            return array[0];
        }
        if (array.length === 2) {
            return Math.abs(array[0] - value) < Math.abs(array[1] - value) ? array[0] : array[1];
        }
        return nearest([nearest(array.slice(0, Math.ceil(array.length / 2)), value),
            nearest(array.slice(Math.ceil(array.length / 2), array.length), value)], value);
    };

    var convertSingleSizeStringToArray = function (sizeStr) {
        var sizeStrings = sizeStr.split('x');
        return [parseInt(sizeStrings[0], 10), parseInt(sizeStrings[1], 10)];
    };

    var isElementVisible = function (element) {
        return element.style.display !== 'none' &&
            element.style.visibility !== 'hidden' &&
            element.offsetWidth > 0 && element.offsetHeight > 0;
    };

    return AdvertorialAdSpotResizer;
}));



(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(
            'rui-advertorial-adspot',
            ['rui-advertorial-doubleclick', 'rui-advertorial-sas', 'rui-iframe-load-listener',
             'rui-advertorial-ad-provider', 'rui-advertorial-adspot-resizer', 'rui-debug-tools'],
            factory
        );
    } else {
        root.RUI = root.RUI || {};
        root.RUI.AdvertorialAdSpot = factory(
            root.RUI.AdvertorialDoubleClick, root.RUI.AdvertorialSas, root.RUI.IFrameLoadListener,
            root.RUI.AdvertorialAdProvider, root.RUI.AdvertorialAdSpotResizer, root.RUI.Debug
        );
    }
}(this, function (AdvertorialDoubleClick, AdvertorialSas, IFrameLoadListener, AdvertorialAdProvider, AdvertorialAdSpotResizer) {
    var AdvertorialAdSpot = function (element, advertorial) {
        var self = this;
        if (!element) {
            this.config = {};
            this.params = {};
            return;
        }
        this.element = element;
        if (this.element.className) {
            this.unhide();
        }
        this.config = getDataAttributes(element, 'config');
        this.params = getDataAttributes(element, 'param');
        this.convertParamsToLowerCase();
        this.sasOverrides = getDataAttributes(element, 'sas-override');
        this.previousWindowWidth = document.documentElement.clientWidth;
        this.adHidden = false;
        this.adRemoved = false;

        /*TODO This doesn't work very well */
        this.advertorial = advertorial;

        if (window.addEventListener && this.hasMobileSize()) {
            window.addEventListener('resize', function () {
                self.resizeAdIfRequired();
            });
        }
    };

    AdvertorialAdSpot.prototype.reset = function() {
        this.unhide();
        this.element.innerHTML = '';
    };

    AdvertorialAdSpot.prototype.unhide = function() {
        this.element.className = this.element.className.replace(/ rui-ad-hidden/, '');
    };

    AdvertorialAdSpot.mobileBreak = 500;

    AdvertorialAdSpot.prototype.getMobileBreak = function () {
        return parseInt(this.config['mobile-break'], 10) || AdvertorialAdSpot.mobileBreak;
    };

    AdvertorialAdSpot.prototype.getAdSize = function () {
        var desktopSize = this.config.sz,
            mobileSize = this.config['sz-mobile'] || desktopSize;
        return document.documentElement.clientWidth <= this.getMobileBreak() ? mobileSize : desktopSize;
    };

    AdvertorialAdSpot.prototype.hasMobileSize = function () {
        return !!this.config['sz-mobile'];
    };

    AdvertorialAdSpot.prototype.resizeAdIfRequired = function () {
        var currentWindowWidth = document.documentElement.clientWidth,
            mobileBreak = this.getMobileBreak();

        if (currentWindowWidth <= mobileBreak && this.previousWindowWidth > mobileBreak ||
            currentWindowWidth > mobileBreak && this.previousWindowWidth <= mobileBreak) {
            this.advertorial.loadAd(this);
        }
        this.previousWindowWidth = currentWindowWidth;
    };

    AdvertorialAdSpot.prototype.getLink = function (type) {
        return AdvertorialAdProvider.getCurrent().generateAdLink(this, type, this.getRandom());
    };

    AdvertorialAdSpot.prototype.getRandom = function () {
        return this.advertorial.getRandom();
    };

    AdvertorialAdSpot.prototype.getKruxSegments = function () {
        var value = getKruxItem('kxsegs') || '';
        return value.length > 0 ? value.split(",") : [];
    };

    AdvertorialAdSpot.prototype.getKruxUID = function () {
        var value = getKruxItem('kxuser') || '';
        return value;
    };

    function getKruxItem (key) {
        var match, value;
        if (window.localStorage) {
            value = window.localStorage[key] || "";
        } else if (navigator.cookieEnabled) {
            match = document.cookie.match(key + '=([^;]*)');
            value = (match && unescape(m[1])) || "";
        }

        return value;
    }

    AdvertorialAdSpot.prototype.getUniqueParams = function () {
        return {pos:this.params.pos};
    };

    AdvertorialAdSpot.prototype.getPageParams = function () {
        var pageParams = {};
        for (var i in this.params) {
            if (this.params.hasOwnProperty(i) && i !== 'pos') {
                pageParams[i] = this.params[i];
            }
        }
        return pageParams;
    };

    AdvertorialAdSpot.prototype.isAdLoaded = function () {
        return !(this.emptyAd || this.adHidden || this.adRemoved);
    };

    AdvertorialAdSpot.prototype.cleanup = function () {
        this.checkIfEmptyAd();
        this.removeIfRequired();
        this.hideIfRequired();
    };

    AdvertorialAdSpot.prototype.isNativeAd = function () {
        return this.config.type === 'native';
    };

    AdvertorialAdSpot.prototype.removeIfRequired = function () {
        if (String(this.config['auto-remove']) === 'true' && this.emptyAd) {
            this.element.parentNode.removeChild(this.element);
            this.adRemoved = true;
        }
    };

    AdvertorialAdSpot.prototype.hideIfRequired = function () {
        if (String(this.config['auto-hide']) === 'true' && this.emptyAd) {
            this.element.className = this.element.className + ' rui-ad-hidden';
            this.adHidden = true;
        }
    };

    AdvertorialAdSpot.prototype.checkIfEmptyAd = function () {
        if(this.isNativeAd()) {
            if(this.nativeType === 'json') {
                this.emptyAd = !this.nativeContent || Object.keys(this.nativeContent).length === 0;
            } else if(this.nativeType === 'html') {
                this.emptyAd = isEmptyImage(this.nativeContent);
            } else {
                this.emptyAd = true;
            }
        } else {
            for (var i = 0; i < this.element.children.length; i++) {
                var childElement = this.element.children.item(i);
                if (isEmptyImage(childElement.innerHTML) ||
                    (childElement.tagName === 'IFRAME' && iframeIsEmpty(childElement))) {
                    this.emptyAd = true;
                }
            }
        }
    };

    function iframeIsEmpty (iframe) {
        var iframeBody = iframe.contentWindow.document.body,
            iframeContents = iframeBody.innerHTML;
        return isEmptyImage(iframeContents) || iframeBody.children.length <= 1;
    }

    function isEmptyImage (elementContents) {
        return elementContents.indexOf('2x2_blank_pixel.gif') >= 0 ||
            elementContents.indexOf('17-grey.gif') >= 0 ||
            elementContents.indexOf('default.gif') >= 0; // This last one seems a little dangerous
    }

    function getDataAttributes(element, prefix) {
        var attributes = element.attributes,
            values = {},
            fullPrefix = 'data-' + prefix + '-';

        for (var i in attributes) {
            if (Object.prototype.hasOwnProperty.call(attributes, i)) {
                var attribute = attributes[i];
                if (attribute.name && attribute.name.indexOf(fullPrefix) === 0) {
                    values[attribute.name.replace(fullPrefix, '')] = attribute.value;
                }
            }
        }
        return values;
    }

    AdvertorialAdSpot.prototype.resizeContainerToFitAd = function (adIFrame) {
        var self = this;

        IFrameLoadListener.addLoadCompleteListener(adIFrame, function () {
            var adProperties = {};
            self.cleanup();
            adProperties.adLoaded = self.isAdLoaded();

            if (adProperties.adLoaded && iFrameContentPresent(adIFrame)) {
                adIFrame.contentWindow.document.body.style.height = 'auto';

                var body = adIFrame.contentWindow.document.body,
                frameWidth = body.offsetWidth,
                frameHeight = body.scrollHeight;

                if (self.config.type === 'javascript' || self.config.type === 'purejs') {
                    frameHeight = body.offsetHeight;
                    frameWidth = AdvertorialAdSpotResizer.calculateMaxWidthOfElement(body) || body.offsetWidth;
                }

                var selectedSize = AdvertorialAdSpotResizer.setToNearestSize(self.element, self.getAdSize(), adIFrame, frameWidth, frameHeight);
                adProperties.width = selectedSize[0];
                adProperties.height = selectedSize[1];
            }

            if (self.loadCompleteCallback) {
                self.loadCompleteCallback(adProperties, self.isAdLoaded());
            }
        });

        this.setToLargestSize(adIFrame);
    };

    AdvertorialAdSpot.prototype.setToLargestSize = function (el) {
        return AdvertorialAdSpotResizer.setToLargestSize(this.element, this.getAdSize(), el);
    };
    
    AdvertorialAdSpot.prototype.convertParamsToLowerCase = function () {
        if(this.params){
            var lowerCaseParams = {};
            for (var key in this.params) {
                lowerCaseParams[key] = (this.params[key])? this.params[key].toString().toLowerCase() : this.params[key];
            }
            this.params = lowerCaseParams;
        }
    };

    function iFrameContentPresent(adIFrame) {
        if (adIFrame.contentWindow && adIFrame.contentWindow.document && adIFrame.contentWindow.document.body) {
            return true;
        } else {
            RuiDebug.warn("rui-advertorial", "Ad iFrame document not loaded in time", adIFrame.contentWindow);
            return false;
        }
    }

    return AdvertorialAdSpot;

}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(
            'rui-advertorial',
            ['rui-advertorial-adspot', 'rui-advertorial-ad-provider', 'rui-advertorial-config',
             'rui-advertorial-postscribe', 'rui-template-renderer', 'rui-iframe-generator',
             'rui-advertorial-devtools', 'rui-debug-tools'],
            factory
        );
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Advertorial = factory(
            root.RUI.AdvertorialAdSpot, root.RUI.AdvertorialAdProvider, root.RUI.AdvertorialConfig,
            root.RUI.AdvertorialPostscribe, root.RUI.AdvertorialNativeRenderer, root.RUI.IFrameGenerator,
            root.RUI.AdvertorialDevTools, root.RUI.Debug
        );
    }
}(this, function (AdvertorialAdSpot, AdvertorialAdProvider, AdvertorialConfig,
      AdvertorialPostscribe, AdvertorialNativeRenderer, IframeGenerator,
      AdvertorialDevTools, RuiDebug) {

    var Advertorial = {};

    Advertorial.random = new Date().getTime();
    Advertorial.iFrameCounter = 1;
    Advertorial.singleRequestAds = [];
    Advertorial.allAds = [];
    Advertorial.Config = AdvertorialConfig;
    Advertorial.adsLoaded = false;


    Advertorial.createAd = function (config) {
        if ( !AdvertorialAdProvider.isDefault() ) {
            return;
        }

        var DEPRECATED_ARGS = [
            'config',
            'params',
            'container',
            'loadCompleteCallback',
            'nativeRenderCallback'
        ];
        var hasOptionsObject = (arguments.length === 1 && typeof config === 'object');
        var options          = {};

        if (hasOptionsObject) {
            options = config;
        }
        else {
            RuiDebug.warn("Advertorial", "Calling createAd() in this way is deprecated. See for documentation for details.");
            for (var i = 0; i < DEPRECATED_ARGS.length; i++) {
                options[ DEPRECATED_ARGS[i] ] = arguments[i];
            }
        }

        options.config.sz = convertSizeForAdProvider(options.config.sz);
        var adContainer   = createAdContainer(options.config.classes);
        var adSpot        = createAdSpot(adContainer, options);

        options.container.appendChild(adContainer);

        Advertorial.loadAd(adSpot);
    };

    /* Should be deprecated, or at least moved out of this module.
     * Creating SAS ads using the createAd method should replace this call. */
    /* jshint -W060 */
    Advertorial.createJSAd = function (config, params, sasOverrides) {

        var adSpot = new AdvertorialAdSpot();
        adSpot.config = config;
        adSpot.params = params;
        adSpot.convertParamsToLowerCase();
        adSpot.sasOverrides = sasOverrides;
        adSpot.advertorial = Advertorial;
        adSpot = AdvertorialDevTools.addDebuggingParams(adSpot);

        if (AdvertorialDevTools.isDisabled(adSpot)) {
            RuiDebug.log('Advertorial', 'AdSpot disabled by AdvertorialDevTools', adSpot);
            return;
        }

        Advertorial.allAds.push(adSpot);

        if (AdvertorialAdProvider.getCurrent().supportsSingleRequest() && adSpot.config.singlerequest) {
            adSpot.element = createSingleRequestContainer();
            Advertorial.singleRequestAds.push(adSpot);
            return;
        }

        document.write(Advertorial.generateScriptTag(adSpot.getLink('javascript')));
    };

    /* jshint +W060 */

    Advertorial.refreshView = function () {
        Advertorial.random = new Date().getTime();
    };


    Advertorial.loadAds = function (containerEl) {
        Advertorial.adsLoaded = true;
        var originalNumberOfSingleRequestAds = Advertorial.singleRequestAds.length;

        var container = document.querySelector(containerEl || 'body');

        if(container) {
            var ads = container.querySelectorAll('.ad');

            for (var i = 0; i < ads.length; i++) {
                this.loadAd(new AdvertorialAdSpot(ads[i], this));
            }

            if (originalNumberOfSingleRequestAds === 0 && Advertorial.singleRequestAds.length > 0) {
                AdvertorialAdProvider.getCurrent().loadSingleRequestAds(Advertorial.singleRequestAds, Advertorial.random);
            }
        } else {
            RuiDebug.warn('Advertorial', 'Container ' + containerEl + ' does not exist');
        }
    };

    Advertorial.loadAdForElement = function (el) {
        this.loadAd(new AdvertorialAdSpot(el, this));
    };

    Advertorial.loadAd = function (adSpot) {
        if (AdvertorialDevTools.isDisabled(adSpot)) {
            RuiDebug.log('Advertorial', 'AdSpot disabled by AdvertorialDevTools', adSpot);
            return;
        }
        adSpot.reset();
        adSpot = AdvertorialDevTools.addDebuggingParams(adSpot);

        Advertorial.allAds.push(adSpot);
        if (AdvertorialAdProvider.getCurrent().supportsSingleRequest() && adSpot.config.singlerequest) {
            Advertorial.singleRequestAds.push(adSpot);
        } else {
            if (AdvertorialConfig.loadAllAdsAsLazyJsAds) {
                this.generateLazyScript(adSpot);
            } else {
                this.generateAdContent(adSpot);
            }
        }
    };

    Advertorial.generateAdContent = function(adSpot) {
        switch (adSpot.config.type) {
            case 'image':
                this.generateImg(adSpot);
                break;
            case 'javascript':
                this.generateScript(adSpot);
                break;
            case 'lazyjs':
                this.generateLazyScript(adSpot);
                break;
            case 'native':
                this.generateNativeAd(adSpot);
                break;
            default:
                this.generateIFrame(adSpot);
                break;
        }
    };

    Advertorial.generateNativeAd = function (adSpot) {
        var ad = fetch(adSpot.getLink('native'));

        if(ad) {
            ad.then(function(response, reject) {
                if (response.ok === true) {
                    switch(response.headers.get('Content-Type')){
                        case 'application/json':
                            _handleAdJson(adSpot, response.json());
                            break;
                        case 'text/html; charset=UTF-8':
                            _handleAdHtml(adSpot, response.text());
                            break;
                        default:
                            return _rejectedPromise(
                                "Response type not expected: " +
                                    response.headers.get('Content-Type')
                            );
                    }
                } else {
                    return _rejectedPromise('Response code not 200');
                }
            })['catch'](function (err) {
                RuiDebug.error("Advertorial", "Native Ad failed to load", err);
            });
        }

        function _handleAdJson(adSpot, jsonPromise){
            jsonPromise.then(function(json) {
                adSpot.nativeType = 'json';
                adSpot.nativeContent = json;
                adSpot.cleanup();

                if (adSpot.nativeRenderCallback) {
                    if (typeof adSpot.nativeRenderCallback !== 'function') {
                        return _rejectedPromise('Custom native renderer callback is not a function');
                    } else {
                        adSpot.nativeRenderCallback(json, adSpot.element);
                    }
                } else {
                    AdvertorialNativeRenderer.render(json, adSpot.element, adSpot.loadCompleteCallback, adSpot.isAdLoaded());
                }
            })['catch'](function (err) {
                RuiDebug.error("Advertorial", "Native Ad failed to load", err);
            });
        }

        function _handleAdHtml(adSpot, htmlPromise){
            htmlPromise.then(function(html) {
                adSpot.nativeType = 'html';
                adSpot.nativeContent = html;

                var adIFrame = IframeGenerator.appendFriendlyIframeHtml(
                    html, adSpot.element, Advertorial.iFrameCounter);
                adSpot.setToLargestSize(adIFrame);
                adSpot.cleanup();
                Advertorial.iFrameCounter++;

                if(adSpot.loadCompleteCallback) {
                    adSpot.loadCompleteCallback(html, adSpot.isAdLoaded());
                }
            })['catch'](function (err) {
                RuiDebug.error("Advertorial", "Native Ad failed to load", err);
            });
        }

        function _rejectedPromise(message) {
            return new Promise(function(resolve, reject) {
                reject(new Error(message));
            });
        }
    };

    Advertorial.generateLazyScript = function (adSpot) {
        AdvertorialPostscribe.createLazyAd(adSpot.element, this.generateScriptTag(adSpot.getLink('javascript')));
    };

    Advertorial.generateIFrame = function (adSpot) {
        var adLink = adSpot.getLink('iframe'),
            adIFrame = IframeGenerator.appendStandardIframe(
                adLink, adSpot.element, Advertorial.iFrameCounter);
        adSpot.setToLargestSize(adIFrame);
        Advertorial.iFrameCounter++;
        if (adSpot.config.type === "javascript" || adSpot.config.type === "purejs") {
            adIFrame.style.height = 'auto';
        }
    };

    Advertorial.generateImg = function (adSpot) {
        var adLinkA = adSpot.getLink('jump'),
            adLinkImg = adSpot.getLink('image'),
            adA = document.createElement("a");
        adA.href = adLinkA;
        var adImg = document.createElement("img");
        adImg.src = adLinkImg;
        adA.appendChild(adImg);
        adSpot.element.appendChild(adA);
        adSpot.setToLargestSize(adImg);
    };

    Advertorial.generateScript = function (adSpot) {
        var adLink = adSpot.getLink('javascript'),
            adIFrame = IframeGenerator.appendFriendlyIframeJs(
                adLink, adSpot.element, Advertorial.iFrameCounter);
        adSpot.resizeContainerToFitAd(adIFrame);
        Advertorial.iFrameCounter++;
    };

    Advertorial.generateScriptTag = function (adLink) {
        return "<script type='text/javascript' src='" + adLink + "' ></script>";
    };

    Advertorial.getRandom = function () {
        return Advertorial.random;
    };

    Advertorial.setRandom = function (random) {
        Advertorial.random = random;
    };

    Advertorial.resetRandom = function () {
        Advertorial.random = new Date().getTime();
    };

    var createSingleRequestContainer = function () {
        var scriptTags = document.getElementsByTagName('script'),
            scriptTag = scriptTags[scriptTags.length - 1],
            adContainer = createAdContainer('rui-single-request-ad-container');

        scriptTag.parentNode.appendChild(adContainer);
        return adContainer;
    };

    var convertSizeForAdProvider = function(size) {
        if(typeof size === "string") {
            return size;
        }
        return convertSizeArrayToString(size);
    };

    // Converts sizes used by mobile ios ads (which are an array of arrays) into
    // a comma-separated string. eg [[100,200],[50,150]] => "100x200,50x150"
    var convertSizeArrayToString = function (sizes) {
        var szString = "";
        for (var i = 0; i < sizes.length; i++) {
            szString += ((typeof sizes[i] === "string") ? sizes[i] : sizes[i].join("x")) + ',';
        }
        return szString.substring(0, szString.length - 1);
    };

    var createAdSpot = function (adContainer, options) {
        var adSpot = new AdvertorialAdSpot(adContainer, Advertorial);
        adSpot.config = options.config;
        adSpot.params = options.params;
        adSpot.convertParamsToLowerCase();
        adSpot.loadCompleteCallback = options.loadCompleteCallback;
        adSpot.nativeRenderCallback = options.nativeRenderCallback;
        return adSpot;
    };

    var createAdContainer = function (cssClasses) {
        var container = document.createElement('div');
        if (cssClasses) {
            container.className = cssClasses;
        }
        return container;
    };

    return Advertorial;
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-advertorial-magik', ['jquery', 'rui-advertorial'], function ($, Advertorial) {
            return factory($);
        });
    } else {
        factory(root.jQuery, root.RUI.Advertorial);
    }
}(this, function ($, Advertorial) {
    $(function () {
        Advertorial.loadAds();
    });
}));