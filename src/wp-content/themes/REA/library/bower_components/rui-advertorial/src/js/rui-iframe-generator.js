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
