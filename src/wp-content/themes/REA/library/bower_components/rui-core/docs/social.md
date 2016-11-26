---
title: Social tools
module: rui-core
categories: Components
---
# Sharing with Social Networks

These sharing widgets allow peeps to share a URL on each of the major social networks.

## Minimum markup:
The minimum configuration below will use the address of the current page as the URL. Page title and meta description for the share post content.

``` html
<div class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-facebook" title="Share on Facebook" data-service="facebook">
        <span class="rui-visuallyhidden">Share on Facebook</span>
    </button>
</div>
```

<div class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-facebook" title="Share on Facebook" data-service="facebook">
        <span class="rui-visuallyhidden">Share on Facebook</span>
    </button>
</div>

## Or you can explicitly configure the widget using `data` attributes.
* URL to share. (All)
* Title of post. (Facebook, Twitter, LinkedIn)
* Post contents. (Facebook, Pinterest, LinkedIn)
* Images to attach to the post. (Facebook, Pinterest)
* Show the 'share' count.

### You lay them out in a list:
To make a horizontal list wrap the social icons in a ul with the following class
```html
<ul class="rui-social-list-inline rui-clearfix">
```
<ul class="rui-social-list-inline rui-clearfix">
  <li class="rui-social rui-social-title">Share</li>
  <li class="rui-social"><a class="rui-icon icon-url"><span>httpp://www.realestate.com.au/new-homepage/buy</span></a></li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-facebook"
      title="Share on Facebook"
      data-service="facebook"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
      data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Share on Facebook</span></a>
  </li>
  <li class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-twitter"
      title="Post on Twitter"
      data-service="twitter"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
    ><span class="rui-visuallyhidden">Post on Twitter</span></button>
  </li>
  <li class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-pinterest"
      title="Pin on Pinterest"
      data-service="pinterest"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-description="this an awesome page!"
      data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Pin on Pinterest</span></button>
  </li>
  <li class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-googleplus"
      title="Share on Google Plus"
      data-service="googleplus"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
    ><span class="rui-visuallyhidden">Share on Google Plus</span></button>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-linkedin"
      title="Share on LinkedIn"
      data-service="linkedin"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
    ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
  </li>
</ul>
<br/><br/>

<ul class="rui-social-list-inline rui-clearfix">
  <li class="rui-social rui-social-title">Share</li>
  <li class="rui-social"><a class="rui-icon icon-url"><span>httpp://www.realestate.com.au/new-homepage/buy</span></a></li>
  <li class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-facebook"
      title="Share on Facebook"
      data-service="facebook"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
      data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Share on Facebook</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-twitter"
      title="Post on Twitter"
      data-service="twitter"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
    ><span class="rui-visuallyhidden">Post on Twitter</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-pinterest"
      title="Pin on Pinterest"
      data-service="pinterest"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-description="this an awesome page!"
      data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Pin on Pinterest</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-googleplus"
      title="Share on Google Plus"
      data-service="googleplus"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
    ><span class="rui-visuallyhidden">Share on Google Plus</span></a>
  </li>
  <li class="rui-social">
    <button class="rui-social-link rui-icon rui-icon-linkedin"
      title="Share on LinkedIn"
      data-service="linkedin"
      data-show-counter="false"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
    ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
  </li>
</ul>
<br/><br/>

<ul class="rui-social-list-inline rui-clearfix">
  <li class="rui-social rui-social-title">Share</li>
  <li class="rui-social"><a class="rui-icon icon-url"><span>httpp://www.realestate.com.au/new-homepage/buy</span></a></li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-facebook"
      title="Share on Facebook"
      data-service="facebook"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
      data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Share on Facebook</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-twitter"
      title="Post on Twitter"
      data-service="twitter"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
    ><span class="rui-visuallyhidden">Post on Twitter</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-pinterest"
      title="Pin on Pinterest"
      data-service="pinterest"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-description="this an awesome page!"
      data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Pin on Pinterest</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-googleplus"
      title="Share on Google Plus"
      data-service="googleplus"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
    ><span class="rui-visuallyhidden">Share on Google Plus</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-linkedin"
      title="Share on LinkedIn"
      data-service="linkedin"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
      data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
  </li>
</ul>

```html
<ul class="rui-social-list-inline rui-clearfix">
  <li class="rui-social rui-social-title">Share</li>
  <li class="rui-social"><a class="rui-icon icon-url"><span>httpp://www.realestate.com.au/new-homepage/buy</span></a></li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-facebook"
      title="Share on Facebook"
      data-service="facebook"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
      data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Share on Facebook</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-twitter"
      title="Post on Twitter"
      data-service="twitter"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
    ><span class="rui-visuallyhidden">Post on Twitter</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-pinterest"
      title="Pin on Pinterest"
      data-service="pinterest"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-description="this an awesome page!"
      data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
    ><span class="rui-visuallyhidden">Pin on Pinterest</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-googleplus"
      title="Share on Google Plus"
      data-service="googleplus"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
    ><span class="rui-visuallyhidden">Share on Google Plus</span></a>
  </li>
  <li class="rui-social">
    <a class="rui-social-link rui-icon rui-icon-linkedin"
      title="Share on LinkedIn"
      data-service="linkedin"
      data-show-counter="true"
      data-url="http://www.realestate.com.au/new-homes/new-land+estates"
      data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
      data-description="this an awesome page!"
    ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
  </li>
</ul>
```



To make a vertical list wrap the social icons in a ul with the following class
```html
<ul class="rui-social-list rui-clearfix">
```

