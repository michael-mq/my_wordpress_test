# rui-header-footer
To install this module checkout the wiki:
https://git.realestate.com.au/rui/rui-header-footer/wiki/Working-with-rui-header-footer

## About
RUI Header and Footer

* Boilerplate (header footer) to generate rea looks like site
* Click buster to fix the extra click when dealing with browsers on touch devices
* Header init to generate InitHeader
* Touch Button to create fast responding buttons when dealing with browsers on touch devices

### URLs
List all relevant URLs for the app including the below:
* [RUI CDN](#rui-cdn)
* [Documentation &amp; examples](http://rea.to/ui)
* [CI](http://master.resi-bamboo.delivery.realestate.com.au/browse/RUI-RUIH)

### Experts
* Sammy Weller
* Fu Ying
* Shane Gibb
* Alex Zaharakis
* James Amon
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

## Issues and Notification
[GitHub Issues](https://git.realestate.com.au/rui/rui-header-footer/issues)

## FAQ
