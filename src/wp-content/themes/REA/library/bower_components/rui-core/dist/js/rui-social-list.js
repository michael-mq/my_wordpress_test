/* RUI: REA User Interface library - Core - v6.5.0
   Copyright 2016, REA Group */

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-social-list',['jquery'], function($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.SocialList = factory(root.jQuery);
    }
}(this, function($) {
    var SocialList = function($el){
        this.$el = $el;
        this.bindEvents();
    };

    SocialList.prototype = {
        hideList: function(e){
            var $socialContainerToggle = $(e.target).closest(this.$el);
            if($socialContainerToggle.length === 0){
                this.$el.removeClass("is-visible");
                $('body').off('click',this.hideList);
            }
        },
        bindEvents: function(){
            var that = this;
            this.$el.on('click',".rui-social-title",function(e){
                var currentEl = this;
                setTimeout(function(){
                    //Firefox IE doesnt expand to the width of the social container.
                    that.$el.width(that.$el.find('.rui-social').width());

                    $(currentEl).closest(that.$el).toggleClass("is-visible");
                    if($(currentEl).closest(that.$el).hasClass("is-visible")){
                        $('body').on('click', $.proxy(that.hideList,that));
                    }else{
                        $('body').off('click',that.hideList);
                    }
                },1);
            });
        }
    };

    return SocialList;
}));
