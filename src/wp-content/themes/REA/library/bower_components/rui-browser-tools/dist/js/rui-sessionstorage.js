/* RUI: REA User Interface library - Browser Tools - v4.0.0
   Copyright 2016, REA Group */

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
