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
