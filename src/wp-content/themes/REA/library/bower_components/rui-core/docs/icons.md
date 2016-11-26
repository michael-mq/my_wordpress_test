---
title: Icons
module: rui-core
categories: Styles
---
#Icons. Lots of icons.

Our icons are powered by a custom font face and can be applied to any element.

The class <span class="docs-snippet">.rui-icon</span> is required and includes the icon. Any one of the classes below will specify which icon is added.

##Add to an element or as a standalone icon?

Both! You can either add the classes to a span or div element but it must be empty and place it anywhere in your html. Alternatively you can pre-pend
the icon on any element by also adding the class <span class="docs-snippet">.rui-icon-left</span> as follows:

```html
<a href="#" class="rui-icon rui-icon-left rui-icon-email">Email icon pre-pended</a>

star icon <span class="rui-icon rui-icon-save"></span> positioned anywhere
```

<a href="#" class="rui-icon rui-icon-left rui-icon-email">Email icon pre-pended</a> or you can have a star icon
<span class="rui-icon rui-icon-save"></span> positioned anywhere you like.

##Using an icon as a link?
To support touch devices, we want a minimum touchable area of 40px x 40px. Add the class <span class="docs-snippet">.rui-icon-touch</span> to your touchable icons.

```html
<a href="#" class="rui-icon rui-icon-touch rui-icon-search"></a>
```

<a href="#" class="rui-icon rui-icon-touch rui-icon-search"></a> ---- Touchable area


##When to use small icons?
There are bunch of `-small` icons which should be used when the font-size is less than `18px`.


##REA Specific icons

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-bed">
    .rui-icon-bed
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-bath">
    .rui-icon-bath
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-car">
    .rui-icon-car
    </span>
  </div>   
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-save">
    .rui-icon-save
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-save-hollow">
    .rui-icon-save-hollow
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-edit">
    .rui-icon-edit
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-delete">
    .rui-icon-delete
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-confirm">
    .rui-icon-confirm
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-floorplan">
    .rui-icon-floorplan
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-floorplan-inverted">
    .rui-icon-floorplan-inverted
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-email">
    .rui-icon-email
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-lock">
    .rui-icon-lock
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-mappin">
    .rui-icon-mappin
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-listview">
    .rui-icon-listview
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-camera">
    .rui-icon-camera
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-camera-inverted">
    .rui-icon-camera-inverted
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-search">
    .rui-icon-search
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-call">
    .rui-icon-call
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-avatar">
    .rui-icon-avatar
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-multi-user">
    .rui-icon-multi-user
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-multi-user2">
    .rui-icon-multi-user2
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-calculator">
    .rui-icon-calculator
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-calendar">
    .rui-icon-calendar
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-home">
    .rui-icon-home
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-cog">
    .rui-icon-cog
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-user-on">
    .rui-icon-user-on
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-user-off">
    .rui-icon-user-off
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-share">
    .rui-icon-share
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-link">
    .rui-icon-link
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-cross">
    .rui-icon-cross
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-tick">
    .rui-icon-tick
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-add">
    .rui-icon-add
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-dollar">
    .rui-icon-dollar
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-commission">
    .rui-icon-commission
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-contact">
    .rui-icon-contact
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-document">
    .rui-icon-document
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-download">
    .rui-icon-download
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-expand">
    .rui-icon-expand
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-minimise">
    .rui-icon-minimise
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-projects">
    .rui-icon-projects
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-reports">
    .rui-icon-reports
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-reservation">
    .rui-icon-reservation
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-desktop">
    .rui-icon-desktop
    </span>
  </div>  
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-laptop">
    .rui-icon-laptop
    </span>
  </div>    
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-watch">
    .rui-icon-watch
    </span>
  </div>    
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-unlock">
    .rui-icon-unlock
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-question">
    .rui-icon-question
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-remove">
    .rui-icon-remove
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-save-search">
    .rui-icon-save-search
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-filters">
    .rui-icon-filters
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-bell">
    .rui-icon-bell
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-print">
    .rui-icon-print
    </span>
  </div>
</article>

