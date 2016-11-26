/* RUI: REA User Interface library - IE-polyfill Component - v2.0.3
   Copyright 2016, REA Group */

(function () {
    Object.keys = Object.keys || function (o, k, r) {
        r = [];
        for (k in o) {
            if (r.hasOwnProperty.call(o, k)) {
                r.push(k);
            }
        }
        return r;
    };
})();