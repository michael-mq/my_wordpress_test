<?php

add_action('wp_enqueue_scripts', 'bones_scripts_and_styles');

function bones_scripts_and_styles()
{
    if (!is_admin()) {
        $hash = file_get_contents(get_stylesheet_directory().'/library/bundle.hash.config');

        wp_register_style('bundle-css', get_stylesheet_directory_uri().'/library/css/dist/bundle.'.$hash.'.css', '', '');
        wp_register_script('bundle-main', get_stylesheet_directory_uri().'/library/js/dist/bundle.'.$hash.'.js', '', '', true);

        wp_enqueue_style('bundle-css');
        wp_enqueue_script('bundle-main');
    }
}

add_theme_support('post-thumbnails');

/* Set up excerpt length and ending characters */
function wpdocs_custom_excerpt_length($length)
{
    return 30;
}
add_filter('excerpt_length', 'wpdocs_custom_excerpt_length', 999);

function wpdocs_excerpt_more($more)
{
    return ' ...';
}
add_filter('excerpt_more', 'wpdocs_excerpt_more');

function bamboo_request($query_string)
{
    if (isset($query_string['page'])) {
        if ('' != $query_string['page']) {
            if (isset($query_string['name'])) {
                unset($query_string['name']);
            }
        }
    }

    return $query_string;
}
add_filter('request', 'bamboo_request');

/* Fix pagination 404 issues, eg, /page/2 is not working */
function custom_pre_get_posts($query)
{
    if ($query->is_main_query() && !$query->is_feed() && !is_admin() && is_category()) {
        $query->set('paged', str_replace('/', '', get_query_var('page')));
    }
}

add_action('pre_get_posts', 'custom_pre_get_posts');

// Breadcrumbs functions
require_once('functions/plugin-breadcrumbs.php');