##REA Specific icons Small

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-bed-small">
    .rui-icon-bed-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-bath-small">
    .rui-icon-bath-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-car-small">
    .rui-icon-car-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-save-small">
    .rui-icon-save-small
    </span>
  </div>  
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-save-hollow-small">
    .rui-icon-save-hollow-small
    </span>
  </div>  
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-star-half-small">
    .rui-icon-star-half-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-multi-user-small">
    .rui-icon-multi-user-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-camera-small">
    .rui-icon-camera-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-camera-small-inverted">
    .rui-icon-camera-small-inverted
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-home-small">
    .rui-icon-home-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-floorplan-small">
    .rui-icon-floorplan-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-question-small">
    .rui-icon-question-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-save-search-small">
    .rui-icon-save-search-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-cog-small">
    .rui-icon-cog-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-user-on-small">
    .rui-icon-user-on-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-user-off-small">
    .rui-icon-user-off-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-avatar-small">
    .rui-icon-avatar-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-listview-small">
    .rui-icon-listview-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-filters-small">
    .rui-icon-filters-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-edit-small">
    .rui-icon-edit-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-bell-small">
    .rui-icon-bell-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-call-small">
    .rui-icon-call-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-print-small">
    .rui-icon-print-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-email-small">
    .rui-icon-email-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-minimise-small">
    .rui-icon-minimise-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-expand-small">
    .rui-icon-expand-small
    </span>
  </div>
</article>

##Form icons

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-check-on">
    .rui-icon-check-on
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-check-off">
    .rui-icon-check-off
    </span>
  </div>
</article>

##Navigation icons

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-navdeck">
    .rui-icon-navdeck
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-back">
    .rui-icon-back
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-forward">
    .rui-icon-forward
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-down">
    .rui-icon-arrow-down
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-right">
    .rui-icon-arrow-right
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-up">
    .rui-icon-arrow-up
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-left">
    .rui-icon-arrow-left
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-next">
    .rui-icon-arrow-next
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-previous">
    .rui-icon-arrow-previous
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-solid-down">
    .rui-icon-arrow-solid-down
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-solid-right">
    .rui-icon-arrow-solid-right
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-solid-up">
    .rui-icon-arrow-solid-up
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-solid-left">
    .rui-icon-arrow-solid-left
    </span>
  </div>
</article>

##Navigation icons small

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-back-small">
    .rui-icon-back-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-forward-small">
    .rui-icon-forward-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-search-small">
    .rui-icon-search-small
    </span>
  </div>       
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-down-small">
    .rui-icon-arrow-down-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-right-small">
    .rui-icon-arrow-right-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-up-small">
    .rui-icon-arrow-up-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-arrow-left-small">
    .rui-icon-arrow-left-small
    </span>
  </div>
</article>

##Media icons

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-play">
    .rui-icon-play
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-play-inverted">
    .rui-icon-play-inverted
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-play-video">
    .rui-icon-play-video
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-tags">
    .rui-icon-tags
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-comments">
    .rui-icon-comments
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-rss">
    .rui-icon-rss
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-quotes">
    .rui-icon-quotes
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-office">
    .rui-icon-office
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-image">
    .rui-icon-image
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-3d-tour">
    .rui-icon-3d-tour
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-3d-tour-inverted">
    .rui-icon-3d-tour-inverted
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-warning">
    .rui-icon-warning
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-video-camera">
    .rui-icon-video-camera
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-iphone">
    .rui-icon-iphone
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-ipad">
    .rui-icon-ipad
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-multi-device">
    .rui-icon-multi-device
    </span>
  </div>
</article>

##Media icons small
<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-play-small">
    .rui-icon-play-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-play-small-inverted">
    .rui-icon-play-small-inverted
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-3d-tour-small">
    .rui-icon-3d-tour-small
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-3d-tour-small-inverted">
    .rui-icon-3d-tour-small-inverted
    </span>
  </div>
</article>

##Social icons

<article class="docs-icon-set rui-clearfix">
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-facebook">
    .rui-icon-facebook
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-instagram">
    .rui-icon-instagram
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-twitter">
    .rui-icon-twitter
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-pinterest">
    .rui-icon-pinterest
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-googleplus">
    .rui-icon-googleplus
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-linkedin">
    .rui-icon-linkedin
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-youtube">
    .rui-icon-youtube
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-github">
    .rui-icon-github
    </span>
  </div>
  <div class="docs-icon-example">
    <span class="rui-icon rui-icon-wordpress">
    .rui-icon-wordpress
    </span>
  </div>
</article>
