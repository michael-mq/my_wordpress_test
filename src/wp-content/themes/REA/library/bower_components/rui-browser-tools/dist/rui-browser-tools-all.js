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
