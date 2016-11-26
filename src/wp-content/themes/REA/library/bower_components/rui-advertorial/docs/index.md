---
title: Advertorial
module: rui-advertorial
categories: Components
---

# Advertorial

## How to use

There are two main ways to use Advertorial to display an ad on your page:

<ul class="rui-list">
  <li>Add an empty `div` element with a class of **`ad`** to your markup in the
spot where you want the ad to appear.</li>
  <li>Use the various JavaScript APIs to create the ad through code.</li>
</ul>


## Supported Ad types

There are a number of ways to add the advertisement to a page. This is
configured via the **type** configuration parameter.

### JavaScript iFrame

A friendly iframe that allows its content to "break out" of the iframe. Should
be the first choice for anything more complicated than an image ad.

### iFrame

An iframe with its `src` attribute set to an ad server URL.

### Image

A simple `img` element with its `src` set to the ad server URL.

### PureJS

Ad contents are written directly to your page using `document.write()` calls.
These guys need to be written in line as the page loads so they are blocking
calls. **Don't use unless you have to.**

### Native

This ad type invloves two steps. In the first step, a JSON blob is fetched from an ad provider through usual means (a call to SAS for example). In the second step, which is configurable by means of a callback function, this JSON is converted into html and injected into your page. A default implementation is provided to demonstrate this, which uses the Mustache templating engine to accomplish this. You can find more details further down this page.

## Want to know more about the different ad types?

Checkout Steve's excellent blog post on [community](https://community.rea-group.com/docs/DOC-32008).

### Configuration

The following configuration items are available. This can be specifed in the ad
div as `data-config-`(config name).

<table>
  <thead>
    <tr><th>Name</th><th>Required</th><th>Description</th></tr>
  </thead>
  <tbody>
    <tr><td>type</td>              <td>true</td>  <td>"javascript" or "iframe" or "image" can specify the type of the ad.</td></tr>
    <tr><td>site</td>              <td>true</td>  <td>Specifies the site that the ad it part of eg "rea", "rca"</td></tr>
    <tr><td>sz</td>                <td>false</td> <td>Specifies the size of the ad (can be multiple sizes seperated by ,)</td></tr>
    <tr><td>sz-mobile</td>         <td>false</td> <td>Specifies the size of the add to be used on devices with small screens (can be multiple sizes seperated by ,)</td></tr>
    <tr><td>mobile-break</td>      <td>false</td> <td>Speficies the size of a screen in pixels to start rendering the mobile ad size</td></tr>
    <tr class="deprecated">        <td>auto-remove</td>       <td>false</td> <td>DEPRECATED Will remove the ad container when ad is not served.
        Only applicable for ads with a type of "javascript". Doesn't work for Responsive Ads feature.</td></tr>
    <tr><td>auto-hide</td>         <td>false</td> <td>Will hide the ad container when ad is not served, with a lower priority than auto-remove. Only applicable for ads with a type of "javascript"</td></tr>
    <tr><td>increment-random</td>  <td>true</td>  <td>If this value is present then will increment the 'ord' value by 1</td></tr>
    <tr><td>singlerequest</td>     <td>true</td>  <td>If this present and the current ad provider supports the functionality it will request the ads in a bulk fashion</td></tr>
    <tr><td>network-id</td>        <td>false</td> <td>If this value is present then will adding network-id after host url.</td></tr>
  </tbody>
</table>


### Ad Parameters
Div attributes start with "data-param-" can specify the parameters of the ad.
e.g. `data-param-platform`, `data-param-tile`.

Here's a table of some of the more common targeting params:
<table>
  <thead>
    <tr><th>Targeting param name</th><th>Example values</th></tr>
  </thead>
  <tbody>
    <tr><td>platform</td><td>msite, android, iphone, ipad</td></tr>
    <tr><td>channel</td><td>buy, rent, sold, retire, share</td></tr>
    <tr><td>sect</td><td>homepage, resultslist, details</td></tr>
    <tr><td>pos</td><td>1, 2, medrec, calculator</td></tr>
    <tr><td>tile</td><td>1, 2...</td></tr>
    <tr><td>state</td><td>Vic, NSW</td></tr>
    <tr><td>region</td><td>eastern_suburbs, west_coast</td></tr>
    <tr><td>sub</td><td>Richmond, Benalla, Blackburn</td></tr>
    <tr><td>price</td><td>1m_3m, 300K_450k</td></tr>
  </tbody>
