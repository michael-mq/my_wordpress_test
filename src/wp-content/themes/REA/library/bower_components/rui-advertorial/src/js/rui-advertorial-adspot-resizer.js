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