<div class="rui-clearfix">
        <ul class="rui-social-list">
          <li class="rui-social rui-social-title">Share</li>
          <div class="rui-social-container">
              <li class="rui-social">
                <a class="rui-social-link rui-icon rui-icon-facebook"
                  title="Share on Facebook"
                  data-service="facebook"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                  data-description="this an awesome page!"
                  data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
                ><span class="rui-visuallyhidden">Share on Facebook</span></a>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-twitter"
                  title="Post on Twitter"
                  data-service="twitter"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                ><span class="rui-visuallyhidden">Post on Twitter</span></button>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-pinterest"
                  title="Pin on Pinterest"
                  data-service="pinterest"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-description="this an awesome page!"
                  data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
                ><span class="rui-visuallyhidden">Pin on Pinterest</span></button>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-googleplus"
                  title="Share on Google Plus"
                  data-service="googleplus"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                ><span class="rui-visuallyhidden">Share on Google Plus</span></button>
              </li>
              <li class="rui-social">
                <a class="rui-social-link rui-icon rui-icon-linkedin"
                  title="Share on LinkedIn"
                  data-service="linkedin"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                  data-description="this an awesome page!"
                ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
              </li>
          </div>
        </ul>

        <ul class="rui-social-list" style="margin-left:200px">
          <li class="rui-social rui-social-title">Share</li>
          <div class="rui-social-container">
              <li class="rui-social">
                <a class="rui-social-link rui-icon rui-icon-facebook"
                  title="Share on Facebook"
                  data-service="facebook"
                  data-show-counter="true"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                  data-description="this an awesome page!"
                  data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
                ><span class="rui-visuallyhidden">Share on Facebook</span></a>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-twitter"
                  title="Post on Twitter"
                  data-service="twitter"
                  data-show-counter="true"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                ><span class="rui-visuallyhidden">Post on Twitter</span></button>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-pinterest"
                  title="Pin on Pinterest"
                  data-service="pinterest"
                  data-show-counter="true"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-description="this an awesome page!"
                  data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
                ><span class="rui-visuallyhidden">Pin on Pinterest</span></button>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-googleplus"
                  title="Share on Google Plus"
                  data-show-counter="true"
                  data-service="googleplus"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                ><span class="rui-visuallyhidden">Share on Google Plus</span></button>
              </li>
              <li class="rui-social">
                <a class="rui-social-link rui-icon rui-icon-linkedin"
                  title="Share on LinkedIn"
                  data-service="linkedin"
                  data-show-counter="true"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                  data-description="this an awesome page!"
                ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
              </li>
          </div>
        </ul>
</div>


``` html
        <ul class="rui-social-list">
          <li class="rui-social rui-social-title">Share</li>
          <div class="rui-social-container">
              <li class="rui-social">
                <a class="rui-social-link rui-icon rui-icon-facebook"
                  title="Share on Facebook"
                  data-service="facebook"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                  data-description="this an awesome page!"
                  data-images="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
                ><span class="rui-visuallyhidden">Share on Facebook</span></a>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-twitter"
                  title="Post on Twitter"
                  data-service="twitter"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                ><span class="rui-visuallyhidden">Post on Twitter</span></button>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-pinterest"
                  title="Pin on Pinterest"
                  data-service="pinterest"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-description="this an awesome page!"
                  data-media="http://s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png"
                ><span class="rui-visuallyhidden">Pin on Pinterest</span></button>
              </li>
              <li class="rui-social">
                <button class="rui-social-link rui-icon rui-icon-googleplus"
                  title="Share on Google Plus"
                  data-service="googleplus"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                ><span class="rui-visuallyhidden">Share on Google Plus</span></button>
              </li>
              <li class="rui-social">
                <a class="rui-social-link rui-icon rui-icon-linkedin"
                  title="Share on LinkedIn"
                  data-service="linkedin"
                  data-show-counter="false"
                  data-url="http://www.realestate.com.au/new-homes/new-land+estates"
                  data-title="Real Estate, Property & Homes For Sale - realestate.com.au"
                  data-description="this an awesome page!"
                ><span class="rui-visuallyhidden">Share on LinkedIn</span></a>
              </li>
          </div>
        </ul>
```


## Facebook

- link: http://www.facebook.com/sharer/sharer.php?s=100
- url: link to your page
- images: image to show (you can have multiple images 1,2,3...)
- title: Page title
- summary: Page Description

``` html
http://www.facebook.com/sharer/sharer.php?s=100&amp;p[url]=http%3A%2F%2Fwww.realestate.com.au%2Fnew-homes%2Fnew-land%2Bestates&p[images][0]=logo.jpg&p[title]=Checkout%20this%20awesome%20website![summary]=This%20awesome%20website%20rocks!
```


## Twitter

- Link: https://twitter.com/intent/tweet?
- url: link to the Page
- text: Page Title (text to be added to twitter)
- via: to have @username at the end of the post (via @realestate_au)

``` html
https://twitter.com/intent/tweet?url=http%3A%2F%2Fwww.realestate.com.au%2Fnew-homes%2Fnew-land%2Bestates&text=Checkout%20this%20awesome%20website!&via=realestate_au
```

## Pinterest

- Link: http://pinterest.com/pin/create/button/?
- url: link to your page
- media: the item you are pinning
- description: Your Description Text

``` html
http://pinterest.com/pin/create/button/?url=realestate.com.au&media=logo.png&description=w00t!
```

## Google Plus (NOTE: We don't have an icon yet)

- Link: https://plus.google.com/share?
- url: link to the Page

``` html
https://plus.google.com/share?url=www.realestate.com.au
```

## LinkedIn

- link: https://www.linkedin.com/shareArticle?mini=true&
- url: link to your page
- title: Page title
- summary: Page Description

``` html
https://www.linkedin.com/shareArticle?mini=true&url=http%3A%2F%2Fwww.realestate.com.au%2Fnew-homes%2Fnew-land%2Bestates&title=Checkout%20this%20awesome%20website!
```
