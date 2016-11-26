/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

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
