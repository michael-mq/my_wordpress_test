# RUI Core

> **Important:** *As of v6.0.0 rui-boilerplate has been removed from rui-core. You will need to add a dependency of 'rui-header-footer' (https://git.realestate.com.au/rui/rui-header-footer) to your application if you wish to bring in the header and footer. *

## About
Core stuff to make a REA branded site and nothing more

* Cid to create a User based off the sites lmdstok cookie, which is the token DS users to store the Users ID
* Toggle to generate toggle link like rea site
* Social to create the social share buttons on the footer

### URLs
List all relevant URLs for the app including the below:
* [RUI CDN](#rui-cdn)
* [Documentation &amp; examples](http://rea.to/ui)
* [CI](http://master.resi-bamboo.delivery.realestate.com.au/browse/RUI-CORE)

### Experts
* Sammy Weller
* Fu Ying
* Shane Gibb
* Alex Zaharakis
* Skype group _UI Ninjas_
* [UI Dev Guild](https://community.rea-group.com/groups/user-interface)

## Development Setup

### Dependencies
**NodeJS** which is easy to install with brew:

    brew update && brew install node

**Grunt** - the JavaScript Task Runner:

    npm install -g grunt

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

## Packaging
Concatenate and uglify the JavaScript. The generated content is added to
the `dist` directory.

    grunt package

## Moar Grunt Tasks
If you look at the [Gruntfile](Gruntfile.js) you'll see it looks a bit empty.
There's actually a bunch of tasks and their default config that
[rui-grunt-config](https://git.realestate.com.au/rui/rui-grunt-config) provides.
Check out that repo for more info or checkout the grunt help to see a list of tasks
available:

##Creating Documentation
Documentation can be created by setting up an index md file in the doc/ folder.
any examples you'd like to create can be done by making an examples directory and creating any number of pages.
docs/ -> src directory to create your documentation.
docs/css/styles.css -> stylesheets if you need to style anything within your documentation examples or descriptions
docs/js/main.js -> javascript if you need specific functionality within your documentation examples or descriptions
docs/examples/pages/*.html -> pages to create a working example of your module by default sets you up a rui-boilerplate site and files in these folders will be the body content.
docs/index.html -> documentation for you to provide in how to use the module.

    grunt -h

## Deployment
There are two stages to the release process:

### Bower
After a change has passed the _Quality &amp; Test_ stage of bamboo you can
manually trigger the _Release_ stage of the bamboo pipleline which will:

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

    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-core.min.js
    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-all.min.js
    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-core.min.css
    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-all.min.css

### Fonts

The fonts are hosted on S3, in the `rea-rui-origin-ap-southeast-2` bucket in shared-prod.
If you upload a new version of the font file, please be sure to set the `Cache-Control`
header appropriately:
```
    Cache-Control: max-age=31536000
```

## Issues and Notification
[GitHub Issues](https://git.realestate.com.au/rui/rui-core/issues)

## FAQ
