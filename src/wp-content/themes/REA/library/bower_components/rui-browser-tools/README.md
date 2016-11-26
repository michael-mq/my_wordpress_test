# RUI Browser Tools

## About
A collection of tools wrapping browser functionality such as:

* Cookie management
* local storage
* URL parsing
* Logging

### URLs
List all relevant URLs for the app including the below:
* [RUI CDN](#rui-cdn)
* [Documentation &amp; examples](http://rea.to/ui)
* [CI](http://master.mad-ci.vpc.realestate.com.au:8085/browse/RUI-BROWSERTOOLS)

### Experts
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

    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-browser-tools.min.js
    https://s1.rui.au.reastatic.net/rui-<RUI-UI-LIBRARY-VERSION>/js/rui-all.min.js

## Issues and Notification
[GitHub Issues](https://git.realestate.com.au/rui/rui-browser-tools/issues)

## FAQ

