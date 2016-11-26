/* RUI: REA User Interface library - IE-polyfill Component - v2.0.3
   Copyright 2016, REA Group */

(function () {
    if (!window.Array.prototype.indexOf) {
        window.Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        };
    }
})();
