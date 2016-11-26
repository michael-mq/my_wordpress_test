---
title: Browser Utils
module: rui-browser-tools
categories: Browser Utilities
---

#API:
Access via <code>RUI.BrowserUtils</code> or if using require <code>'rui-browser-utils'</code>

```javascript
defineDeviceType
//calling this method will add either is-tablet || is-desktop as a class to the html element

getHistoryLength
// Return's the length of how many pages are in the users current browsers session. (not really that useful)

go(number|URL)
// Required. The parameter can either be a number which goes to the URL within the specific position (-1 goes back one page, 1 goes forward one page), or a string. The string must be a partial or full URL, and the function will go to the first URL that matches the string.

getReferrer
// Return's the previous page that the user came from.

getHref
// Return's the entire URL.

getPathName
// Return's the path portion of the URL

getQueryString
// Return's the query portion of the URL

getQueryParams
// Returns a object of key values, with the current query parameters

lastNavigatedREAURL
// A method intended to replace the concept of a continueURL in a single page application. You can use this method to return the last URL the user came from only if they came from an REA page, otherwise it will return false. A Use case for this example would be to store the URL within your single page application so that once they have finished doing what ever it is you can then redirect them back to where they came from i.e 'saving a search'

redirect(url)
// Takes a string a redirects you to the location of that string.
```