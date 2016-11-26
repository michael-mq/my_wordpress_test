<?php

	add_action( 'init', 'init_my_connection_type', 100 );
	add_action( 'add_meta_boxes', 'register_my_meta_box' );

	function init_my_connection_type() {

		p2p_register_connection_type( array(
			'name' => 'posts_to_brands',
			'from' => 'post',
			'to' => 'brands',
			'from_query_vars' => array('post_status' => 'any')
		));

	}

	function register_my_meta_box() {
		add_meta_box( 'my-box', 'Associated Brands', 'render_meta_box', 'master-editor' );
	}

	function render_meta_box( $post ) {
		$connected = p2p_type( 'posts_to_pages' )->get_connected( $post );
		echo '<ul>';
		   while ( $connected->have_posts() ) : $connected->the_post();
			   echo '<li><a href="'.the_permalink().'">'.the_title().'</a></li>';
		   endwhile;
		echo '</ul>';
	}
?>