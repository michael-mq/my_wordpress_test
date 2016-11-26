---
title: Scroll to elements
module: rui-core
categories: Components
---

#Scroll To Element
###What! How hard can that be...

Well due to the header being fixed to the top of the page, doing a simple jump to wont work, as you'll want to offset the
height of the header from the position of the element you are scrolling. It gets even more complex if you want a nice animation
for it. The header has 2 heights it ca be in full expanded and contracted, thus you'll need to shrink the header first then scroll the page
to the element you want.

You can shrink the header programatically like this, then do things after the header has been shrunk.
```
RUI.Header.shrinkHeader(callback)
```

If you want to scroll directly to an element you can do the following:
```
<a rui-scroll-to-el='#elementToScollTo'> click me to scroll to an element </a>
```

If you don't want to use the link element, you can directly call the `scrollTo` method.
```javascript
RUI.Header.scrollTo('#elementToScollTo');
```

An optional `offset` parameter can be used to adjust the page position. For example, if you want to keep `100px` between the header and the `scrollTo` element, simply do

```javascript
RUI.Header.scrollTo('#elementToScrollTo', 100);
```

This can also be done by adding a data attribute `rui-scroll-offset` to a link element, for example:
```
<a rui-scroll-to-el='#elementToScollTo' rui-scroll-offset='100'> click me to scroll to an element </a>
```

Head over to the responsive template to have a look at this functionality: <br/><br/>
<a target="_blank" href="examples-responsive.html" class="rui-button-brand">
<span class="rui-icon rui-icon-camera"></span>
Responsive Layout
</a>
