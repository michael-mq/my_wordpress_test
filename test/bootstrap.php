<?php

require_once './includes/functions.php';

function _manually_load_environment() {
	
	// Add your theme
	//switch_theme('twentysixteenq');
	
	// Update array with plugins to include ...
	$plugins_to_active = array(
		'test-plugin/test-plugin.php'
	);

	update_option( 'active_plugins', $plugins_to_active );

}
tests_add_filter( 'muplugins_loaded', '_manually_load_environment' );

require './includes/bootstrap.php';
