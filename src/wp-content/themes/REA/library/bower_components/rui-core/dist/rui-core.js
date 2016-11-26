/* RUI: REA User Interface library - Core - v6.5.0
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-toggle',['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Toggle = factory(root.jQuery);
    }
}(this, function ($) {

    var Toggle = {};

    Toggle.bindEvents = function () {
        $('body').on('click', '.rui-toggle-link', function (e) {
            e.preventDefault();

            if ($(this).hasClass('rui-toggle-open')) {
                $('.rui-toggle-container').hide();
                $(this).removeClass('rui-toggle-open');
            }
            else {
                $('.rui-toggle-open').removeClass('rui-toggle-open');
                $('.rui-toggle-container').hide();
                $(this).addClass('rui-toggle-open');

                var containerStr = $(this).attr('data-container');

                if (containerStr) {
                    $('#' + containerStr).show();
                }
                else {
                    $(this).closest('.rui-toggle-wrapper').find('.rui-toggle-container').show();
                }
            }

        });

        $('body').on('click', function (e) {
            var $openToggle = $('.rui-toggle-open');

            if ($openToggle.length > 0 && !Toggle.clickedOnToggle(e.target)) {
                e.preventDefault();
                $openToggle.removeClass('rui-toggle-open');
                $('.rui-toggle-container').hide();
            }
        });

    };

    Toggle.clickedOnToggle = function (target) {
        return Toggle.clickedOnLink(target) || Toggle.clickedOnContainter(target);
    };

    Toggle.clickedOnLink = function (target) {
        return $(target).hasClass('rui-toggle-link') || $(target).closest('.rui-toggle-link').length > 0;
    };

    Toggle.clickedOnContainter = function (target) {
        return $(target).closest('.rui-toggle-container').length > 0;
    };

    $(document).ready(function () {
        Toggle.bindEvents();
    });
    return Toggle;

}));



(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-social',['jquery'], function($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Social = factory(root.jQuery);
    }
}(this, function($) {
    var Social = function() {
        this.list = $('.rui-social');
    };

    initURLTemplate();

    function initURLTemplate() {
        Social.FACEBOOK_TEMPLATE = 'http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url}}&p[title]={{title}}&p[summary]={{summary}}';
        Social.TWITTER_TEMPLATE = 'https://twitter.com/intent/tweet?url={{url}}&text={{title}}&via=realestate_au';
        Social.PINTEREST_TEMPLATE = 'http://pinterest.com/pin/create/button/?url={{url}}&media={{media}}&description={{summary}}';
        Social.GOOGLEPLUS_TEMPLATE = 'https://plus.google.com/share?url={{url}}';
        Social.LINKEDIN_TEMPLATE = 'https://www.linkedin.com/shareArticle?mini=true&url={{url}}&summary={{summary}}&title={{title}}';


        Social.FACEBOOK_API = 'http://graph.facebook.com/{{url}}';
        Social.TWITTER_API = 'http://urls.api.twitter.com/1/urls/count.json?url={{url}}';
        Social.PINTEREST_API = 'http://api.pinterest.com/v1/urls/count.json?url={{url}}';
        Social.LINKEDIN_API = 'http://www.linkedin.com/countserv/count/share?url={{url}}';

        Social.FACEBOOK_SHARE_COUNT_FIELD = 'shares';
        Social.TWITTER_SHARE_COUNT_FIELD = 'count';
        Social.PINTEREST_SHARE_COUNT_FIELD = 'count';
        Social.LINKEDIN_SHARE_COUNT_FIELD = 'count';
    }

    Social.prototype.generateLink = function (button) {
        var $shareButton = $(button);
        var serviceType = $shareButton.data('service');
        var template = Social[serviceType.toUpperCase() + '_TEMPLATE'];
        if (!template) {
            return;
        }
        var url     = encodeURIComponent($shareButton.data('url') || this.getHref() || '');
        var media   = encodeURIComponent($shareButton.data('media') || '');
        var title   = encodeURIComponent($shareButton.data('title') || document.title || '');
        var summary = encodeURIComponent($shareButton.data('description') || $('meta[name="description"]').attr('content') || '');

        var link = template.replace(/{{url}}/g, url).replace(/{{title}}/g, title).replace(/{{summary}}/g, summary).replace(/{{media}}/g, media);

        if (serviceType === 'facebook' && $shareButton.attr('data-images')) {
            var images = $shareButton.attr('data-images').split(',');
            $.each(images, function(index, image) {
                link += '&p[images][' + index + ']=' + $.trim(encodeURIComponent(image));
            });
        }

        return {
            url: link,
            title: serviceType
        };
    };

    Social.prototype.getCounter = function() {
        var me = this;
        this.list.each(function() {
            var shareIcon = $(this).find('[data-service]');
            var showCounter = shareIcon.data('showCounter');
            if(!showCounter) {
                return;
            }
            var serviceType = shareIcon.data('service');
            if(serviceType !== 'googleplus') {
                var url = Social[serviceType.toUpperCase()+ '_API'].replace(/{{url}}/g, encodeURIComponent(shareIcon.data('url') || me.getHref()));
                var field = Social[serviceType.toUpperCase()+ '_SHARE_COUNT_FIELD'];
                generateShareCounts(url, $(this), field);
            } else {
                $(this).append('<span class="rui-share-counter">0</span>');
            }
        });
    };

    function generateShareCounts(url, element, fieldName) {
        $.ajax({url: url, dataType: 'jsonp'}).success(function(data) {
            var shareCount = data[fieldName] || 0;
            element.append('<span class="rui-share-counter">' + shareCount + '</span>');
        });
    }

    function windowPopup(url, title) {
        window.open(url, title, 'height=260,width=570,left=100,top=100,resizable=no,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no');
    }

    Social.prototype.getHref = function () {
        return window.location.href;
    };

    Social.prototype.bindEvents = function () {
        var me = this;
        $('body').on('click', '.rui-social > .rui-icon', function () {
            var socialServiceLink = me.generateLink(this);
            windowPopup(socialServiceLink.url, socialServiceLink.title);
        });
    };

    $(function() {
        var social = new Social();
        social.bindEvents();
        social.getCounter();
    });

    return Social;
}));

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

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-social-list-factory',['jquery','rui-social-list'], function ($, SocialList) {
            return factory($, SocialList);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.SocialListFactory = factory(root.jQuery, root.RUI.SocialList);
    }
}(this, function ($, SocialList) {
    var socialList,
        selector = ".rui-social-list";

    function socialListFactory()  {
        socialList = [];
        $(selector).each(function(){
            socialList.push(new SocialList($(this)));
        });
    }

    $(function() {
        if ($(this).data('auto-init') !== false) {
            socialListFactory();
        }
    });

    return socialListFactory;
}));


/**
 * This module will create a User based off the sites lmdstok cookie, which is the token DS users to store the Users ID
 */
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-cid', ['rui-localstorage'], function(LocalStorage) {
            return factory(LocalStorage);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Cid = factory(root.RUI.LocalStorage);
    }
}(this, function(LocalStorage) {

    var cid = {

        getCid: function() {
            return LocalStorage.getItem('reacid');
        },
        setCid: function(cid) {
            LocalStorage.setItem('reacid', cid);
        }

    };

    return cid;

}));