</table>

### Examples
```html
<div class="ad"
    data-config-type="javascript"
    data-config-site="rea"
    data-config-sz="300x250"
    data-param-platform="msite"
    data-param-channel="buy"
    data-param-sect="homepage"
    data-param-pos="1">
</div>

<script type="text/javascript" src="../js/rui-advertorial.js"></script>
```

Load the ads manually with a given selector
```html
<script type="text/javascript">
  Advertorial.loadAds("#myAdContainer");
<script>
```

Or Include the magik component that will cause your ads to be rendered after the page has loaded.
This magik code is also loaded by default in rui-all.js
```html
<script type="text/javascript" src="../js/rui-advertorial-magik.js"> </script>
```

rui/advertorial also supports AMD.

### Ad Servers
RUI Advertorial generates URL for the following ad servers:
- Doubleclick
- SAS
<br/>

RUI Advertorial generates SAS URLs by default. To switch to Doubleclick URLs, set the following variable
```javascript
  window.ruiAdProvider = "DC"
```


#### Overriding parameters for SAS
There few instances where param values are different for Doubleclick and SAS.
You can override the default param values by passing in SAS specific values.

Prefix the param with 'data-sas-override-' to override the default value.

Example:
```html
 <div class="ad"
    data-config-type="javascript"
    data-config-site="rea"
    data-config-sz="300x105"
    data-config-sz-mobile="300x100"
    data-sas-override-sz="300x100"
    data-param-channel="retire"
    data-param-sect="homepage"
    data-param-pos="article1"
    data-sas-override-pos="tilead1"
    data-param-dcopt="ist"
    data-param-tile="2">
</div>
```


### Ads created by JavaScript APIs

If you would prefer to create your ads using a JavaScript API, we provde the `Advertorial.createAd` function:

```javascript
var adConfig = {
    "site": "rea.buy",
    "sz": "170x250"
};

var adParams = {
    "platform": "iphoneapp",
    "channel": "buy",
    "sect": "homepage",
    "pos": "calculator",
    "state": "SA"
};

var adContainer = document.getElementByID('adSlot');

var onLoadCompleteCallback = function (adProperties) {
    console.log("Ad load complete! width: " + adProperties.width + ", height: " + adProperties.height);
}

Advertorial.createAd({
  config: adConfig,
  params: adParams,
  container: adContainer,
  loadCompleteCallback: onLoadCompleteCallback
});
```

**Note**: The `onLoadCompleteCallback` is only executed with the *ruiAdProvider* is set to *SAS*.

Refer to included `rui-advertorial-gpt-example.js` for usage.

<div id="rui-gpt-container"> </div>

<script type="text/javascript" src="js/rui-advertorial-gpt-example.js"> </script>

### Working with single page applications

It's possible you won't see any ads on subesquent pages that you create making use of the history pushstate API. This is because the `viewID` parameter isn't updated. To learn more about the significance of this parameter [here](https://community.rea-group.com/docs/DOC-46975).

RUI advertorial provides you with a function to refresh this variable so you can update adverts served in the same spot in the DOM:
```
Advertorial.refreshView()
```
Calling this method at the appropriate point in your application (eg. navigating to new page, loading more content with infinite scroll) will allow you to serve new adverts without a page refresh.

## Demo
<script type="text/javascript" src="js/enablesas.js"> </script>

<h3>Script Ad in iFrame:</h3>
<div class="ad"
    data-config-type="javascript"
    data-config-site="rea.buy"
    data-config-auto-remove="true"
    data-config-sz="300x250,300x600"
    data-param-type="sales"
    data-param-state="vic"
    data-param-sect="homepage"
    data-param-pos="medrec1"
    data-param-tile="12"
    data-param-dcopt="ist">
</div>
<br/>

<h3>IFrame Ad:</h3>
<div class="ad"
    data-config-type="iframe"
    data-config-site="rea.buy"
    data-config-sz="450x98"
    data-config-auto-remove="true"
    data-param-type="sales"
    data-param-state="vic"
    data-param-sect="homepage"
    data-param-pos="advert1"
    data-param-tile="1">
</div>
<br/>

