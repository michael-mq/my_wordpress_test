<?php
// Register Custom Post Type for Brands
function brands_post_type() {
	register_post_type( 'brands',
		 // let's now add all the options for this post type
		array('labels' => array(
			'name' => __('Brands', 'bonestheme'), /* This is the Title of the Group */
			'singular_name' => __('Brand', 'bonestheme'), /* This is the individual type */
			'all_items' => __('All Brands', 'bonestheme'), /* the all items menu item */
			'add_new' => __('Add Brand', 'bonestheme'), /* The add new menu item */
			'add_new_item' => __('Add New Brand', 'bonestheme'), /* Add New Display Title */
			'edit' => __( 'Edit', 'bonestheme' ), /* Edit Dialog */
			'edit_item' => __('Edit Brands', 'bonestheme'), /* Edit Display Title */
			'new_item' => __('New Brands', 'bonestheme'), /* New Display Title */
			'view_item' => __('View Brand', 'bonestheme'), /* View Display Title */
			'search_items' => __('Search Brands', 'bonestheme'), /* Search Custom Type Title */
			'not_found' =>  __('Nothing found in the Database.', 'bonestheme'), /* This displays if there are no entries yet */
			'not_found_in_trash' => __('Nothing found in Trash', 'bonestheme'), /* This displays if there is nothing in the trash */
			'parent_item_colon' => ''
			), /* end of arrays */
			'description' => __( 'Brands associated with the REA Blog', 'bonestheme' ), /* Custom Type Description */
			'public' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => true,
			'show_ui' => true,
			'query_var' => true,
			'menu_position' => 8, /* this is what order you want it to appear in on the left hand side menu */
			'rewrite'	=> array( 'slug' => 'brand', 'with_front' => false ), /* you can specify its url slug */
			'has_archive' => false, /* you can rename the slug here */
			'capability_type' => 'post',
			'hierarchical' => false,
			/* the next one is important, it tells what's enabled in the post editor */
			'supports' => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'trackbacks', 'custom-fields', 'comments', 'revisions', 'sticky')
		 ) /* end of options */
	); /* end of register post type */

	/* this adds your post categories to your custom post type */
	register_taxonomy_for_object_type('category', 'custom_type');
	/* this adds your post tags to your custom post type */
	register_taxonomy_for_object_type('post_tag', 'custom_type');

}

// adding the function to the Wordpress init
add_action( 'init', 'brands_post_type');

/*
// Australian States
function state_post_type(){

	$labels = array(
		'name'              => _x( 'States', 'taxonomy general name' ),
		'singular_name'     => _x( 'State', 'taxonomy singular name' ),
		'search_items'      => __( 'Search States' ),
		'all_items'         => __( 'All States' ),
		'parent_item'       => __( 'Parent State' ),
		'parent_item_colon' => __( 'Parent State:' ),
		'edit_item'         => __( 'Edit State' ),
		'update_item'       => __( 'Update State' ),
		'add_new_item'      => __( 'Add New State' ),
		'new_item_name'     => __( 'New State Name' ),
		'menu_name'         => __( 'States' ),
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'state' ),
	);

	// register state taxonomy
	register_taxonomy( 'state', array( 'post' ), $args );

	// define states
	$states = array(
		"NSW" => "New South Wales",
		"VIC" => "Victoria",
		"QLD" => "Queensland",
		"TAS" => "Tasmania",
		"SA" => "South Australia",
		"WA" => "Western Australia",
		"NT" => "Northern Territory",
		"ACT" => "Australian Capital Terrirory"
	);

	// register values with state taxonomy
	foreach($states as $key => $value){ wp_insert_term($value, 'state', array('description'=> '', 'slug' => $value)); }

}

// hook into the init action and call create_book_taxonomies when it fires
add_action( 'init', 'state_post_type');

// block users from adding new terms to state taxonomy
add_action( 'pre_insert_term', function ( $term, $taxonomy ) {
	return ( 'state' === $taxonomy ) ? new WP_Error( 'term_addition_blocked', __( 'You cannot add terms to this taxonomy' ) ) : $term;
}, 0, 2 );

// remove state admin menu item
function remove_state_admin_menu_item () { remove_submenu_page( 'edit.php', 'edit-tags.php?taxonomy=state'); }
add_action('admin_menu', 'remove_state_admin_menu_item', 999);

*/

?>