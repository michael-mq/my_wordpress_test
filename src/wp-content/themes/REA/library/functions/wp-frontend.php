<?php

/**
 * Responsive Image Helper Function
 *
 * @param string $image_id the id of the image (from ACF or similar)
 * @param string $image_size the size of the thumbnail image or custom image size
 * @param string $max_width the max width this image will be shown to build the sizes attribute
 */

function rea_responsive_image($image_id,$image_size,$max_width){

	// check the image ID is not blank
	if($image_id != '') {

		// set the default src image size
		$image_src = wp_get_attachment_image_url( $image_id, $image_size );

		// set the srcset with various image sizes
		$image_srcset = wp_get_attachment_image_srcset( $image_id, $image_size );

		// generate the markup for the responsive image
		echo 'src="'.$image_src.'" sizes="(max-width: '.$max_width.') 100vw, '.$max_width.'"  srcset="'.$image_srcset.'"  ';

	}
}

function post_child_category( $id = null ){

	if ( $id = null ) { return false; }
	$categories = get_the_category( $id );
	if ( count($categories) > 0 ){return $categories[count($categories)-1]; }
	else { return false; }

}

// Category link helper function
function rea_article_category_link() {

	global $post;
	
	// get the category array  
	$category_array = get_the_category($post);
	
	// if we have a category 
	if($category_array) {

		#$advice = get_category_by_slug('advice');
		#if(!is_wp_error($advice)){ $advice = $advice->term_id; }else{ $advice = 0; }

		// if this category has a parent
		if($category_array[0]->category_parent != 0) {
			// that means we're a child category, so set the parent ID
			$category_parent_id = $category_array[0]->category_parent;
		} else {
			// we're already a parent, so set the term ID
			$category_parent_id = $category_array[0]->term_id;
		}

		$child_category = post_child_category(get_the_ID());
		$category_parent_array = get_category($child_category);
		$category_parent_slug = $category_parent_array->slug;
		$category_parent_name = $category_parent_array->name;

		// Get the URL of this category
		$category_link = get_category_link($child_category);

		echo '<a class="article-summary-category-link" href="' . esc_url( $category_link ) . '">'.$category_parent_name.'</a>';

	}
	
}

/// Article link helper function 
function rea_article_title_link() {
	
	// get the short title 
	$article_short_title = get_field('short_title');
	
	// as long as we have a short title
	if($article_short_title) { 
		
		// set the short title to the article title 
		$article_title = $article_short_title;
	} else { 
		
		// if we don't have a short title, fall back to the standard post title 
		$article_title = get_the_title();
	}
	
	// echo the link, with the real title and display the variable for article title 
	echo '<a class="article-summary-title-link" title="'.get_the_title().'" href="'.get_the_permalink().'">'.$article_title.'</a>';

}


/// Article summary sponsor helper function 
function rea_article_summary_sponsor() {
	
	// get connected brand 
	$connected_brand = get_connected_brands(get_the_ID());
	
	// if we have a connected brand 
	if($connected_brand) { 
		
		// set the logo - we might use this in the future  
		$connected_brand_logo = $connected_brand['brand_logo'];
		
		// set the brand name  
		$connected_brand_name = $connected_brand['brand_name']; 
		
		// set the brand colour - for Sammy 
		$connected_brand_colour = $connected_brand['brand_colour'];

		// return the sponsored by div with label and image
		echo '<div class="article-summary-sponsor">';
		echo '<p class="article-summary-sponsor-label">Presented by</p>';
		echo '<img class="article-summary-sponsor-logo" src='.$connected_brand_logo.' alt="'.$connected_brand_name.'" />';
		echo '</div>';
		
	}
	
}


// Get the social Buttons
function rea_socialicons($postclass, $postID) {
	if($postclass === null) {
		$postclass = 'social-icon';
	}
	//Get the Checkboxs
	$valArray = get_field('sharing_options', $postID);

	foreach ($valArray as &$socialOption) {
		echo '<a href="" class="'.$socialOption.' '.$postclass.'">'.$socialOption.'</a><br />';
	}
	unset($socialOption); // break the reference with the last element
}

