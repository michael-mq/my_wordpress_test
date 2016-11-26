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
