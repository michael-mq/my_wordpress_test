<?php

// disable default dashboard widgets
function disable_default_dashboard_widgets() {
	remove_meta_box('dashboard_right_now', 'dashboard', 'core');    // Right Now Widget
	remove_meta_box('dashboard_recent_comments', 'dashboard', 'core'); // Comments Widget
	remove_meta_box('dashboard_incoming_links', 'dashboard', 'core');  // Incoming Links Widget
	remove_meta_box('dashboard_plugins', 'dashboard', 'core');         // Plugins Widget
	remove_meta_box('dashboard_quick_press', 'dashboard', 'core');  // Quick Press Widget
	remove_meta_box('dashboard_recent_drafts', 'dashboard', 'core');   // Recent Drafts Widget
	remove_meta_box('dashboard_primary', 'dashboard', 'core');         //
	remove_meta_box('dashboard_secondary', 'dashboard', 'core');       //
	#remove_meta_box( 'wpseo-dashboard-overview', 'dashboard', 'side' );
	remove_meta_box( 'blc_dashboard_widget', 'dashboard', 'side');
}
add_action('admin_menu', 'disable_default_dashboard_widgets');

// admin footer text - legacy
function add_text() {
	$timestamp = wp_next_scheduled('index_cron');
	$dateF = date('Y-m-d h:i:s', $timestamp);
	echo ' Next scheduled search index: '.$dateF.' GMT';
}
add_action('admin_footer_text', 'add_text');

// admin editor styles

function rea_theme_editor_styles() {
	add_editor_style( array( 'library/css/admin/editor-styles.css' ) );
}
add_action('after_setup_theme', 'rea_theme_editor_styles' );


// TinyMCE Code Override
function override_mce_options($initArray) {
	$opts = '*[*]';
	$initArray['valid_elements'] = $opts;
	$initArray['extended_valid_elements'] = $opts;
	return $initArray;
}
add_filter('tiny_mce_before_init', 'override_mce_options');


// WYSIWYG Permissions
$master_editor = get_role( 'master-editor' );
$master_editor->add_cap( 'unfiltered_html' );

$editor = get_role( 'editor' );
$editor->add_cap( 'unfiltered_html' );

$contributor = get_role( 'contributor' );
$contributor->add_cap( 'unfiltered_html' );

$external_contributor = get_role( 'external-contributor' );
$external_contributor->add_cap( 'unfiltered_html' );

// Limit Login attempts exception
function my_ip_whitelist($allow, $ip) { return ($ip == '203.17.253.249') ? true : $allow; }
add_filter('limit_login_whitelist_ip', 'my_ip_whitelist', 10, 2);

?>