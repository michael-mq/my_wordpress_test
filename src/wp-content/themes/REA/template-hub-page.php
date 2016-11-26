<?php /* Template Name: Hub Page */

// get wp header
get_header(); 

// get the main heading 
get_template_part('blocks/hub/block_main_heading');

 // Looping over the ACF flexible fields on this page and render component
while (the_flexible_field('content_blocks')) {
	get_template_part('blocks/hub/'. get_row_layout());
}

// get wp footer 
get_footer();

?>