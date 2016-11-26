/* RUI: REA User Interface library - Browser Tools - v4.0.0
   Copyright 2016, REA Group */

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
