---
title: Hero
module: rui-core
categories: Styles
---
#Hero section

A section to include a large hero on your page.

This section provides the foundation for a hero section. Use your own application specific styles for customise. 
E.g To add a background image, add your own class to the hero container.

**Note:** There's a negative margin on rui-hero. This is to offset the top padding on rui-body-content.

**.rui-hero-content** confines your content to a max width of 750px perfect for wrapping elements that span to the max width of the parent, such as a search box

<div class="rui-hero docs-hero-example">
    <div class="rui-hero-content">
        <h1 class="rui-hero-heading">Heading for your hero section</h1>
    </div>
</div>


```html
<div class="rui-hero **Your-class-here**">
    <div class="rui-hero-content">
        <h1 class="rui-hero-heading">Heading for your hero section</h1>
    </div>
</div>
```
