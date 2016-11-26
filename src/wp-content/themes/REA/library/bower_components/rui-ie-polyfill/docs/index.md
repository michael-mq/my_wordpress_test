---
title: Polyfills
module: rui-ie-polyfill
categories: Components
---
A selection of polyfills to ensure that most RUI functionality will continue to work in legacy IE browsers (IE9 and under)

## rui-ie-polyfill-all.js consists of three polyfills:

### rui-cors-for-ie.js
* Makes CORS request through jQuery possible in IE 8 & 9 
* Required for [rui-auto-complete](https://git.realestate.com.au/rui/rui-auto-complete)
* If you're using CORS but not via jQuery's ajax methods (eg. Angular) or want to patch CORS on a more native level, check out [xhr-xdr-adapter](https://github.com/intuit/xhr-xdr-adapter)

### rui-array-index-of-for-ie.js
* Patches `Array.indexOf` for IE8. 
* Required for [rui-advertorial](https://git.realestate.com.au/rui/rui-advertorial)

### rui-object-keys-for-ie.js
* Patches `Object.keys` for IE8.
* Required for [rui-advertorial](https://git.realestate.com.au/rui/rui-advertorial)

## When do I need these polyfill?
If you're supporting IE9 or older and are using either [rui-advertorial](https://git.realestate.com.au/rui/rui-advertorial) or [rui-auto-complete](https://git.realestate.com.au/rui/rui-auto-complete) in your app, you'll need to include these polyfills.

## Usage
Embedd the polyfill within a IE conditional tag:

``` html
  <!--[if lte IE 9]>
  <script src="js/rui-ie-polyfill-all.min.js"></script>
  <![endif]-->
```
**Note:** When embedding `rui-cors-for-ie` or `rui-ie-polyfill-all`, put the snippet AFTER your embed tag.

`rui-ie-polyfill` is currently bundled into `rui-all.js` (but that may change in the future). This means if you're embedding `rui-all.js` in your app, the polyfills will come for free and does not require embedding separately.