// remove the p from around images within a standard wp content area
function rea_filter_ptags_on_images($content){
   return preg_replace('/<p>\s*(<a .*>)?\s*(<img .* \/>)\s*(<\/a>)?\s*<\/p>/iU', '\1\2\3', $content);
}
add_filter('the_content', 'rea_filter_ptags_on_images');

// This removes the […] on a Read More link
function rea_excerpt_more($more) {
	global $post;
	return '...  <a class="excerpt-read-more" href="'. get_permalink($post->ID) . '" title="'. __('Read', 'bonestheme') . get_the_title($post->ID).'">'. __('Read more &raquo;', 'bonestheme') .'</a>';
}
add_filter('excerpt_more', 'rea_excerpt_more');

// custom excerpt length
function custom_excerpt_length( $length ) {
	return 15;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

// custom excerpt more
function custom_excerpt_more($more) {
	global $post;
	return ' ...';
}
add_filter( 'excerpt_more', 'custom_excerpt_more', 999 );

// read more exceprt function - used within the theme
function read_more_excerpt() {
	echo apply_filters('the_excerpt', get_the_excerpt());
	echo '<a href="' . get_permalink() . '" title="Read ' . get_the_title() . '" class="excerpt-read-more">Read more</a>';
}

// custom excerpt used in the theme
function rea_excerpt($post_id) {
	$post = get_post($post_id);
	$excerpt = $post->post_excerpt ? $post->post_excerpt : rea_generate_excerpt($post);

	$html = "<p>$excerpt ...</p>";
	$html .= '<a href="' . get_permalink($post_id) . '" title="Read ' . get_the_title($post_id) . '" class="excerpt-read-more">Read more</a>';
	echo $html;
}

// used in the rea_excerpt function above
function rea_generate_excerpt($post) {
	$words = explode(" ", strip_tags($post->post_content));
	$excerpt = implode(" ", array_splice($words, 0, 30));
	return $excerpt;
}


// Rea related posts
function rea_related ($post_id) {

	$posts = get_field('related_posts', $post_id);

	if (empty($posts)) {
		// If $posts are empty do not display related
		//$posts = rea_get_related_posts_by_tag($post_id);
	}

	if (!empty($posts)) {
		include(locate_template('partials/related-posts.php'));
	}
}

function rea_get_related_posts_by_tag ($post_id, $number_of_posts = 4) {
	$tags = wp_get_post_tags($post_id);
	$tag_ids = array();
	foreach ($tags as $individual_tag) {
		$tag_ids[] = $individual_tag->term_id;
	}

	$args = array(
		'tag__in' => $tag_ids,
		'post__not_in' => array($post_id),
		'posts_per_page' => $number_of_posts,
	);

	return get_posts($args);
}

function slugify($string) {
	$string = strtolower($string);
	$string = preg_replace('/[\\s_]+/', '-', $string);
	$string = preg_replace('/[^-a-z0-9]+/', '', $string);
	return $string;
}

function rea_categories($postID) {
	$output = array();
	if ($categories = get_the_category($postID)) {
		foreach ($categories as $category) {
			$output[] = $category->slug;
		}
	}
	return $output;
}

function rea_tags($postID) {
	$output = array();
	if ($tags = get_the_tags($postID)) {
		foreach ($tags as $tag) {
			$output[] = $tag->slug;
		}
	}
	return $output;
}

function rea_sponsored_content($id, $page){

	$dev = array();

	$template = get_current_template();
	$template = explode('.',$template);
	$template = $template[0];

	//development
	$dev['current_template'] = $template;
	$dev['category'] = $id;
	print_r($dev);

	switch ($template) {

		case 'single':

			$brand = get_posts(array(
					'connected_type' => 'posts_to_brands',
					'connected_items' => $id,
					'nopaging' => true,
					'suppress_filters' => false
				)
			);

			if($brand){ return true; }else{ return false; }

        break;

		case 'category':

			if(isset($connected_brand)){ return true; }
			else{ return false; }

		break;

		default: return false;
	}

}

function connected_brand($post_id){

$brand = get_posts(array(
		'connected_type' => 'posts_to_brands',
		'connected_items' => $post_id,
		'nopaging' => true,
		'suppress_filters' => false
	)
);

if($brand){ return true; }else{ return false; }

}

?>