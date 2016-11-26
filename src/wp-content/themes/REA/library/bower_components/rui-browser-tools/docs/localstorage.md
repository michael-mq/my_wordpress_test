---
title: Local Storage
module: rui-browser-tools
categories: Browser Utilities
---

This module gives you wrapper methods for working with localstorage. It's mostly for failing silently for browsers in
incognito mode.

Access via <code>RUI.LocalStorage</code> or if using require <code>'rui-localstorage'</code>

#API
```javascript

 setItem: (key, value)
/*
 * Sets a new value in local storage for a given key
 * @method setItem
 * @static
 * @param {String} key
 * @param {String} value
*/

getItem (key)
/**
 * return the value of the local storage with the given key
 * @method getItem
 * @static
 * @param {String} key
 * @return String
 */

removeItem (key)
/**
 * removes the local storage with the given key
 * @method removeItem
 * @static
 * @param {String} key
 */

checkItem (key)
/**
 * Check if an item available in the local storage for a given key
 * @method checkItem
 * @static
 * @param {String} key
 */

setItemFromObject (key, data)
/* Given the obj = {name: "foo", email: "s@s.com"},
 * and the key = "foo"
 *
 * E.g. localStorage.setItemFromObject(key, obj)

 * => sets the localStorage for "foo" key to "{\"name\": \"foo\", \"email\": \"s@s.com\" }"
 *
 */

getPropertyFromItem (key, property)
/* Given the value => "{\"name\": \"foo\"}"
 *   and the key = "foo"
 *
 * E.g. localStorage.getPropertyFromItem("name")
 * => "foo"
 *
 */

```