/* RUI: REA User Interface library - Browser Tools - v4.0.0
   Copyright 2016, REA Group */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-browser-utils', [], function () {
            return factory();
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.BrowserUtils = factory();
    }
} (this, function () {

    var BrowserUtils = {
        defineDeviceType: function(){
            if ((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
                    .test(navigator.userAgent.toLowerCase()))) {
                document.documentElement.className += " is-tablet";
            } else {
                document.documentElement.className += " is-desktop";
            }
        },

        getHistoryLength: function(){
            return window.history.length;
        },

        go: function(howFar){
            window.history.go(howFar);
        },

        getReferrer: function () {
            return document.referrer;
        },

        getHref: function () {
            return window.location.href;
        },

        getPathName: function () {
            return window.location.pathname;
        },

        getQueryString: function () {
            return window.location.search;
        },

        getQueryParams: function () {
            var keyValuePairs = this.getQueryString().substr(1).split('&'),
                params = {};

            if (keyValuePairs.length > 0) {
                for (var i = 0; i < keyValuePairs.length; i++) {
                    var keyVal = keyValuePairs[i].split('=');
                    if (keyVal.length === 2) {
                        params[keyVal[0]] = decodeURIComponent(keyVal[1].replace(/\+/g, ' '));
                    }
                }
            }
            return params;
        },

        lastNavigatedREAURL: function(){
            if(isPreviousReferrerFromREA()){
                return this.getReferrer();
            }else{
                return false;
            }
        },

        redirect: function (url) {
            window.location = url;
        }
    };
    function isPreviousReferrerFromREA(){
        return (BrowserUtils.getReferrer().indexOf('realestate.com.au') != -1 &&
                BrowserUtils.getHistoryLength() > 1);
    }
    return BrowserUtils;

}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-cookies',['jquery'], function ($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Cookies = factory(root.jQuery);
    }
}(this, function ($) {
    var C = {
        /**
         * creates a new cookie with the given name and value, and optional expiration
         * @method create
         * @static
         * @param {String} name
         * @param {String} value
         * @param {Number} days
         * @param {String} domain
         */
        create: function( name, value, days, domain ) {
            var cookie, date;

            cookie = name + "=" + value;
            if( days ) {
                date = new Date();
                date.setTime( date.getTime()+( days*24*60*60*1000 ) );
                cookie += "; expires=" + date.toGMTString();
            }

            if( domain ) {
                cookie += "; domain=" + domain;
            }

            cookie += "; path=/";
            document.cookie = cookie;
        },

        /**
         * return the value of the cookie with the given name
         * @method get
         * @static
         * @param {String} name
         * @return String
         */
        get: function( name ) {
            var i, len, c,
                nameEq = name + "=",
                ca = document.cookie.split( ';' );

            // cannot use LMI.Lang.forEach here because of the return
            for( i = 0, len = ca.length; i < len; ++i ) {
                c = ca[i];
                while( c.charAt( 0 ) === ' ' ) {
                    c = c.substring( 1, c.length );
                }
                if( c.indexOf( nameEq ) === 0 ) {
                    return c.substring( nameEq.length, c.length );
                }
            }
            return null;
        },

        /**
         * removes the cookie with the given name
         * @method remove
         * @static
         * @param {String} name
         */
        remove: function( name, domain ) {
            C.create( name, "", -1, domain);
        },

        exists: function(){
            // Quick test if browser has cookieEnabled host property
            if (navigator.cookieEnabled) {
                return true;
            }
            // Create cookie
            document.cookie = "cookietest=1";
            var ret = document.cookie.indexOf("cookietest=") !== -1;
            // Delete cookie
            document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
            return ret;
        }
    };
    return C;
}));

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-debug-tools',[], factory);
    } else {
        root.RUI = root.RUI || {};
        root.RUI.Debug = factory();
    }
}(this, function () {

    'use strict';

    var logMessages = [];

    var Debug = {
        enabled: window.location.search.indexOf('rui-debug') > -1,

        log: function (moduleName, message, object) {
            recordLogEntry('DEBUG', moduleName, message, object);
        },

        warn: function (moduleName, message, object) {
            recordLogEntry('WARN', moduleName, message, object);
        },

        error: function (moduleName, message, object) {
            recordLogEntry('ERROR', moduleName, message, object);
        },

        getLog: function () {
            return logMessages;
        },

        printLog: function () {
            if (!this.enabled) {
                return;
            }
            for (var i = 0; i < logMessages.length; i++) {
                var logMethod = logMessages[i].level.toLowerCase();
                if (logMessages[i].object) {
                    console[logMethod](formatMessage(logMessages[i]), logMessages[i].object);
                } else {
                    console[logMethod](formatMessage(logMessages[i]));
                }
            }
        },

        clearLog: function () {
            logMessages = [];
        }
    };

    var recordLogEntry = function (level, moduleName, message, object) {
        if (!Debug.enabled) {
            return;
        }
        logMessages.push({
            timestamp: new Date(),
            level: level,
            moduleName: moduleName,
            message: message,
            object: object
        });
    };

    var formatMessage = function (logEntry) {
        return '[{{timestamp}}] - {{level}} - {{moduleName}}: {{message}}'
            .replace(/{{timestamp}}/, formatTime(logEntry.timestamp))
            .replace(/{{level}}/, logEntry.level)
            .replace(/{{moduleName}}/, logEntry.moduleName)
            .replace(/{{message}}/, logEntry.message);
    };

    var formatTime = function (date) {
        return makeItTwoDigits(date.getHours()) + ':' + makeItTwoDigits(date.getMinutes()) + ':' +
               makeItTwoDigits(date.getSeconds()) + '.' + date.getMilliseconds();
    };

    var makeItTwoDigits = function (number) {
        return number < 10 ? '0' + number : number;
    };

    return Debug;

}));

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-localstorage', ['jquery'], function($) {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.LocalStorage = factory(root.jQuery);
    }
}(this, function($) {
    var LS = {
        /**
         * Sets a new value in local storage for a given key
         * @method setItem
         * @static
         * @param {String} key
         * @param {String} value
         */
        setItem: function(key, value) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {}
        },

        /**
         * return the value of the local storage with the given key
         * @method getItem
         * @static
         * @param {String} key
         * @return String
         */
        getItem: function(key) {
            try {
                return localStorage.getItem(key);
            } catch (e) {}
        },

        /**
         * removes the local storage with the given key
         * @method removeItem
         * @static
         * @param {String} key
         */
        removeItem: function(key) {
            try {
                return localStorage.removeItem(key);
            } catch (e) {}
        },
        /**
         * Check if an item available in the local storage for a given key
         * @method checkItem
         * @static
         * @param {String} key
         */

        checkItem: function(key) {
            try {
                var isFound = false;
                if (key in localStorage) {
                    isFound = true;
                }
                return isFound;
            } catch (e) {}
        },
        /* Given the obj = {name: "foo", email: "s@s.com"},
         * and the key = "foo"
         *
         * E.g. localStorage.setItemFromObject(key, obj)
         
         * => sets the localStorage for "foo" key to "{\"name\": \"foo\", \"email\": \"s@s.com\" }"
         *
         */
        setItemFromObject: function(key, data) {
            if (!this.getItem(key)) {
                this.setItem(key, "{}");
            }

            var value = JSON.parse(this.getItem(key)) || {};
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    value[i] = data[i];
                }
            }
            this.setItem(key, JSON.stringify(value));
        },
        /* Given the value => "{\"name\": \"foo\"}"
         *   and the key = "foo"
         *
         * E.g. localStorage.getPropertyFromItem("name")
         * => "foo"
         *
         */
        getPropertyFromItem: function(key, property) {
            var returnValue = "",
                value = this.getItem(key);

            //We need this check for android 2.3 
            if (value) {
                value = JSON.parse(value) || {};
                returnValue = value[property];
            }
            return returnValue;
        }
    };
    return LS;
}));
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('rui-sessionstorage', function() {
            return factory($);
        });
    } else {
        root.RUI = root.RUI || {};
        root.RUI.SessionStorage = factory();
    }
}(this, function($) {
    var SessionStorage = {
        /**
         * Sets a new value in session storage for a given key
         * @method setItem
         * @static
         * @param {String} key
         * @param {String} value
         */
        setItem: function(key, value) {
            try {
                sessionStorage.setItem(key, value);
            } catch (e) {}
        },

        /**
         * return the value of the session storage with the given key
         * @method getItem
         * @static
         * @param {String} key
         * @return String
         */
        getItem: function(key) {
            try {
                return sessionStorage.getItem(key);
            } catch (e) {}
        },

        /**
         * removes the session storage with the given key
         * @method removeItem
         * @static
         * @param {String} key
         */
        removeItem: function(key) {
            try {
                return sessionStorage.removeItem(key);
            } catch (e) {}
        },
        /**
         * Check if an item available in the session storage for a given key
         * @method checkItem
         * @static
         * @param {String} key
         */

        checkItem: function(key) {
            try {
                var isFound = false;
                if (key in sessionStorage) {
                    isFound = true;
                }
                return isFound;
            } catch (e) {}
        },

        /* Given the obj = {name: "foo", email: "s@s.com"},
         * and the key = "foo"
         *
         * E.g. localStorage.setItemFromObject(key, obj)

         * => sets the localStorage for "foo" key to "{\"name\": \"foo\", \"email\": \"s@s.com\" }"
         *
         */
        setItemFromObject: function(key, data) {
            if (!this.getItem(key)) {
                this.setItem(key, "{}");
            }

            var value = JSON.parse(this.getItem(key)) || {};
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    value[i] = data[i];
                }
            }
            this.setItem(key, JSON.stringify(value));
        },
        /* Given the value => "{\"name\": \"foo\"}"
         *   and the key = "foo"
         *
         * E.g. localStorage.getPropertyFromItem("name")
         * => "foo"
         *
         */
        getPropertyFromItem: function(key, property) {
            var returnValue = "",
                value = this.getItem(key);

            //We need this check for android 2.3
            if (value) {
                value = JSON.parse(value) || {};
                returnValue = value[property];
            }
            return returnValue;
        }
    };
    return SessionStorage;
}));

