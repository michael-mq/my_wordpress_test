/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

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
