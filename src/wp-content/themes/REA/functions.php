<?php

// WP head cleanup functions
require_once('library/functions/wp-head.php');

// Legacy admin related functionality
require_once('library/functions/wp-admin-area.php');

// Legacy front end related functionality
require_once('library/functions/wp-frontend.php');

// Enqueue scripts and styles
require_once('library/functions/wp-enqueue.php');

// Legacy front end related functionality
require_once('library/functions/wp-menus.php');

// Custom user roles
require_once('library/functions/wp-roles.php');

// Image sizes
require_once('library/functions/wp-images.php');

// Gallery filter
require_once('library/functions/wp-gallery.php');

// Tableau short cake function
require_once('library/functions/wp-short-tableau.php');

// Register Legacy Shortcodes
require_once('library/functions/wp-shortcodes.php');

// Register custom post types
require_once('library/functions/wp-cpt.php');

// Redirection functions
require_once('library/functions/wp-redirects.php');

// json functions
require_once('library/functions/legacy-json.php');

// include plugins - for is plugin active check
include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

// check if post to posts plugin is active, then run the p2p admin plugin
if (is_plugin_active('posts-to-posts/posts-to-posts.php')) {
	require_once('library/functions/legacy-p2padmin.php');
}

// ACF Pro functions
require_once('library/functions/plugin-acf.php');

// SEO related functions
require_once('library/functions/plugin-seo.php');

// Page Navi functions
require_once('library/functions/plugin-pagenavi.php');

// more legacy functions - further audit required
require_once('library/functions/legacy-frontend.php');
require_once('library/functions/legacy-sponsor.php');

// WP REST API V2 functions
require_once('library/functions/plugin-rest-api.php');

// Temp - Add query vars for new news typeface toggle
function rea_add_query_vars_filter( $vars ){
	$vars[] = "typeface";
	return $vars;
}
add_filter( 'query_vars', 'rea_add_query_vars_filter' );

?>
