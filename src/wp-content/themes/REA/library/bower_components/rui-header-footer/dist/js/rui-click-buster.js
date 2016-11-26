/* RUI: REA User Interface library - Header Footer - v1.4.7
   Copyright 2016, REA Group */

/**
 * This code has been adapted from Google's solution for capturing
 * extra clicks that occur when dealing with browsers on touch
 * devices: https://developers.google.com/mobile/articles/fast_buttons
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-click-buster',[], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.ClickBuster = factory();
    }
}(this, function () {

    var ClickBuster = {
        'coordinates': [],

        'preventGhostClick': function (x, y) {
            ClickBuster.coordinates.push(x, y);
            window.setTimeout(ClickBuster.pop, 2500);
        },

        'pop': function () {
            ClickBuster.coordinates.splice(0, 2);
        },

        'onClick': function (event) {
            for (var i = 0; i < ClickBuster.coordinates.length; i += 2) {
                var x = ClickBuster.coordinates[i];
                var y = ClickBuster.coordinates[i + 1];
                if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
        },

        'init': function () {
            document.addEventListener('click', ClickBuster.onClick, true);
        }
    };

    return ClickBuster;
}));

