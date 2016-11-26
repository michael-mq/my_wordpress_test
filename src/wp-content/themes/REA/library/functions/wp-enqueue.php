<?php

add_action('wp_enqueue_scripts', 'bones_scripts_and_styles', 999);

// loading modernizr and jquery, and reply script
function bones_scripts_and_styles() {
  global $wp_styles; // call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

  $rui_css_version = '3.1.0';
  $rui_js_version = '1.7.2';
  $hash = file_get_contents(ABSPATH . '/wp-content/themes/REA/library/bundle.hash.config');

  if (!is_admin()) {

    // This will be loaded in the <head>
    // CSS Bundle by webpack
    wp_register_style('bundle-css', get_stylesheet_directory_uri() . '/library/css/dist/bundle.' . $hash . '.css', array(), '');

    // Bundle script for React components and anything defined in the index.js in ./app/www/wordpress-default/wp-content/themes/REA/library/webpack/index.js
    // This will be rendered just before </body>
    wp_register_script('bundle-main', get_stylesheet_directory_uri() . '/library/js/dist/bundle.main.' . $hash . '.js', array("jquery"), '', true);

    // Tracking js
    wp_register_script('satellite-lib-js', '//www.realestate.com.au/assets/js/lib/analytics/e5959eaf55fcfb3773bc2b809a9741c6d33e5156/satelliteLib-c57c0c71d2d8046ac8a87cced0935a268cafc7d0.js', array(), '', false );

    // Enqueue styles
    wp_enqueue_style('bundle-css');

    // Enqueue javascript
    wp_enqueue_script('bundle-main');

    // Scripts loaded at the end of the page
    // Minified by AssetsMinify plugin into 'foot-44e37c341571fadbb26af5993a3426e0.js'
    wp_enqueue_script('satellite-lib-js');
  }
}

?>