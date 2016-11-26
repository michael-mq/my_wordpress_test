<?php

/*********************
Category Posts
*********************/
function rea_posts($templateDir){
	$post_iteration = 0;
	if (have_posts()) : while (have_posts()) : the_post();?>
	<article class="cat-post rui-clearfix postid-<?php echo get_the_id(); ?>">
		<?php include(locate_template($templateDir)); ?>
	</article>
	<?php endwhile; endif;
};

/*********************
List the post categories or tags
*********************/
function list_post_cats() {
	$categories = get_the_category();
	if( $categories ) {
		$output = '';
		foreach( $categories as $category ) {
			$output .= '<li><a href="'.get_category_link( $category->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s" ), $category->name ) ) . '">'. $category->cat_name.'</a></li>';
		}
		echo $output;
	}
}

function list_post_tags() {
	$tags = get_the_tags();
	if( $tags ){
		$output = '';
		foreach( $tags as $tag ) {
			$output .= '<li><a href="'.get_tag_link( $tag->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s" ), $tag->name ) ) . '">'. $tag->name.'</a></li>';
		}
		echo $output;
	}
}

/*********************
Rea Homepage Featured Posts
*********************/
function rea_featuredPost($numPosts, $postCat) {
	global $post;
	$tmp_post = $post;

	//Setting Up
	$idObj = get_category_by_slug($postCat);
	$postID = $idObj->term_id;
	$catName = $idObj->name;
	$tempCatName = '<h2>'.$catName.'</h2>';
	$output = '';

	//Featured Post
	$featuredPost = get_field('featured_posts', 'category_'.$postID);
	$output .= $tempCatName;

	if(empty($featuredPost)){
		$featuredID = 0;
	}else{
		$featuredID = $featuredPost[0]->ID;
		$featuredTitle = $featuredPost[0]->post_title;
		$fIMGID = get_field('post_thumb', $featuredID);
		$featuredIMG = wp_get_attachment_image_src($fIMGID, 'rea-post-thumbnail');
		$featuredObj =  $featuredPost[0];
		$authorfirst = get_the_author_meta('first_name', $featuredObj->post_author);
		$authorlast = get_the_author_meta('last_name', $featuredObj->post_author);

		if(empty($featuredIMG)){
			$output .= '<div class="secondary-featured"><img src="//lorempixel.com/300/200/" alt="Sample Image for '.$featuredTitle.'"/>';
		}else{
			$output .= '<div class="secondary-featured"><img src="'.$featuredIMG[0].'" alt="View '.$featuredTitle.'"/>';
		}
		$output .= '<h3>'.$featuredObj->post_title.'</h3><div class="featured-meta">By <a href="">'.$authorfirst.' '.$authorlast.'</a><span class="date">'.get_the_time('d, M, Y', $featuredID).'</span></div><div class="featured-excerpt">'.$featuredObj->post_excerpt.'</div><a href="'.get_permalink($featuredID).'" title="'.$featuredTitle.'" class="excerpt-read-more">Read more</a></div>';
	}

	//General Stuff
	$queryArgs = array('posts_per_page' => $numPosts, 'category_name' => $postCat, 'post__not_in' => array($featuredID));
	$newsPosts = get_posts($queryArgs);

	//The Post Loop
	$output .= '<ul>';
	foreach($newsPosts as $post):
		$theperma = get_permalink($post->ID);
	$output .= '<li><a href="'.$theperma.'">'.$post->post_title.'</a></li>';
	endforeach;
	$output .= '</ul>';
	$post = $tmp_post;

	//Return the content
	echo $output;
}

/*********************
 Rea Featured Posts
 *********************/
function rea_featured_post_carousel($category_id = '') {
	$posts = null;
	if ($category_id) {
		$posts = get_field('featured_posts', 'category_' . $category_id);
	} else {
		$posts = get_field('homepage_slider', 'options');
	}

	if (empty($posts)) {
		return;
	}

	$slides = array();
	foreach ($posts as $index=>$post_object) {
		$slide_details = array(
			'post_id'           => $post_object->ID,
			'hero_image'        => wp_get_attachment_image_src(get_field('feature_image', $post_object->ID), 'hero-contained'),
			'carousel_image' 	=> wp_get_attachment_image_src(get_field('carousel_image', $post_object->ID), 'hero-contained'),
			'post_href'         => get_permalink($post_object->ID),
			'post_short_title'  => get_rea_post_short_title($post_object->ID),
			'post_full_title'   => get_the_title($post_object->ID),
			'post_author'       => $post_object->post_author,
			'selected'          => $index == 0 ? 'selected' : ''
		);
		array_push($slides, $slide_details);
	}
	include(locate_template('partials/carousel.php'));
}

function get_rea_post_short_title($post_id) {
	$short_title = get_field('short_title', $post_id);
	return $short_title ? $short_title : get_the_title($post_id);
}

/*********************
 Rea Sidebar Tabs Module
 *********************/
function set_post_views($post_id) {
	$count = get_field('post_count', $post_id);
	$count++;
	$field_key = 'field_51e4db5af4610';
	update_field($field_key, $count, $post_id);
}

function get_popular_posts($cat_ids, $count = 6){
	$posts = null;

	$meta_query = array(
	'relation' => 'OR',
		array(
			'key' => 'post_count',
			'compare' => 'IN'
		),
		array(
			'key' => 'post_count',
			'compare' => 'NOT IN'
		)
	);

	$args = array(
		'posts_per_page' => $count,
		'cat' => implode(",", $cat_ids),
		//'meta_query' => $meta_query,
		'meta_key' => 'post_count',
		'orderby' => 'meta_value_num',
		'numberposts' => $count,
	);
	$posts = get_posts($args);
	$popular = array();
	foreach($posts as $post_object){
		//Image fallback
		$image = wp_get_attachment_image_src(get_field('post_thumb', $post_object->ID), 'thumb-100');
		$post_details = array(
			'post_id'           => $post_object->ID,
			'thumbnail_image'   => $image,
			'post_href'         => get_permalink($post_object->ID),
			'post_short_title'  => get_rea_post_short_title($post_object->ID),
			'post_full_title'   => get_the_title($post_object->ID),
			'post_author'       => $post_object->post_author,
			'post_views'        => get_field('post_count', $post_object->ID)
		);
		array_push($popular, $post_details);
	}

	return $popular;
}

function get_recent_posts($cat_ids, $count = 6, $children = false){
	global $post;
	$posts = null;

	if($children){
		$key = 'cat';
	}else{
		$key = 'category__in';
	}

	$posts = get_posts(array(
		'posts_per_page' => $count,
		$key => $cat_ids,
		'orderby' => 'date',
		'numberposts'=> $count
	));
	$date = array();
	foreach($posts as $post_object){

		$video = get_field('video_id', $post_object->ID);
		if($video){ $valid_video = true; }else{ $valid_video = false; }

		//Image fallback
		$image = wp_get_attachment_image_src(get_field('post_thumb', $post_object->ID), 'thumb-100');
		$post_details = array(
			'post_id'           => $post_object->ID,
			'thumbnail_image'   => $image,
			'post_href'         => get_permalink($post_object->ID),
			'post_short_title'  => get_rea_post_short_title($post_object->ID),
			'post_full_title'   => get_the_title($post_object->ID),
			'post_author'       => $post_object->post_author,
			'video'             => $valid_video
		);
		array_push($date, $post_details);
	}
	return $date;
}

function rea_sidebar_tabs(){
	global $post;
	$category = get_the_category($post->ID);
	$cat_ids = array();
	foreach($category as $cat){
		array_push($cat_ids, $cat->term_id);
	}
	$popular = get_popular_posts($cat_ids);
	$recent = get_recent_posts($cat_ids);
	include(locate_template('partials/tab-module.php'));
}

function rea_get_HTML( $field = 'sidebar-snippet', $pID = 'undefined' ){

	$obj = get_queried_object();

	if($pID == 'undefined' && isset($obj)) {
		if($obj->term_id){
			$pID = 'category_' . $obj->term_id ;
		}else{
			$pID = $obj->ID;
		}
	}

	$rows = get_field($field, $pID);
	$output = '';

	if($rows){

		foreach($rows as $row){

			$output .= $row['html_snippet'];

		}

		return $output;

	}

}

/*********************
REA Brightcove video Module
 *********************/

function video_duration($milliseconds){

	$seconds = floor($milliseconds / 1000);
	$minutes = floor($seconds / 60);
	$hours = floor($minutes / 60);
	$milliseconds = $milliseconds % 1000;
	$seconds = $seconds % 60;
	$minutes = $minutes % 60;

	$format = '%2u:%02u';
	$time = sprintf($format,$minutes, $seconds);
	return rtrim($time, '0');

}

function brightcove_token() {

	$data = array();

	$client_id = 'c9dff608-f824-449e-a9d1-64919b6c849c';
	$client_secret = '624Q4cw-C4zUFPgjeQGL1PGsDu-xLMp3YxLEv3sgUx4X1_r7mT85R6NbeTcWapi4Xev56GXLENSloJcZbpEsSw';
	$auth_string = "{$client_id}:{$client_secret}";

	$request = "https://oauth.brightcove.com/v3/access_token?grant_type=client_credentials";

	$curl = curl_init($request);

	curl_setopt_array($curl, array(
		CURLOPT_POST => TRUE,
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_SSL_VERIFYPEER => FALSE,
		CURLOPT_USERPWD => $auth_string,
		CURLOPT_HTTPHEADER => array('Content-type: application/x-www-form-urlencoded'),
		CURLOPT_POSTFIELDS => $data
	));

	$response = curl_exec($curl);
	curl_close($curl);

	// Check for errors
	if ($response === FALSE) {
		die(curl_error($curl));
	} else {
		$response = json_decode($response, TRUE);
		return $response["access_token"];
	}

}

function brightcove_get_video($access_token, $video_id) {

	$request = 'https://cms.api.brightcove.com/v1/accounts/4342645250001/videos/' . $video_id;

	// Get cURL resource
	$curl = curl_init($request);

	curl_setopt_array($curl, array(
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array('Authorization: Bearer '. $access_token)
	));

	$response = curl_exec($curl);
	curl_close($curl);

	// Check for errors
	if ($response === FALSE) { die(curl_error($curl)); }
	else {
		$response = json_decode($response, TRUE);
		return $response;
	}

}

function brightcove_get_videos($access_token) {

	$request = 'https://cms.api.brightcove.com/v1/accounts/4342645250001/videos';

	// Get cURL resource
	$curl = curl_init($request);

	curl_setopt_array($curl, array(
		CURLOPT_RETURNTRANSFER => TRUE,
		CURLOPT_HTTPHEADER => array('Authorization: Bearer '. $access_token)
	));

	$response = curl_exec($curl);
	curl_close($curl);

	// Check for errors
	if ($response === FALSE) { die(curl_error($curl)); }
	else {
		$response = json_decode($response, TRUE);
		return $response;
	}

}

function get_recent_video_posts($count = 10, $children = false) {

	global $post;
	$posts = null;
	$access_token = brightcove_token();

	// args
	$args = array(
		'numberposts' => -1,
		'post_type' => 'post',
		'meta_key' => 'video_id'
	);

	// query
	$query = new WP_Query($args);
	$videos = array();

	foreach($query->posts as $post_object) {

		$video_id = get_field('video_id', $post_object->ID);

		if($video_id){
		//Image fallback
		$image = wp_get_attachment_image_src(get_field('post_thumb', $post_object->ID), 'rea-post-thumbnail');


		$post_details = array(
			'post_id' => $post_object->ID,
			'thumbnail_image' => $image,
			'post_href' => get_permalink($post_object->ID), 'post_short_title' => get_rea_post_short_title($post_object->ID),
			'post_full_title' => get_the_title($post_object->ID),
			'post_author' => $post_object->post_author,
			'post_views' => get_field('post_count', $post_object->ID),
			'video_id' => get_field('video_id', $post_object->ID),
			'video_data' => brightcove_get_video($access_token, $video_id)
		);

		array_push($videos, $post_details);

		}

	}

	include(locate_template('partials/video-post-list.php'));

}

function get_recent_videos($count = 10, $children = false) {

	global $post;
	$posts = null;
	$access_token = brightcove_token();

	// args
	$args = array(
		'numberposts' => -1,
		'post_type' => 'post',
		'meta_key' => 'video_id'
	);

	// query
	$query = new WP_Query($args);
	$videos = brightcove_get_videos($access_token);

	include(locate_template('partials/video-list.php'));

}

/*********************
 Force the post excerpt as description
 *********************/
add_filter('wpseo_metadesc', 'force_excerpt');
function force_excerpt($desc){
	global $post;
	if(  is_singular( 'post') ){
		$desc = null;
		$desc = $post->post_excerpt;
	}
	return $desc;
}

/*********************
 Category / Tag List
 *********************/
function rea_post_list($title){
	$args = array(
		'type'           => 'post',
		'child_of'       => 0,
		'parent'         => '',
		'orderby'        => 'count',
		'pad_counts'     => false,
		'order'          => 'DESC'
	);

	if($title == 'Tags'){
		$list = get_tags( $args );
	}else if($title == 'Topics'){
		$list = get_categories( $args );
	}
	include(locate_template('partials/post-list.php'));
}

function get_rea_top_level_categories() {
	$top_level_categories = array();
	$menu_items = wp_get_nav_menu_items('home-page-categories');
	if ($menu_items) {
		foreach ($menu_items as $menu_item) {
			array_push($top_level_categories, array(
				'title' => $menu_item->title,
				'url'   => $menu_item->url,
				'id'    => $menu_item->object_id
			));
		}
	}
	return $top_level_categories;
}

function get_rea_sponsored_content_categories() {

	$category = get_category_by_slug('super-futures');

	if($category){

	$sponsored_content_categories = array();

	array_push($sponsored_content_categories, array(
		'title' => $category->name,
		'url'   => $category->category_nicename,
		'id'    => $category->cat_ID
	));

	return $sponsored_content_categories;

	}else{ return false; }
}

if ( ! function_exists( 'post_is_in_descendant_category' ) ) {
	function post_is_in_descendant_category( $cats, $_post = null ) {
		foreach ( (array) $cats as $cat ) {
			// get_term_children() accepts integer ID only
			$descendants = get_term_children( (int) $cat, 'category' );
			if ( $descendants && in_category( $descendants, $_post ) )
				return true;
		}
		return false;
	}
}

function rea_post_thumbnail_url() {
	$image = wp_get_attachment_image_src(get_field('post_thumb', get_the_id()), 'rea-post-thumbnail');
	if ($image) {
		echo $image[0];
	} else {
		echo '//s1.rui.au.reastatic.net/rui-static/img/rea-logo-v1.png';
	}
}

function rea_img_tag($image, $alt_text = '', $css_classes = '') {
	echo get_rea_img_tag($image, $alt_text, $css_classes);
}

function get_rea_img_tag($image, $alt_text = '', $css_classes = '') {
	if (empty($image)) {
		return;
	}
	$html  = '<img src="' . $image[0] . '" ';
	$html .=      'width="' . $image[1] . '" ';
	$html .=      'height="' . $image[2] . '" ';
	if ($css_classes) {
		$html .= 'class="' . $css_classes . '" ';
	}
	$html .=      'alt="' . $alt_text.'" title="' . $alt_text . '"/>';
	return $html;
}

/*********************
 Get Connected Brands
 *********************/
function get_connected_brands($postID){

	$post_Obj = get_post($postID);

	$brand = get_posts(array(
		'connected_type' => 'posts_to_brands',
		'connected_items' => $post_Obj->ID,
		'nopaging' => true,
		'suppress_filters' => false
		)
	);

	if(!$brand){
		return false;
	}

	$brand_ID = $brand[0]->ID;
	$brand_name = get_post($brand_ID)->post_title;
	$brand_logo = wp_get_attachment_image_src(get_field('brand_logo', $brand_ID), 'full');
	$alt_brand_logo = wp_get_attachment_image_src(get_field('alternative_brand_logo', $brand_ID), 'full');

	$brand_array = array(
		'brand_name'    =>  $brand_name,
		'brand_id'      =>  $brand_ID,
		'brand_website'      =>  get_field('brand_website', $brand_ID),
		'brand_blurb'      =>  get_field('blurb', $brand_ID),
		'brand_colour'  =>  get_field('brand_colour', $brand_ID),
		'alt_brand_colour'  =>  get_field('alternative_brand_colour', $brand_ID),
		'quote_colour'  =>  get_field('quote_colour', $brand_ID),
	);

	if ($brand_logo) { $brand_array['brand_logo'] = $brand_logo[0]; }
	if ($alt_brand_logo) { $brand_array['alt_brand_logo'] = $alt_brand_logo[0]; }

	return $brand_array;
}

function style_frontpage_branded($postID, $brand_array, $page = 'home'){

	$brand_strip =  '<div style="background-color:'.$brand_array['brand_colour'].';" class="brand-strip '. $page .'"><div class="brand-logo">';

	$brand_strip .= '<img src="'.$brand_array['brand_logo'].'" alt="'.$brand_array['brand_name'].'" />';
	//$brand_strip .= '<p>Brought to you by</p>';
	$brand_strip .= '</div></div>';
	echo $brand_strip;

}

function style_single_branded($postID, $brand_array, $floatDir = 'left'){
	$post_Obj = get_post($postID);

	// If the post has a featured image, add the brand strip

		// Add strip and styling to big image
		$brand_strip =  '<div style="background-color:'.$brand_array['brand_colour'].';" class="brand-strip post">';
		$brand_strip .= '<div class="brand-logo '.$floatDir.'"><img src="'.$brand_array['brand_logo'].'" alt="brand-title logo" /></div>';
		$brand_strip .= '</div>';
		echo $brand_strip;


	$brand_style = '';
	$brand_style .= '<style>';

	//Change blockquote icon colour
	$brand_style .= "\r\n".'.post-content blockquote:before{background-color:'.$brand_array['quote_colour'].';}';

	$brand_style .= '</style>';
	echo $brand_style;
};

function special_nav_class($classes, $item) {
	if ($item->title == "Home") {
		$classes[] = "home";
	}
	return $classes;
}
add_filter('nav_menu_css_class', 'special_nav_class', 10, 2);

function add_menu_parent_class($items) {
	$parents = array();
	foreach ($items as $item) {
		if ($item->menu_item_parent && $item->menu_item_parent > 0) {
			$parents[] = $item->menu_item_parent;
		}
	}

	foreach ($items as $item) {
		if (in_array($item->ID, $parents)) {
			$item->classes[] = 'menu-parent-item';
		}
	}
	return $items;
}
add_filter( 'wp_nav_menu_objects', 'add_menu_parent_class' );


/*********************
 * Advertorial
*********************/
function rea_advertorial($class, $sz, $pos) {

	$ad = array();

	$queried_object = get_queried_object();

	$ad['post_name'] = null;

	$ad['type'] = 'javascript';

	$ad['site'] = 'rea';

	$ad['sz'] = $sz;

	$ad['channel'] = 'blog';

	$ad['pos'] = $pos;

	$ad['auto-hide'] = true;

	$ad['class'] = $class;

	if (is_home()) {
		$ad['sect'] = "homepage";

	} elseif (is_singular()) {
		if ($connected_brands = get_connected_brands($queried_object->ID)) {
			$brand = $connected_brands['brand_name'];
		}

		$ad['author'] = get_the_author_meta('nickname', $queried_object->post_author);
		$ad['brand'] = isset($brand) ? slugify($brand) : "null";
		$ad['sect'] = "postpage";
		$ad['post-name'] = slugify(get_field('short_title', $queried_object->ID));

	} elseif (is_category()) {
		$ad['sect'] = "categorypage";

	} elseif (is_tag()) {
		$ad['tags'] = $queried_object->slug;
		$ad['sect'] = "tagpage";

	} elseif (is_author()) {
		$ad['sect'] = "authorpage";
		$ad['author'] = $queried_object->user_login;

	} else {
		$ad['sect'] = "general";

	}

	include(locate_template('partials/template_parts/advertorial.php'));
}


/*********************
 * Cobranding
 *********************/

function get_cobranding_markup($brand, $section) {
	try {
		$curly = curl_init();
		curl_setopt_array($curly, array(
			CURLOPT_URL => "https://sym.realestate.com.au/services/partials/$brand/production/$section",
			CURLOPT_RETURNTRANSFER => true
		));
		$response = json_decode(curl_exec($curly));
		curl_close($curly);

		return array_shift($response);
	} catch (Exception $e) {
		return "";
	}
}

function get_cobranding() {
	static $cobranding;
	if (isset($cobranding)) return $cobranding;

	if (preg_match("/^yahoo|ebay/", $_SERVER['HTTP_HOST'], $matches)) {
		$subdomain = $matches[0];
		$cobranding = array(
			"subdomain" => $subdomain,
			"header"    => get_cobranding_markup($subdomain, "header"),
			"footer"    => get_cobranding_markup($subdomain, "footer")
		);
	} else {
		$cobranding = null;
	}

	return $cobranding;
}

/*********************
 * Add share HTML to the_content base
 *********************/

function add_base_html($content) {

	global $post;

	$post_date = strtotime( get_the_time('Y-m-d', $post->ID) );
	$cutoff_date = strtotime( '2013-12-03' );

	if($post->post_type == 'post'){

    $base_message = '<div class="social-snippet"><p><em><a href="https://twitter.com/realestate_au" target="_blank" title="Follow realestate.com.au on Twitter">Follow us on Twitter</a> for more news, tips and inspiration. Like us on <a href="https://www.facebook.com/realestateAus" target="_blank" title="Like realestate.com.au on Facebook">Facebook</a> or explore our <a href="http://pinterest.com/realestateau/" target="_blank" title="realestate.com.au on Pinterest">Pinterest boards</a>.</em></p></div>';

		if($post_date > $cutoff_date){

			return $content . $base_message;

		}else{

			return $content;

		}

	};
}

add_filter( 'the_content', 'add_base_html' );


/*********************
 * 'Get what's hot in .... category' for the homepage
 *********************/
function get_featured_categories(){

	//Get Title
	$heading = get_field('feature_heading', 'options');

	if(get_field( 'featured_categories', 'options')){

		$categories = get_field( 'featured_categories', 'options');

		$output = '<ul>';

		foreach($categories as $i=>$cat ){

			$catID = $cat['category'];

			if($cat['posts'] == ''){

				$postList = get_popular_posts( array( $catID ), 3 );

			}else{

				$postList = parse_featured_posts( $cat['posts'] );

			};

			$output .=  get_featured_cat_layout($catID, $postList);

		};

		$output .= '</ul>';

		include(locate_template('partials/featured-categories.php'));

	}

}

/*********************
 * Create an array for our featured posts
********************/
function parse_featured_posts( $posts ){

	$postList = array();

	foreach($posts as $post_object){

		//Image fallback
		$image = wp_get_attachment_image_src(get_field('post_thumb', $post_object->ID), 'rea-post-thumbnail');

		$post_details = array(
			'post_id'           => $post_object->ID,
			'thumbnail_image'   => $image,
			'post_short_title'  => get_rea_post_short_title($post_object->ID),
			'post_href'         => get_permalink($post_object->ID)

		);

		array_push($postList, $post_details);

	}

	return $postList;
}

/*********************
 * Create the layout for each featured category
 *********************/
function get_featured_cat_layout($catID, $posts){

	//Get thumb of first post
	$thumbURL 	= $posts[0]['thumbnail_image'][0];
	$catObj 	= get_category($catID);
	$catName 	= $catObj->name;
	$catLink 	= get_category_link( $catID );

	$output = '<li><a href="' . $catLink . '"><img class="featured-img" src="' . $thumbURL . '" /><div class="catname">' . $catName . '</div></a><ul>';

		foreach($posts as $i => $p){

			$pID  			= $p['post_id'];
			$shortTitle 	= $p['post_short_title'];
			$perma  		= $p['post_href'];

			$output .= '<li><i class="arrow-icon"></i><a href="' . $perma . '">' . $shortTitle . '</a></li>';

		};

	return $output .= '</ul></li>';

};
?>