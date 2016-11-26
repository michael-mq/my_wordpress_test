---
title: Grids
module: rui-core
categories: Styles
---
#RUI Grids

Grids can be overly complicated with non-semantic classes and obscure conventions.

## Fully responsive grid - Based on [Twitter Bootstrap](http://getbootstrap.com/css/#grid-options)

RUI advanced grid gives you more control of the layout behaviour for different screen sizes.
<ul class="rui-list">
<strong>Here's some handy things to know:</strong>
  <li>Give your grid a class of rui-grid-advanced</li>
  <li>Each row should have a class of rui-grid-row</li>
  <li>Columns must exist as children of a row to ensure correct padding and margins</li>
  <li>Columns create gutters (gaps between column content) via padding. That padding is offset in rows for the first and last column via negative margin on rows.</li>
  <li>The negative margin is why the examples below are outdented. It's so that content within grid columns is lined up with non-grid content.</li>
</ul>

<ul class="rui-list">
<strong>Some Extras</strong>
  <li>give your grid a class of rui-grid-advanced-mobile-bleed to bleed content to the edge of the screen for .rui-col-xs column lengths</li>
</ul>

<table>
  <thead>
    <tr class="docs-500">
      <th></th>
      <th>
            Extra small devices - Phones (&lt;719px)
      </th>
      <th>
        Small devices - Tablets (≥719px)
      </th>
      <th>
        Medium devices - Desktops (≥880px)
      </th>
      <th>
        Large devices - Desktops (≥1200px)
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th class="docs-500">Grid behavior</th>
      <td>Horizontal at all times</td>
      <td colspan="3">Collapsed to start, horizontal above breakpoints</td>
    </tr>
    <tr>
      <th class="docs-500">Class prefix</th>
      <td><code>.rui-col-xs-</code></td>
      <td><code>.rui-col-sm-</code></td>
      <td><code>.rui-col-md-</code></td>
      <td><code>.rui-col-lg-</code></td>
    </tr>
    <tr>
      <th class="docs-500"># of columns</th>
      <td colspan="4">12</td>
    </tr>
    <tr>
      <th class="docs-500">Gutter width</th>
      <td colspan="4">30px (15px on each side of a column)</td>
    </tr>
  </tbody>
</table>

<div class="docs-grid-example">
    <div class="rui-grid-advanced">
        <div class="rui-grid-row">
          <div class="rui-col-xs-6">.rui-col-xs-6</div>
          <div class="rui-col-xs-6">.rui-col-xs-6</div>
        </div>
        <div class="rui-grid-row">
          <div class="rui-col-sm-4">.rui-col-sm-4</div>
          <div class="rui-col-sm-4">.rui-col-sm-4</div>
          <div class="rui-col-sm-4">.rui-col-sm-4</div>
        </div>
        <div class="rui-grid-row">
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
          <div class="rui-col-md-1">.rui-col-md-1</div>
        </div>
        <div class="rui-grid-row">
          <div class="rui-col-md-8">.rui-col-md-8</div>
          <div class="rui-col-md-4">.rui-col-md-4</div>
        </div>
    </div>
</div>



## Two column layout suited to our current site designs

With a lot of our sites utilising a fixed right hand column for advertising we still need a responsive layout that accommodates those ads.
This example also requires a .wrapped around it but only requires a single class for each column.

<div class="docs-grid-example">
  <div class="rui-clearfix">
    <section class="rui-grid-primary">
      <strong>
        .rui-grid-primary<br />
        (680px fluid)
      </strong>
    </section>
    <section class="rui-grid-secondary">
      <strong>
        .rui-grid-secondary<br />
        (300px fixed)
      </strong>
    </section>
  </div>
</div>

<strong>Some Extras</strong>
  <li>
    Add the classes ```.rui-grid.rui-grid-mobile-bleed``` wrapping the above containers to bleed content to the edge of the screen for devices that sit under this
    [mobile breakpoint](https://git.realestate.com.au/rui/rui-sass-common/blob/master/src/scss/_resi-base.scss#L42)

  </li>
  
</ul>

<br/><br/><br/><br/><br/><br/><br/><br/><br/>
## Fully responsive grid - Soon to be deprecated

RUI simply divides the page into segments from halves to fifths:
  
<div class="docs-grid-example">
  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-fifth first">
      <strong>.rui-grid-fifth</strong>
    </div>
    <div class="rui-grid-column rui-grid-fifth">
      <strong>.rui-grid-fifth</strong>
    </div>
    <div class="rui-grid-column rui-grid-fifth">
      <strong>.rui-grid-fifth</strong>
    </div>
    <div class="rui-grid-column rui-grid-fifth">
      <strong>.rui-grid-fifth</strong>
    </div>
    <div class="rui-grid-column rui-grid-fifth">
      <strong>.rui-grid-fifth</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-four-fifths first">
      <strong>.rui-grid-four-fifths</strong>
    </div>
    <div class="rui-grid-column rui-grid-fifth">
      <strong>.rui-grid-fifth</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-quarter first">
      <strong>.rui-grid-quarter</strong>
    </div>
    <div class="rui-grid-column rui-grid-quarter">
      <strong>.rui-grid-quarter</strong>
    </div>
    <div class="rui-grid-column rui-grid-quarter">
      <strong>.rui-grid-quarter</strong>
    </div>
    <div class="rui-grid-column rui-grid-quarter">
      <strong>.rui-grid-quarter</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-quarter first">
      <strong>.rui-grid-quarter</strong>
    </div>
    <div class="rui-grid-column rui-grid-three-quarters">
      <strong>.rui-grid-three-quarters</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-third first">
      <strong>.rui-grid-third</strong>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <strong>.rui-grid-third</strong>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <strong>.rui-grid-third</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-two-thirds first">
      <strong>.rui-grid-two-thirds</strong>
    </div>
    <div class="rui-grid-column rui-grid-third">
      <strong>.rui-grid-third</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-third first">
      <strong>.rui-grid-third</strong>
    </div>
    <div class="rui-grid-column rui-grid-two-thirds">
      <strong>.rui-grid-two-thirds</strong>
    </div>
  </div>

  <div class="rui-clearfix">
    <div class="rui-grid-column rui-grid-half first">
      <strong>.rui-grid-half</strong>
    </div>
    <div class="rui-grid-column rui-grid-half">
      <strong>.rui-grid-half</strong>
    </div>
  </div>
</div>
