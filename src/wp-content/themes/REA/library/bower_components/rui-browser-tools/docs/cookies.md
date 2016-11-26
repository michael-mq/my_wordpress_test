---
title: Cookies
module: rui-browser-tools
categories: Browser Utilities
---

This module gives you wrapper methods for working with cookies.

Access via <code>RUI.Cookies</code> or if using require <code>'rui-cookies'</code>

#API
```javascript
create ( name, value, days, domain )
/**
 * creates a new cookie with the given name and value, and optional expiration
 * @method create
 * @static
 * @param {String} name
 * @param {String} value
 * @param {Number} days
 * @param {String} domain
 */

get ( name )
/**
 * return the value of the cookie with the given name
 * @method get
 * @static
 * @param {String} name
 * @return String
 */

remove ( name, domain )
/**
 * removes the cookie with the given name
 * @method remove
 * @static
 * @param {String} name
 */

exists ()
//Test the browsers ability to create cookies

```