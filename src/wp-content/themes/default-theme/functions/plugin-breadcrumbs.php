<?php

add_action('bcn_after_fill', 'remove_home_from_breadcrumbs');
function remove_home_from_breadcrumbs($trail)
{
  array_pop($trail->breadcrumbs);
}

add_action('bcn_after_fill', 'pop_first_category_name');
function pop_first_category_name($trail)
{
  if (is_category() && count($trail->breadcrumbs) == 1) {
    array_pop($trail->breadcrumbs);
  }
}

add_action('bcn_after_fill', 'remove_article_name');
function remove_article_name($trail)
{
  if (is_single()) {
    array_shift($trail->breadcrumbs);
  }
}

add_filter('bcn_allowed_html', 'my_bcn_allowed_html');
function my_bcn_allowed_html($allowed_html)
{
  $allowed_html['li'] = array(
    'title' => true,
    'itemprop' => true,
    'itemscope' => true,
    'itemtype' => true
  );
  return $allowed_html;
}

add_filter('bcn_breadcrumb_template', 'change_template');
add_filter('bcn_breadcrumb_template_no_anchor', 'change_template');

function change_template($template)
{
  if (is_category() or is_single()) {
    $template = "<li itemprop=\"itemListElement\" itemscope itemtype=\"http://schema.org/ListItem\">
          <a class='category-link' itemprop=\"item\" href=\"%link%\"><span itemprop=\"name\">%htitle%</span></a>
          <meta itemprop=\"position\" content=\"%position%\" />
        </li>";
    return $template;
  }
}

add_filter('bcn_breadcrumb_title', 'change_advice_title', 10);

function change_advice_title($title)
{
  if ($title === 'Advice') {
    $title = 'Guides';
  }
  return $title;
}

?>
