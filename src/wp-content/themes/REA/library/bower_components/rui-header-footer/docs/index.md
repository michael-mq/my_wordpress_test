---
title: Header/Footer
module: rui-header-footer
categories: Styles
---
# Check out realestate.com.au framework

This is the base module for an REA themed project, be it for realestate.com.au, the below links are examples that show 
the different header layouts.  

<div class="docs-boilerplate-links">
  <a target="_blank" href="examples-responsive.html" class="rui-button-brand">
    <span class="rui-icon rui-icon-camera"></span>
    Responsive Layout
  </a>
  <a target="_blank" href="examples-responsive-leaderboard.html" class="rui-button-brand">
    <span class="rui-icon rui-icon-camera"></span>
    Responsive Leaderboard Layout
  </a>
</div>
<div class="docs-boilerplate-links">
  <a target="_blank" href="examples-leaderboard.html" class="rui-button-basic">
    <span class="rui-icon rui-icon-camera"></span>
    Leaderboard Layout
  </a>
  <a target="_blank" href="examples-subnav.html" class="rui-button-basic">
    <span class="rui-icon rui-icon-camera"></span>
    Subnavigation Layout
  </a>
  <a target="_blank" href="examples-cobranded.html" class="rui-button-basic">
    <span class="rui-icon rui-icon-camera"></span>
    Cobranded Layout
  </a>    
</div>
     
## Copy the html to paste into your project.

<div class="docs-boilerplate-links">
  <a target="_blank" onclick="cp.getHeader()" class="rui-button-basic">
    <span class="rui-icon rui-icon-listview"></span>
    Header markup
  </a>
  <a target="_blank" onclick="cp.getFooter()" class="rui-button-basic">
    <span class="rui-icon rui-icon-listview"></span>
    Footer markup
  </a>
</div>

## More Info!


### Header DOM breakdown
``` html                   
<header class="rui-header rui-clearfix">
    <div class="rui-grid rui-header-container">
        <!-- The logo! -->
        <a title="realestate.com.au homepage" href="/buy" class="rui-main-logo">
            <img ...>
        </a>
        <div class="rui-clearboth"></div>
        <!-- The burger Menu -->
        <button class="rui-burger-toggle rui-icon rui-icon-navdeck rui-button-no-style rui-desktop">
            <span class="rui-visuallyhidden">Menu</span>
            <span class="hit-box"></span>
        </button>
        <!-- If you want to add an icon on the right hand side of the mobile nav (instead of MyREA menu), this is the container that will hold your icon (Note: MyREA markup should be removed from header) -->
        <div class="rui-mobile-icons">
            <span class="rui-icon rui-icon-search"></span>
        </div>
        
        <!-- My REA Nav there is a logged in state and a logged Out state to choose from put either in this container -->
        <nav class="rui-myrea-nav">
            <!-- Some login buttons and or signupery -->
            <ul class="rui-user-menu logged-out" style="display: none;">
                <li...>
            </ul>
            <!-- Myrea menu and dropdowns -->
            <ul class="rui-user-menu logged-in" style="">
                <li...>
            </ul>
        </nav>
    </div>
    <!-- This is a divider that seperates the top header component from the nav, it is also styled as a 1px border line when the nav is expanded in shrunk mode -->
    <hr class="rui-clearboth">
    <!-- Navigation links -->
    <div class="rui-grid rui-nav-container rui-burger-container">
        <!-- This should always be populated with REA's main nav -->
        <nav class="rui-main-nav">
            <ul>
                <li...>
            </ul>
        </nav>
        <!-- If the site is responsive put your mobile navigation in here -->
        <nav class="rui-mobile-nav">
            <ul>
                <li...>
            </ul>
        </nav>
    </div>
</header>
```


### What if I want the header positioned at the top of the body
```html
<header class="otherclasses... rui-header-not-fixed">
```

Apply that class to the header to keep it at the top of the page.

### Do I have to do anything to get the hido-callapso action of the header?

Just so long as you include the rui-core package below the header in the DOM the header will automagically load with the desired functionality.

### What if I want the header constantly shrunk
```html
<header class="otherclasses...  rui-header-shrink">
```
Applying this class to the header tag will shrink the header down, this is the class that is applied when the user scrolls the page

## MyREA Menu (PersonGuy)