/* RUI: REA User Interface library - Core - v6.1.0
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

(function (jQuery) {
    if (window.XDomainRequest && !jQuery.support.cors) {
        jQuery.ajaxTransport(function (s) {
            if (s.crossDomain && s.async) {
                if (s.timeout) {
                    s.xdrTimeout = s.timeout;
                    delete s.timeout;
                }
                var xdr;
                return {
                    send: function (_, complete) {
                        function callback(status, statusText, responses, responseHeaders) {
                            xdr.onload = xdr.onerror = xdr.ontimeout = xdr.onprogress = jQuery.noop;
                            xdr = undefined;
                            jQuery.event.trigger("ajaxStop");
                            complete(status, statusText, responses, responseHeaders);
                        }

                        xdr = new window.XDomainRequest();
                        xdr.onload = function () {
                            var status = 200;
                            var message = xdr.responseText;
                            try {
                                var r = JSON.parse(xdr.responseText);
                                if (r.StatusCode && r.Message) {
                                    status = r.StatusCode;
                                    message = r.Message;
                                }
                            } catch (error) {
                                if (error.name !== 'SyntaxError') {
                                    throw error;
                                }
                            }
                            callback(status, message, { text: message }, "Content-Type: " + xdr.contentType);
                        };
                        xdr.onerror = function () {
                            callback(500, "Unable to Process Data");
                        };
                        xdr.onprogress = function () {};
                        if (s.xdrTimeout) {
                            xdr.ontimeout = function () {
                                callback(0, "timeout");
                            };
                            xdr.timeout = s.xdrTimeout;
                        }
                        xdr.open(s.type, s.url);
                        xdr.send(( s.hasContent && s.data ) || null);
                    },
                    abort: function () {
                        if (xdr) {
                            xdr.onerror = jQuery.noop();
                            xdr.abort();
                        }
                    }
                };
            }
        });
    }
})(jQuery);
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