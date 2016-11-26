---
title: Pagination
module: rui-core
categories: Styles
---
#Pagination style

Simple style for pagination for multiple results

<ul class="rui-pagination rui-clearfix">
  <li class="rui-pagination-links rui-pagination-previous">
    <a href="#" title="Go to Previous Page" rel="prev" class="rui-icon rui-icon-left rui-icon-arrow-left">
      Prev
    </a>
  </li>
  <li class="rui-pagination-active">1</li>
  <li><a href="#" class="rui-pagination-number" title="Page Number 2">2</a></li>
  <li><a href="#" class="rui-pagination-number" title="Page Number 3">3</a></li>
  <li><a href="#" class="rui-pagination-number" title="Page Number 4">4</a></li>
  <li class="rui-pagination-links rui-pagination-next">
    <a href="#" rel="next" title="Go to Next Page">
      Next
      <span class="rui-icon rui-icon-arrow-right"></span>
    </a>
  </li>
</ul>

As you can see it takes advantage of rui-icons as well for the previous and next arrows.

Each number in the sequence of pages should have a link directly to the page whilst the active page needs only <span class="docs-snippet">rui-pagination-active</span>.


```html
<ul class="rui-pagination rui-clearfix">
  <li class="rui-pagination-links rui-pagination-previous">
    <a href="#" title="Go to Previous Page" rel="prev" class="rui-icon rui-icon-left rui-icon-arrow-left">
      Prev
    </a>
  </li>
  <li class="rui-pagination-active">1</li>
  <li><a href="#" class="rui-pagination-number" title="Page Number 2">2</a></li>
  <li><a href="#" class="rui-pagination-number" title="Page Number 3">3</a></li>
  <li><a href="#" class="rui-pagination-number" title="Page Number 4">4</a></li>
  <li class="rui-pagination-links rui-pagination-next">
    <a href="#" rel="next" title="Go to Next Page">
      Next
      <span class="rui-icon rui-icon-arrow-right"></span>
    </a>
  </li>
</ul>
```

##Adding the rel attributes for SEO & performance

The html5 attribute <span class="docs-snippet">rel="next"</span> is used to pre-fetch content and also indicate that the link represents the next logical sequence in a series, important for a set of search results.

Similarly the <span class="docs-snippet">rel="prev"</span> is recommended for the previous link (or previous numbered page in the sequence if you can add it programmatically).