MyREA menu *Header.userView* manages the login/logout view and user menu. 
It listens for `rui-logged-in`, `rui-logged-out` events (dispatched by [rui-user](https://git.realestate.com.au/rui/rui-user) module) and updates the appropriate login view.
For a responsive app (`<body class="rui-responsive">`), it will generate a drop-down menu for desktop view, and slide-in side panel for the mobile view.
If your app is NOT responsive, only the desktop view is generated.

``` html
<header class="rui-header rui-clearfix">
    <foo.. />
    <bar.. />
    <nav class="rui-myrea-nav" style="display:none">
        <!-- login buttons - visible only when logged out on desktop -->
        <ul class="rui-login-buttons">
            <li class="rui-user-menu-item">
                <a href="/my-real-estate/login" title="Sign in" class="rui-login-btn">Sign in</a>
            </li>
            <li class="rui-user-menu-item">
                <a href="/my-real-estate/register" class="rui-button-brand rui-login-btn" title="Create an account">Join</a>
            </li>
        </ul>
        <!-- personguy menu - visible in mobile mode, and when logged in on desktop -->
        <ul class="rui-person-guy-menu rui-toggle-wrapper">
            <li class="rui-user-menu-item">
                <a href="#" class="rui-person-guy rui-toggle-link rui-icon rui-icon-user-off"></a>

                <!-- menu items generated with javascript -->
                <div class="rui-account-menu-container">
                </div>
            </li>
        </ul>
    </nav>
</header>
```

*Header.userView* will figure out which content block to display in the above, in this case the user is logged-in. If you are using this module you will want to initialize both divs with `display:none`, and the module will show the correct div on initialization.

``` html
<nav class="rui-mobile-nav">
    <ul>
        <li...>
        <li class="rui-nav-item blog">
            <a href="/blog" title="realestate.com.au blog">
                <span>Blog</span>
            </a>
        </li>
        <li class="rui-nav-item myrea rui-user-menu logged-out" style="display: list-item;">
            <a href="/my-real-estate/login" title="Sign In">
                <span>Sign In</span>
            </a>
        </li>
        <li class="rui-nav-item myrea rui-user-menu logged-in" style="display: none;">
            <a class="last" href="#" title="Logout">
                <span>somecrazylongemailaddress@yomoma.com</span>
            </a>
        </li>
    </ul>
</nav>
```

## rui-user
For this functionality to work, you must also include [rui-user](https://git.realestate.com.au/rui/rui-user) module.
`rui-user` will check if user has a DS session active and dispatch the appropriate events for `Header.userView` to consume.
If you want to use this functionality you will have to make sure you load rui-user before rui-header-footer code, as rui-user fires
off an event that rui-header-footer code subscribes to, in order to display the correct user menu.

## Important body classes! You'll need to use one of them!

```html
<body class="rui-leaderboard-layout">
```
Applying this class to the documents body will structure the header to fit a leaderboard advert, this will also mean that page will no longer be responsive
```html
<body class="rui-responsive">
```
Use this if you want a responsive site, Also assumes you are going to utilize a mobile nav so put one in as well!
```html
<body class="rui-has-sub-nav">
```
Applying this class to the documents body will mean that the body will have extra padding to accommodate for a sub navigation.

### Additional body class you might like to know about
```html
<body class="rui-preload">
```
You may have noticed this class on the body, this is there to hide any funkshway animations that may happen as the DOM loads for the first time.

## Mobile
If you include a mobile nav when the page is laid out responsively the burgermenu logic will handle any burger clicks appropriately depending on how the site is displayed i.e mobile vs desktop
```html
<nav class="rui-mobile-nav">
    <ul>
        <li...>
    </ul>
</nav>
```
### Back button
If you put the following `data-return-to-previous-page` on the body, the burger menu will be replaced with a back arrow, on the following conditions:
the previous page was from the domain realestate.com.au, and there is a page in the history to go back to. We enforce the domain realestate.com.au
because if a user comes from google we want to keep them in within the domain. This is really our only way of checking if the user has been navigating
within our site.
```html
<body data-return-to-previous-page='true'>
```

##Retina Images

The header image (http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v3.png) is already retina ready.
If you happen to use retina.js, you should add the

    data-at2x="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v3.png" (same url)

in addition to the src attribute. This will keep retina.js from making a useless XHR HEAD request (on retina devices), which will result in a 403.