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