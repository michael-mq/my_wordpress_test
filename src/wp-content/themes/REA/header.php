<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
    <head>
        <?php
            switch (strtolower(explode('/',$_SERVER["REQUEST_URI"])[1])) {
              case 'lifestyle':
              case 'advice':
              case 'calculators':
              ?>
        <meta name="googlebot-news" content="noindex">
              <?php
            }
        ?>
        <meta charset="utf-8">

        <?php get_template_part('partials/omniture'); ?>

        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><?php wp_title(''); ?></title>

        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/favicon_96x96.png">
        <link rel="icon" href="<?php echo get_template_directory_uri(); ?>/library/images/favicon_96x96.png">
        <meta name="msapplication-TileColor" content="#f01d4f">
        <meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/favicon_96x96.png">
        <link rel="shortcut icon" href="//s1.rea.reastatic.net/rs/img/favicon.ico" type="image/x-icon">

        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

        <?php
            wp_head();
            get_template_part('partials/google-analytics');
            get_template_part('partials/outbrain');
            get_template_part('partials/krux-header');
            get_template_part('partials/survey-code');
            include(locate_template('partials/twitter-og.php'));
        ?>

        <!-- Crazy Egg -->
        <script type="text/javascript">
        setTimeout(function(){var a=document.createElement("script");
        var b=document.getElementsByTagName("script")[0];
        a.src=document.location.protocol+"//script.crazyegg.com/pages/scripts/0013/5380.js?"+Math.floor(new Date().getTime()/3600000);
        a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);
        </script>

        <link href="//fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
        <?php
          $host = $_SERVER['HTTP_HOST']; 
           if ($host != "www.realestate.com.au") {
             echo '<meta name="robots" content="noindex, nofollow">';
           }
        ?>

    </head>
    <?php

    $body_classes = 'rui-responsive';
    $cobranding = get_cobranding();
    if (isset($cobranding['header'])) { $body_classes = $body_classes . ' rui-cobranded'; }

    $current_page = $paged;
    $category = get_category($cat);
    if($current_page === 0 && !is_wp_error($category)) { $body_classes = $body_classes . ' ' . $category->slug . '-hub';  }

    ?>

    <body <?php body_class($body_classes); ?>>
        <ul class="rui-visuallyhidden rui-accessibility">
            <li><a href="#rui-main-nav" title="Go directly to the website navigation" accesskey="1" tabindex="1">skip to Main Navigation</a></li>
            <li><a href="#rui-main-content" title="Go directly to main content" accesskey="2" tabindex="2">skip to Content</a></li>
        </ul>

        <?php get_template_part('partials/header_tag'); ?>

        <section class="category-panel rui-clearfix">
            <div class="rui-grid">

                <?php

                  $menuArgs = array(
                    'theme_location' => 'main-nav',
                    'container_id' => 'category-menu'
                    );
                  wp_nav_menu($menuArgs);
                ?>

                <div class="social-and-search">
                    <span>Follow:</span>
                    <ul class="social-links">
                        <li><a href="https://facebook.com/realestateAus" data-service="facebook" class="rui-icon rui-icon-facebook" title="Like realestate.com.au on Facebook" target="_blank"><span class="rui-visuallyhidden">Facebook</span></a></li>
                        <li><a href="https://twitter.com/realestate_au" data-service="twitter" class="rui-icon rui-icon-twitter" title="Follow realestate.com.au on Twitter" target="_blank"><span class="rui-visuallyhidden">Twitter</span></a></li>
                        <li><a href="https://plus.google.com/+realestatecomau" data-service="googleplus" class="rui-icon rui-icon-googleplus" title="Connect with realestate.com.au on Google Plus" target="_blank"><span class="rui-visuallyhidden">Google Plus</span></a></li>
                        <li><a href="http://pinterest.com/realestateau" data-service="pinterest" class="rui-icon rui-icon-pinterest" title="Get pinning with realestate.com.au on Pinterest" target="_blank"><span class="rui-visuallyhidden">Pinterest</span></a></li>
                        <li><a href="https://youtube.com/thereagroup" data-service="youtube" class="rui-icon rui-icon-youtube" title="View the REA Group YouTube Channel" target="_blank"><span class="rui-visuallyhidden">YouTube</span></a></li>
                        <li><a href="<?php echo get_site_url(); ?>/feed" data-service="rss" class="rui-icon rui-icon-rss" title="RSS feed of realestate.com.au blog" target="_blank"><span class="rui-visuallyhidden">RSS</span></a></li>
                    </ul>
                    <?php echo '<div class="searchform fr">'.get_search_form(false).'</div>'; ?>
                </div>
            </div>
        </section>

