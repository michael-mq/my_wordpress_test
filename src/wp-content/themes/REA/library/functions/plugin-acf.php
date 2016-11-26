<?php

// ACF Pro - Register Options Pages
if( function_exists('acf_add_options_page') ) {

	 // add parent for General Options
	$parent = acf_add_options_page(array(
		'page_title' 	=> 'New Options',
		'menu_title' 	=> 'New Options',
		'redirect' 		=> true
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'General',
		'menu_title' 	=> 'General',
		'parent_slug' 	=> $parent['menu_slug'],
	));

	// add sub page for API options
	acf_add_options_sub_page(array(
		'page_title' 	=> 'API',
		'menu_title' 	=> 'API',
		'parent_slug' 	=> $parent['menu_slug'],
	));

}

//ACF Pro - set local JSON save directory
add_filter('acf/settings/save_json', 'my_acf_json_save_point');

function my_acf_json_save_point( $path ) {

	$path = get_stylesheet_directory() . '/library/acf-json';
	return $path;

}

// ACF Pro - set local JSON load directory
add_filter('acf/settings/load_json', 'my_acf_json_load_point');

function my_acf_json_load_point( $paths ) {

	unset($paths[0]);
	$paths[] = get_stylesheet_directory() . '/library/acf-json';
	return $paths;

}


// Order ACF relationship fields by last modified date
function acf_order_query($args, $field, $post){
	$args['orderby'] = 'modified';
	$args['order'] = 'DESC';
	$args['post_status'] = array('publish');
	return $args;
}

// Order all relationship queries 
add_filter('acf/fields/relationship/query', 'acf_order_query', 10, 3);

// Order all post object queries 
add_filter('acf/fields/post_object/query', 'acf_order_query', 10, 3);



// set featured image ID (from ACF) as WP featured image (another line in post meta)
function acf_set_featured_image( $value, $post_id, $field  ){

	if($value != ''){
		//Add the value which is the image ID to the _thumbnail_id meta data for the current post
		add_post_meta($post_id, '_thumbnail_id', $value);
	}

	return $value;
}

add_filter('acf/update_value/name=feature_image', 'acf_set_featured_image', 10, 3);

?>