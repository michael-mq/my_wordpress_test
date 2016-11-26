/* RUI: REA User Interface library - Header Footer - v1.4.7
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-side-panel', ['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.SidePanel = factory(root.jQuery);
    }
}(this, function ($) {
    var SidePanel = function(){};

    SidePanel.prototype.init = function(contentEl, direction, containerEl){
        this._$containerEl = $(containerEl || 'body');
        this._$el = $('<div class="rui-side-panel">' +
                        '<div class="rui-side-panel__overlay"></div>' +
                        '<div class="rui-side-panel__cont">' +
                            '<div class="rui-side-panel__content"></div>' +
                            '<div class="rui-side-panel__close rui-icon rui-icon-cross" aria-role="button" aria-label="Close"></div>' +
                        '</div>' +
                    '</div>');
        this._$el.find('.rui-side-panel__content').append($(contentEl));
        var clickEvent =  ('ontouchstart' in window) ? 'touchend' : 'click';
        this._$el.on(clickEvent,'.rui-side-panel__overlay,.rui-side-panel__close',$.proxy(this.close,this));

        if(direction=='right'){
            this._$el.addClass('is-right');
        }
        this._$containerEl.append(this._$el.hide());
    };

    SidePanel.prototype.open = function(){
        this._$el.show().offset(); //grab offsetHeight to force reflow before animation.
        this._$el.addClass('is-open');
        $(this).trigger('opened');
    };

    SidePanel.prototype.close = function(){
        var $content = this._$el.find('.rui-side-panel__cont');
        $content.one("transitionend", $.proxy(this._closeComplete, this));
        this._$el.removeClass('is-open');
        $(this).trigger('closed');
    };

    SidePanel.prototype._closeComplete = function(){
        this._$el.hide();
    };

    SidePanel.prototype.destroy = function(){
        if(this._$el){
            this._$el.remove();
        }
    };

    SidePanel.prototype.getView = function(){
        return this._$el;
    };

    SidePanel.create = function(){
        var panel = new SidePanel();
        panel.init.apply(panel,arguments);
        return panel;
    };
    
    return SidePanel;
}));
