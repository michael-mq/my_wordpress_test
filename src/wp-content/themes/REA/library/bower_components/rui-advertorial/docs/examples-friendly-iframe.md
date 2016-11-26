---
title: Advertorial - Examples - Friendly Iframes
module: rui-advertorial
categories: Components
excludeFromToc: true
---
<h2>Friendly iFrame Example</h2>
Notice that the first unit keeps a bunch of whitespace after the ad, before the
"End of content" header? Also notice that the second unit doesn't have this
issue? Thats because `iframe` type ads cannot be resized or collapsed. The
second unit is a `type="javascript"` ad. Also know as a _friendly iframe_.

<br/>
<a href="{{basename}}.html?rui_ads_env=halfpager">Toggle the Half Page size</a><br/>
<a href="{{basename}}.html?rui_ads_env=blanko">Force SAS to return no image</a><br/>
<a href="{{basename}}.html">Reset to standard Leon</a><br/>
<br/>
<div class="rui-grid-advanced">
    <div class="rui-grid-row">
        <div class="rui-col-xs-6">
          <h3>Ad unit 1 (pos: medrec1, type: iframe)</h3>
          <div class="ad"
              data-config-type="iframe"
              data-config-site="rea"
              data-config-sz="300x250,300x600"
              data-config-auto-hide="true"
              data-param-channel="rui"
              data-param-sect="docs"
              data-param-pos="medrec1">
          </div>
          <h2>End of content</h2>
        </div>
        <div class="rui-col-xs-6">
          <h3>Ad unit 1 (pos: medrec1, type: javascript-iframe)</h3>
          <div class="ad"
              data-config-type="javascript"
              data-config-site="rea"
              data-config-sz="300x250,300x600"
              data-config-auto-hide="true"
              data-param-channel="rui"
              data-param-sect="docs"
              data-param-pos="medrec1">
          </div>
          <h2>End of content</h2>
        </div>
    </div>
</div>
