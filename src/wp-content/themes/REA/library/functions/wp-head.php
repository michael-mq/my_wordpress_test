<?php

// cleanup the header output
function rea_head_cleanup() {

	// remove shortlink tags
	remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );

	// remove the links to the extra feeds such as category feeds
	remove_action( 'wp_head', 'feed_links_extra', 3 );

	// remove the links to the general feeds: Post and Comment Feed
	remove_action( 'wp_head', 'feed_links', 2 );

	// Disable header links - for now
	remove_action( 'template_redirect', 'rest_output_link_header', 11, 0 );
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );

	// Disable emoji for now
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );

	// Disable oEmbed for now
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );

	// EditURI link
	remove_action( 'wp_head', 'rsd_link' );

	// windows live writer
	remove_action( 'wp_head', 'wlwmanifest_link' );

	// index link
	remove_action( 'wp_head', 'index_rel_link' );

	// previous link
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );

	// start link
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );

	// links for adjacent posts
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );

	// WP version
	remove_action( 'wp_head', 'wp_generator' );

	// remove WP version from css
	add_filter( 'style_loader_src', 'rea_remove_wp_ver_css_js', 9999 );

	// remove Wp version from scripts
	add_filter( 'script_loader_src', 'rea_remove_wp_ver_css_js', 9999 );

	// disable admin bar
	add_filter('show_admin_bar', '__return_false');

}
add_action( 'init', 'rea_head_cleanup' );


// remove WP version from scripts
function rea_remove_wp_ver_css_js( $src ) {
	if ( strpos( $src, 'ver=' ) )
		$src = remove_query_arg( 'ver', $src );
	return $src;
}

// remove WP version from RSS
function rea_rss_version() {
	return '';
}
add_filter('the_generator', 'rea_rss_version');


// remove injected CSS for recent comments widget
function rea_remove_wp_widget_recent_comments_style() {
   if ( has_filter('wp_head', 'wp_widget_recent_comments_style') ) {
	  remove_filter('wp_head', 'wp_widget_recent_comments_style' );
   }
}
add_filter( 'wp_head', 'rea_remove_wp_widget_recent_comments_style', 1 );

// remove injected CSS from recent comments widget
function rea_remove_recent_comments_style() {
  global $wp_widget_factory;
  if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
	remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
  }
}
add_action('wp_head', 'rea_remove_recent_comments_style', 1);

// remove injected CSS from gallery
function rea_gallery_style($css) {
  return preg_replace("!<style type='text/css'>(.*?)</style>!s", '', $css);
}
add_filter('gallery_style', 'rea_gallery_style');
?>
