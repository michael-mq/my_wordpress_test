---
title: Basic utilities
module: rui-core
categories: Styles
---
# Basic CSS styles

Base CSS starts off with the very awesome
<a href="http://necolas.github.com/normalize.css/" title="Visit the normalize docs" class="rui-icon rui-icon-left rui-icon-link">normalize.css</a>
framework, we just modified default sizes and colours to suit our needs.

## Handy utility for dealing with floats

The most often used ones are clearfix, which you can use for a container of floats to maintain the box model and thus preserve your layouts.

``` html
<div class="docs-float-box">
  <div class="docs-float-left">I'm a box floating</div>
  <div class="docs-float-left">I'm another box floated</div>
</div>
```

The outer box does not respect the height of the child elements which can cause issues with your layouts.

<div class="docs-float-box">
  <div class="docs-float-left">I'm a box floating</div>
  <div class="docs-float-left">I'm another box floated</div>
</div>

<hr class="rui-clearboth" />

<br />But with <span class="docs-snippet">.rui-clearfix</span> added to the wrapper, this happens:

<div class="docs-float-box rui-clearfix">
  <div class="docs-float-left">I'm a box floating</div>
  <div class="docs-float-left">I'm another box floated</div>
</div>


## Truncating a single line of text

Handy class <span class="docs-snippet">.rui-truncate</span> for truncating copy in a single line for a responsive layout

``` html
<p class="rui-truncate">
  Bacon ipsum dolor amet flank sirloin beef venison pastrami.
  Venison spare ribs hamburger short rib bacon salami turducken.
  Bacon ipsum dolor amet flank sirloin beef venison pastrami.
</p>
```

Results in

<div class="docs-float-box rui-clearfix">
  <span class="rui-truncate">
    Bacon ipsum dolor amet flank sirloin beef venison pastrami.
    Venison spare ribs hamburger short rib bacon salami turducken.
    Bacon ipsum dolor amet flank sirloin beef venison pastrami.
  </span>
</div>

## Hiding text for accessibility, browsers and more

Sometimes you want to hide text or an image but still have it rendered by a screen reader, other accessibility device or to ensure semantic markup.

``` html

/* Indenting text (eg: hiding the text in browser) */
.rui-text-indent {
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}

/* Hide for both screenreaders and browsers */
.rui-hidden {
  display: none !important;
  visibility: hidden;
}

/* Hide only visually, but have it available for screenreaders */
.rui-visuallyhidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

```

## Loading Assets

Class: **rui-loading**

Will add a background spinner to represent loading.

<img src="http://lorempixel.com/1024/768/" class="rui-loading" width="400" height="300"/>

<img src="http://lorempixel.com/1024/768/" class="rui-loading" width="400" height="300"/>
