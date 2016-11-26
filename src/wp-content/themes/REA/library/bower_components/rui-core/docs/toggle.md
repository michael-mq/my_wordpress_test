---
title: Toggle
module: rui-core
categories: Components
---
# So, how does this toggle function work?

Very simple - just markup your html like this example. The content within the `rui-toggle-container` will initially be
hidden. When the element with `rui-toggle-link` is clicked the contents of `rui-toggle-container` will be displayed.

``` html
<div class="rui-toggle-wrapper">
  <div class="rui-toggle-link">
    TOGGLE LINK
  </div>
  <ul class="rui-toggle-container">
    CONTENT
  </ul>
</div>
```

Which gives us...

<div class="rui-toggle-wrapper">
  <a href="#" class="rui-toggle-link">
    CLICK HERE TO WIN AN iPAD!
  </a>
  <ul class="rui-toggle-container rui-list">
    <li>TOO BAD! BETTER LUCK NEXT TIME!</li>
    <li>DON'T CLICK DODGY LINKS!</li>
    <li>THAT'S ENOUGH FOR NOW</li>
  </ul>
</div>

If you want to decouple the Toggle link and it's container you can specify the container id in a data attribute `container`. Using this style no additional wrappers are required.

``` html
  <a href="#" class="rui-toggle-link" data-container="my_container">
    Click to see the container
  </a>
  <div id="my_container" class="rui-toggle-container" style="background:#eee;padding:20px;">
    ..I am a container..
  </div>
```

<div>
  <a href="#" class="rui-toggle-link" data-container="my_container">
    Click to see the container
  </a>
  <div id="my_container" class="rui-toggle-container" style="background:#eee;padding:20px;">
    ..I am a container..
  </div>
</div>