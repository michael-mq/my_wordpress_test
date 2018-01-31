<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
  <head>
    <meta charset="<?php bloginfo("charset"); ?>">
    <title><?php wp_title(""); echo wp_title("", false) ? " :" : ""; bloginfo("name"); ?></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">
    <link rel="pingback" href="<?php bloginfo("pingback_url"); ?>">
    <?php wp_head(); ?>
  <body <?php body_class(); ?>>
    <div class="wrapper">
