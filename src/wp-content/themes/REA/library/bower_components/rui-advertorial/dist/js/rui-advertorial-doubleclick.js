/* RUI: REA User Interface library - Advertorial - v2.7.4
   Copyright 2016, REA Group */

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
