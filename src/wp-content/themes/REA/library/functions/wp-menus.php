<?php
// add wp menus 
add_theme_support( 'menus' );

// registering wp3+ menus
register_nav_menus(
	array(
		'main-nav' => __( 'The Main Menu', 'bonestheme' ),   // main nav in header
		'footer-links' => __( 'Footer Links', 'bonestheme' ) // secondary nav in footer
	)
);

// the main menu
function bones_main_nav() {
	// display the wp3 menu if available
	wp_nav_menu(array(
		'container' => false,                           // remove nav container
		'container_class' => 'menu clearfix',           // class of container (should you choose to use it)
		'menu' => __( 'The Main Menu', 'bonestheme' ),  // nav name
		'menu_class' => 'nav top-nav clearfix',         // adding custom nav class
		'theme_location' => 'main-nav',                 // where it's located in the theme
		'before' => '',                                 // before the menu
		'after' => '',                                  // after the menu
		'link_before' => '',                            // before each link
		'link_after' => '',                             // after each link
		'depth' => 0,                                   // limit the depth of the nav
		'fallback_cb' => 'bones_main_nav_fallback'      // fallback function
	));
} /* end bones main nav */

// the footer menu (should you choose to use one)
function bones_footer_links() {
	// display the wp3 menu if available
	wp_nav_menu(array(
		'container' => '',                              // remove nav container
		'container_class' => 'footer-links clearfix',   // class of container (should you choose to use it)
		'menu' => __( 'Footer Links', 'bonestheme' ),   // nav name
		'menu_class' => 'nav footer-nav clearfix',      // adding custom nav class
		'theme_location' => 'footer-links',             // where it's located in the theme
		'before' => '',                                 // before the menu
		'after' => '',                                  // after the menu
		'link_before' => '',                            // before each link
		'link_after' => '',                             // after each link
		'depth' => 0,                                   // limit the depth of the nav
		'fallback_cb' => 'bones_footer_links_fallback'  // fallback function
	));
} /* end bones footer link */

// this is the fallback for header menu
function bones_main_nav_fallback() {
	wp_page_menu( array(
		'show_home' => true,
		'menu_class' => 'nav top-nav clearfix',      // adding custom nav class
		'include'     => '',
		'exclude'     => '',
		'echo'        => true,
		'link_before' => '',                            // before each link
		'link_after' => ''                             // after each link
	) );
}

// this is the fallback for footer menu
function bones_footer_links_fallback() {
	/* you can put a default here if you like */
}
?>