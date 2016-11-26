# RUI Advertorial

## About
JavaScript library to insert ads into your app

* Cookie management
* local storage
* URL parsing
* Logging

### URLs
List all relevant URLs for the app including the below:
* [RUI CDN](#rui-cdn)
* [Documentation &amp; examples](http://rea.to/ui)
* [CI](http://master.mad-ci.vpc.realestate.com.au:8085/browse/RUI-ADVERTORIAL)
* [Release notes](https://git.realestate.com.au/rui/rui-advertorial/releases)

### Experts
* James Reilly
* Shane Gibb
* Alex Zaharakis
* Latheesh Padukana (native ads)
* Victor Nguyen (native ads)
* Skype group _UI Ninjas_
* [UI Dev Guild](https://community.rea-group.com/groups/user-interface)

## Development Setup

### Dependencies
**NodeJS** which is easy to install with brew:

    brew update && brew install node

**Grunt** - the JavaScript Task Runner:

    npm install -g grunt

**[rui-ie-polyfill](https://git.realestate.com.au/rui/rui-ie-polyfill)**
polyfills for some functions missing in old versions of IE. Make sure to follow
the [README.md](https://git.realestate.com.au/rui/rui-ie-polyfill/blob/master/README.md)
for details on including them in your app.

**[rui-browser-tools](https://git.realestate.com.au/rui/rui-browser-tools)**
for logging.

**[rui-grunt-config](https://git.realestate.com.au/rui/rui-grunt-config)** to
simplify grunt config and cut down on task boilerplate.

**[rui-ci-scripts](https://git.realestate.com.au/rui/rui-ci-scripts)** which
provides common bash scripts to run the different stages of Bamboo.

### Setup

    npm install
    bower install

## Verification
Run JSHint and Jasmine tests through Karma

    grunt test

You can also keep the Karma server running for debug purposes:

    grunt karma:auto

## Packaging
Concatenate and uglify the JavaScript and CSS. The generated content is added
to the `dist` directory.

    grunt package

Files produced by this module:

* `dist/rui-advertorial-all.css`: Styles required by this package.
* `dist/rui-advertorial-all.js`: JS modules needed to load ads on a page via
the API. Will not load ads until explicitly invoked.
* `dist/rui-advertorial-all-magik.js`: As above but will also automatically
load any ads created using the html method for creating ads on
*document.ready()*.

**Note** If you are using the inline JavaScript ad call API of RUI Advertorial
then you must include `rui-advertorial-all.js` or
`rui-advertorial-all-magik.js` before the first invocation of
`Advertorial.createJSAd`. See the [FAQ section](#faq) for more info.

## Moar Grunt Tasks
If you look at the [Gruntfile](Gruntfile.js) you'll see it looks a bit empty.
There's actually a bunch of tasks and their default config that
[rui-grunt-config](https://git.realestate.com.au/rui/rui-grunt-config) provides.
Check out that repo for more info or checkout the grunt help to see a list of tasks
available:

    grunt -h

## Deployment
There are two stages to the release process:

### Bower
After a change has passed the _Quality &amp; Test_ stage of bamboo you can
manually trigger the _Release_ stage of the bamboo pipeline, which will:

1. Bump up the **patch** version of the package. _This can be changed to the **minor**
   or **major** version when triggering this stage_
2. Execute `grunt package`.
3. Commit the packaged files residing in **dist**.
4. Create a git tag for that commit with the new version.

### RUI CDN
[rui-ui-library](https://git.realestate.com.au/ui-development/rui-ui-library)
has a dependency on this package. It will add the files in the **dist** directory
and upload them to S3 with its other RUI dependencies.

These files will also be included in the concatenated bundles that
**rui-ui-library** generates such as `rui-all.js`.

    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-advertorial.min.js
    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-all.min.js

## Issues and Notification
[GitHub Issues](https://git.realestate.com.au/rui/rui-advertorial/issues)

## FAQ

### When should I use `rui-advertorial-all.js` and when should I use `rui-advertorial-all-magik.js`?

Use the *magik* version of RUI Advertorial when you want any Ad `div`'s on your
page automatically converted to Ad calls when the page has finished rendering.
If you want more control you can call `Advertorial.loadAds()` from your
application code when you like.

For example if you need to dynamically create your `<div class="ad">` elements
for infinite scroll or a single page web app you probably want to use
`rui-advertorial-all.js` and manually call `Advertorial.loadAds()`.

If you're constructing the `<div class="ad">` elements on the server side then
you can probably just use `rui-advertorial-all-magik.js` and let RUI Advertorial
fill in your ads when the page has finished loading.

### WTF! I'm getting errors in IE 8!

Are you including the [rui-ie-polyfill](https://git.realestate.com.au/rui/rui-ie-polyfill)
javascript in your app? Double check the [dependencies](#dependencies) section.
