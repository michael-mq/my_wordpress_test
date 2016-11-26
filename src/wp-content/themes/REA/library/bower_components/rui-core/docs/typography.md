---
title: Typography
module: rui-core
categories: Styles
---
#Typography styles

Browsers use default font size of 16 (1em) pixels and we do too.

Colour is set to REA Bluestone <span class="docs-snippet">#333f48</span> and to make your life
easier just use the <span class="docs-snippet">$defaultDark</span> SASS variable if you're using **rui-sass-common**.

Default line height is 1.5 and all paragraphs have 1em margin on the bottom.

```html
body {
  font-family: 'Museo-Sans-300', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.5;
  color: #333f48;
}
```

## Introducing Museo Sans ##

Our brand typeface of choice is Museo Sans and is set as the default copy across all RUI applications.

It comes in three weights for use in your designs:

<p class="docs-300">Home is where the heart is (Museo-Sans-300)</p>

<p class="docs-500">Home is where the heart is (Museo-Sans-500)</p>

<p class="docs-700">Home is where the heart is (Museo-Sans-700)</p>

By default copy is set to Muse0-Sans-300, headings (h1-h6) and strong tags set to Museo-Sans-500.

Museo-Sans-700 should only be used sparingly for very large headings.


## Examples of using headings

<h1>Home is where the heart is (h1)</h1>

<h2>Home is where the heart is (h2)</h2>

<h3>Home is where the heart is (h3)</h3>


## Font Sizes

We use a base font size of 16 pixels and recommend you resize using **ems**.

<ul class="rui-list">
  <li>11px => 0.689</li>
  <li>12px => 0.750</li>
  <li>13px => 0.814</li>
  <li>14px => 0.875</li>
  <li>15px => 0.938</li>
  <li>16px => 1.000</li>
  <li>17px => 1.064</li>
  <li>18px => 1.125</li>
  <li>19px => 1.188</li>
  <li>20px => 1.250</li>
  <li>21px => 1.313</li>
  <li>22px => 1.375</li>
  <li>23px => 1.438</li>
  <li>24px => 1.500</li>
  <li>25px => 1.563</li>
  <li>26px => 1.625</li>
  <li>27px => 1.688</li>
  <li>28px => 1.750</li>
  <li>29px => 1.813</li>
  <li>30px => 1.875</li>
</ul>

## Lists n stuff

Since we have more lists that don't have the styles we have reset them first and to stylise them you need a class.

* List 1: Default style list
* List 2: Doesn't have any bullets

&nbsp;

Or if you want a 'default' style bullet list then you need to add a class .rui-list

<ul class="rui-list">
  <li>list 1</li>
  <li>list 2</li>
</ul>

Or you can have an inline list which is handy for a row of links etc

<ul class="rui-list-inline">
  <li><a href="#">list 1</a></li>
  <li><a href="#">list 2</a></li>
  <li><a href="#">list 3</a></li>
</ul>

<h1>Deprecated fonts</h1>

Sadly Alwyn (REARegular, REALight) and Museo-Slab (REA-Slab) have gone the way of the Dodo.

