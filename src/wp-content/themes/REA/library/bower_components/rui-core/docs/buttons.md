---
title: Buttons
module: rui-core
categories: Styles
---
#Primary button styles

Four core button styles with class name (left) active (middle) and disabled state (right).

Hover over each button to see the treatment.

<div class="rui-clearfix docs-buttons-example docs-buttons-example">
  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-third first">
      <span class="docs-snippet">.rui-button-brand</span>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-brand">Learn more</button>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-brand rui-button-disabled">Learn more</button>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-third first">
      <span class="docs-snippet">.rui-button-brand-dark</span>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-brand-dark">Learn more</button>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-brand-dark rui-button-disabled">Learn more</button>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-third first">
      <span class="docs-snippet">.rui-button-basic</span>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-basic">Learn more</button>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-basic rui-button-disabled">Learn more</button>
    </div>
  </div>

  <div class="rui-clearfix docs-buttons-dark">
    <div class="rui-grid-column rui-grid-third first">
      <span class="docs-snippet">.rui-button-basic-light</span>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-basic-light">Learn more</button>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <button class="rui-button-basic-light rui-button-disabled">Learn more</button>
    </div>
  </div>
</div>

To make a button disabled regardless of style simple add <span class="docs-snippet">.rui-button-disabled</span>.

<h2>Use button or anchor tags?</h2>

Both! Classes can be applied to both buttons and anchor (href) tags for the same effect.

```html
<button class="rui-button-brand">Learn more</button>
<a href="#" title="Button link!" class="rui-button-brand">And I'm a link!</a>
```

Will output the following:

<button class="rui-button-brand">I'm a button</button>
<a href="#" title="Button link!" class="rui-button-brand">And I'm a link!</a>


<h2>What about making it bigger on mobile devices?</h2>

Just add the class <span class="docs-snippet">.rui-mobile-block</span> which will render the button at 100% width of its parent container on viewports below 600px (mobile)

<p><button class="rui-button-brand rui-mobile-block">Learn more</button></p>

<h2>What about making it smaller on mobile devices?</h2>

Just add the class <span class="docs-snippet">.rui-button-mobile-smaller</span> which will render the button slightly smaller on mobile devices.

<p><button class="rui-button-brand rui-button-mobile-smaller">Learn more</button></p>



<div class="rui-hidden">
  <h2>Button Group (deprecated)</h2>
  <div class="rui-button-group">
    <button class="rui-button rui-active">Button 1</button>
    <button class="rui-button">Button 2</button>
    <button class="rui-button">Button 3</button>
  </div>
</div>