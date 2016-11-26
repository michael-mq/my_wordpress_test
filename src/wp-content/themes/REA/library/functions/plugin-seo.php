<?php

// move WP SEO to below ACFs by default
function my_wpseo_metabox_prio() {
	return 'low' ;
}
add_filter('wpseo_metabox_prio' , 'my_wpseo_metabox_prio' );

// remove json ld search from wp_head
add_filter( 'wpseo_json_ld_output', '__return_false' );


// SEO functions
function SEO_content_filter($content){
	if (is_single()){ // Only on the single post page
		$termArgs = array(
			'hide_empty'    => false,
		);
		$tags = get_terms('post_tag', $termArgs);

		$thePattern = "/(";
		$count = 0;

		//Run through each tag
		foreach ($tags as &$tag) {
			$tag_name = $tag->name;
			if($count < 1){
				$thePattern = $thePattern.''.$tag_name;
			}else{
				$thePattern = $thePattern.' | '.$tag_name;
			}
			$count++;
			//$tag_ID = $tag->term_id;
			}
		$thePattern = $thePattern.")/";
		$theReplace = '<a href="http://local.wordpress.dev/tag/$1">$1</a>';
		$SEOcontent = preg_replace($thePattern, $theReplace, $content);

		// Returns the content.
		return $SEOcontent;
	}
}

#add_filter( 'the_content', 'SEO_content_filter', 20);

// SEO Article tags
function schema_article_tags(){
	global $post;

	if($post->post_type == 'post') {

		$user = get_user_by( 'id', $post->post_author);
		$image_url = get_field('feature_image', $post->ID);
		$image_url = wp_get_attachment_image_src( $image_url, 'hero-image');

		echo '<meta itemprop="headline" content="' . $post->post_title . '"/>' . "\n";
		echo '<meta itemprop="articleBody" content="' . $post->post_excerpt . '"/>' . "\n";

		if($categories = get_the_category($post->ID)) {
			foreach($categories as $category) {
				echo '<meta itemprop="articleSection" content="' . $category->name . '"/>' . "\n";
			}
		}

		echo '<meta itemprop="author" content="' . $user->first_name . ' ' . $user->last_name . '"/>' . "\n";
		echo '<meta itemprop="publisher" content="realestate.com.au"/>' . "\n";
		echo '<meta itemprop="datePublished" content="' . $post->post_date . '"/>' . "\n";

		if($image_url[0] != "") {
		echo '<meta itemprop="thumbnailUrl" content="' . $image_url[0] . '"/>' . "\n";
		}

		echo '<meta itemprop="url" content="' . esc_url('http://' . $_SERVER["HTTP_HOST"] . strtok($_SERVER["REQUEST_URI"],'?')) . '"/>' . "\n";

	}
}

add_action( 'wpseo_opengraph', 'schema_article_tags', 10 );


// Remove pagination from canonicals
function design_canonical( $url ) {
   global $post;

   $canonical = preg_replace("/\/page\/[0-9]+(?:\.[0-9]*)?\//", "", $url);
   $canonical = preg_replace("/\/\/(yahoo|ebay)/", "//www", $canonical);

   return $canonical;
}

add_filter( 'wpseo_canonical', 'design_canonical' );


// Show page x only after first page, page 2 and up
function design_title( $title ) {

	global $post;

	$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;

	if($paged > 1){
		$title = $title . ' Archives - Page '. $paged ;
	}

	return $title;
}
add_filter( 'wpseo_title', 'design_title' );

// define the wpseo_sitemaps_base_url callback
function filter_wpseo_sitemaps_base_url( $base ) {

	global $wp_rewrite;
	$base = $wp_rewrite->using_index_permalinks() ? 'index.php/sitemaps/' : '/news/sitemaps/';
	return $base;

};

// add the filter
add_filter( 'wpseo_sitemaps_base_url', 'filter_wpseo_sitemaps_base_url', 10, 1 );

?>