<h3>Image Ad:</h3>
<div class="ad" data-config-type="image" data-config-site="rea.buy" data-param-pos="advert1" data-config-sz="450x98" data-config-sz-mobile="300x100"
        data-param-type="sales" data-param-sect="homepage" data-param-tile="1" style="width:450px; height:98px;"> </div>

Single request ad. Will request all ads tagged as singlerequest in a single request if the current ad provider supports the functionality(otherwise will fallback to the "type" config):
<div class="ad" data-config-type="iframe" data-config-singlerequest="true" data-config-site="rea.retire" data-param-pos="medrec1" data-config-sz="300x250" data-config-sz-mobile="300x100" data-param-dcopt="ist"
        data-param-type="retire" data-param-sect="homepage" data-param-tile="2" style="width:300px; height:250px;"> </div>

<div class="ad" data-config-type="iframe" data-config-singlerequest="true" data-config-site="rea.retire" data-param-pos="medrec2" data-config-sz="300x250" data-config-sz-mobile="300x100" data-param-dcopt="ist"
        data-param-type="retire" data-param-sect="homepage" data-param-tile="2" style="width:300px; height:250px;"> </div>
<br/>

# Pure Javascript Ads

*...to be used as little as possible.*

<script type="text/javascript" src="js/purejsad.js"> </script>
<p></p>


## Something important!
In order to support Pure javascript ads RUI advertorial component needs to be
loaded on the page before it gets to any of the ad calls:
```javascript
<script type="text/javascript" src="../js/rui-advertorial.js"> </script>
```

Then where ever you want one of these ads in the page you need something like the following:

```html
<script type="text/javascript">
    RUI.Advertorial.createJSAd({
        "site": "rea.buy",
        "sz": "170x250",
        "mobile-sz": "300x100",
        "singlerequest": true
    }, {
        "sect": "homepage",
        "type": "sales",
        "pos": "calculator",
        "proptype": "null",
        "state": "null",
        "sz": "170x250",
        "sz-mobile": "100x320"
    });
</script>
```

# Native Ads

Native ads can be included on page by either including a `<div>` with the appropriate parameters. For example:

```html
<div class="ad"
  data-config-type="native"
  data-config-site="rca-test"
  data-config-sz="rca-ios-ads-image"
  data-config-auto-remove="true"
  data-param-state="vic"
  data-param-sub="richmond"
  data-param-channel="buy"
  data-param-sect="resultslist"
  data-param-env="tst"
  data-param-pos="advert1">
</div>
```

Or by intialising in JavaScript with `RUI.Advertorial.createAd()`. For example:

```javascript
RUI.Advertorial.createAd({
  config: {
    type: 'native',
    site: 'rca-test',
    sz: 'rca-ios-ads-image',
    "auto-remove": true
  },
  params: {
    type: 'native',
    state: "vic",
    sub: 'richmond',
    channel: 'buy',
    sect: "resultslist",
    pos: "advert1",
    platform: 'iphoneapp',
    pcode: '3121',
    proptype: 'land_development',
    env: 'tst'
  },
  container: document.querySelector('#native-ad-container'),
  nativeRenderCallback: function(json, renderTarget) {
    // below is very basic example of a custom render function
    renderTarget.innerHTML = '<div style="padding: 10px; margin: 10px; border: 2px solid #bbb; background: #fff"><h2>' + json.adtitletext + '</h2><p>' + json.admessagetext + '</p></div>';
  }
});
```

Please note that you have to use the JavaScript version if you want to use a custom renderer.

## Getting Started

Depending on the ad provider, you'll need to arrange for your ad request to return ad data, preferably as JSON.

## Customising your Native Ad

Rendering the ad data in the html page is a seperate concern and is provided in the Advertorial as a separate module (rui-template-renderer). This uses Mustache to convert the ad data to html.

This is provided for reference and convenience only and you can bring your own implementation if you want to use a different way of rendering the ad data.

In the default implementation, this ad data includes a URL to a template that will be used to render this data. This is an implementation detail and no standard way to handle this is assumed here.

You can set a custom function to handle rendering by passing a function to the `nativeRenderCallback` option in your `RUI.Advertorial.createAd()` call.

Example:

```javascript
RUI.Advertorial.createAd({
    config: ...
    params: ...
    container ...
    nativeRenderCallback: function(json, renderTarget) {
        // your custom rendering here!
    }
})
```

`nativeRenderCallback` is a function of signature (json, renderTarget) where `renderTarget` is a DOM Element to presumably render your template into.
