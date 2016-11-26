/* RUI: REA User Interface library - Header Footer - v1.4.7
   Copyright 2016, REA Group */

/**
 * This code has been adapted from Google's solution for creating
 * fast responding buttons when dealing with browsers on touch devices:
 * https://developers.google.com/mobile/articles/fast_buttons
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-touch-button',['rui-click-buster'], function (ClickBuster) {
            return factory(ClickBuster);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.TouchButton = factory(root.RUI.ClickBuster);
    }
}(this, function (ClickBuster) {

    var TouchButton = function (element, handler) {
        this.element = element;
        this.handler = handler;

        element.addEventListener('touchstart', this, false);
        element.addEventListener('click', this, false);
    };

    TouchButton.prototype = {
        'handleEvent': function (event) {
            switch (event.type) {
                case 'touchstart':
                    this.onTouchStart(event);
                    break;
                case 'touchmove':
                    this.onTouchMove(event);
                    break;
                case 'touchend':
                    this.onClick(event);
                    break;
                case 'click':
                    this.onClick(event);
                    break;
            }
        },

        'onTouchStart': function (event) {
            event.stopPropagation();

            this.element.addEventListener('touchend', this, false);
            document.body.addEventListener('touchmove', this, false);

            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
        },

        'onTouchMove': function (event) {
            if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
                Math.abs(event.touches[0].clientY - this.startY) > 10) {
                this.reset();
            }
        },

        'onClick': function (event) {
            event.stopPropagation();
            this.reset();
            this.handler(event);

            if (event.type === 'touchend') {
                ClickBuster.preventGhostClick(this.startX, this.startY);
            }
        },

        'reset': function () {
            this.element.removeEventListener('touchend', this, false);
            document.body.removeEventListener('touchmove', this, false);
        }
    };

    return TouchButton;

}));

