<?php
// External Contributor Role
add_action('admin_init', 'add_custom_role' );

function add_custom_role() {

	$excontributor = add_role('external-contributor', 'External Contributor',
		array(
		'read' => true, //can read posts
		'edit_posts' => true, //can edit posts
		'delete_posts' => false, //can't delete posts
		)
	);

	if( null !== $excontributor ) { $role = get_role( 'administrator' );}

	$excontributor = get_role('external-contributor'); // Get the Role
	$excontributor->add_cap('level_1'); // Add level 1 for author list

	$brand = add_role('brand', 'Brand',
		array(
			'read' => true, //can read posts
			'edit_posts' => true, //can edit posts
			'delete_posts' => false, //can't delete posts
		)
	);

	if( null !== $brand ) { $role = get_role( 'administrator' );}

	$brand  = get_role('brand'); // Get the Role
	$brand->add_cap('level_1'); // Add level 1 for author list

	$master_editor = get_role('master-editor');
	$master_editor->add_cap('level_1');
	$master_editor->add_cap('export');

}


//External Contributor CSS
function adminCSS() {
   wp_enqueue_style('admincss', get_bloginfo('template_url').'/library/css/admin/admin.css');
   wp_enqueue_script('custom_admin_header', get_bloginfo('template_url').'/library/js/admin/onready.js', array('jquery'));
}
add_action('admin_head', 'adminCSS');


// External Contributor JS
function populate_contributor() {
	wp_enqueue_script('custom_admin_script', get_bloginfo('template_url').'/library/js/admin/admin.js', array('jquery'));
}
add_action('admin_footer', 'populate_contributor');



// Legacy - Hook into the request
add_filter( 'request', 'wp_request' );

function wp_request( $query_vars ){

	if ( array_key_exists( 'author_name', $query_vars ) ) {

		global $wpdb;

		$author_id = $wpdb->get_var($wpdb->prepare( "SELECT user_id FROM {$wpdb->usermeta} WHERE meta_key='nickname' AND meta_value = %s", $query_vars['author_name'] ) );

		if ( $author_id ) {
			$query_vars['author'] = $author_id;
			unset( $query_vars['author_name'] );
		}

	}

	return $query_vars;

}



// Replace standard with nicename
add_filter( 'author_link', 'wp_author_link', 10, 3 );

function wp_author_link( $link, $author_id, $author_nicename ){

	$author_nickname = get_user_meta( $author_id, 'nickname', true );

	if ( $author_nickname ) {

		$link = str_replace( $author_nicename, $author_nickname, $link );

	}

	return $link;

}

// Set user nicename to nickname
add_action( 'user_profile_update_errors', 'wp_username_nickname', 10, 3 );

function wp_username_nickname( &$errors, $update, &$user )
{
	if ( ! empty( $user->nickname ) ) {

		$user->user_nicename = sanitize_title( $slug, $user->display_name );

	}

}

// Author pannel
function rea_short_author_panel($user_id, $post_id = '') {
	echo get_rea_short_author_panel($user_id, $post_id);
}


function get_rea_short_author_panel($user_id, $post_id = '') {

	$connected_brand = get_connected_brands(get_the_ID());
	$author_avatar = wp_get_attachment_image_src(get_field('profile_image', 'user_'.$user_id), 'large-avatar');
	$author_name = get_the_author_meta('display_name', $user_id);
	if( $post_id != '' ) {
		$post_date = get_the_time('d M Y', $post_id);
	} else {
		$post_date = get_the_time('d M Y', $user_id);
	}

	$authPermalink = get_author_posts_url( $user_id );

	$html = '';
	// TODO: Move into a template after refactoring rea_featured_post_carousel()
	if($author_avatar && !$connected_brand) {
		rea_img_tag($author_avatar, $author_name, 'author-avatar');
	}else if(!$author_avatar && !$connected_brand){
		$html .= '<i class="rui-icon rui-icon-user-on author-avatar placeholder"></i>';
	}

	if($connected_brand){ $html .= get_rea_brand_snippet($connected_brand['brand_name'], $authPermalink); }
	else{ $html .= get_rea_author_snippet($author_name, $authPermalink); }

	$html .= '<div class="post-date rui-clearfix">' . $post_date . '</div>';
	return $html;
}

function rea_author_snippet_by_id($user_id) {

	$author_name = get_the_author_meta('display_name', $user_id);
	$authPermalink = get_author_posts_url( $user_id );

	return get_rea_author_snippet($author_name, $authPermalink);
}

function get_rea_brand_snippet($author_name, $authPermalink) {
	$html = '<div class="post-author"><span class="posted-by">presented by</span> <a href="' . $authPermalink . '" class="author-name">' . $author_name . '</a></div>';
	return $html;
}

function get_rea_author_snippet($author_name, $authPermalink) {
	if(trim(strtolower($author_name)) != 'news corp australia'){
		$link = '<a href="' . $authPermalink . '" class="author-name" title="View author profile">' . $author_name . '</a>';
	}
	else{
		$link = '<a class="author-name">' . $author_name . '</a>';
	}
  return '<div class="post-author">' . $link . '</div>';
}

function rea_author_panel($template, $authorID){
	$authPermalink = get_author_posts_url($authorID);
	$authorAvatar = NULL;
	$authorNoFollow = get_field('nofollow', 'user_'.$authorID);
	$authorAvatarImg = get_the_author_meta('profile_image', $authorID);
	if (!empty($authorAvatarImg)) {
		$authorAvatar = wp_get_attachment_image_src($authorAvatarImg, 'large-avatar');
	}
	$authorName = get_the_author_meta('display_name', $authorID);
	$bio = get_the_author_meta('description', $authorID);
	$authArray = get_the_author_meta('social_media_links', $authorID);
	$googleUrl = get_the_author_meta('google_url', $authorID);
	$facebookUrl = get_the_author_meta('facebook_url', $authorID);
	$linkedinUrl = get_the_author_meta('linkedin_url', $authorID);
	$twitterUrl = get_the_author_meta('twitter_url', $authorID);
	$pinterestUrl = get_the_author_meta('pinterest_url', $authorID);
	$authorUrl = get_the_author_meta('user_url', $authorID);

	include(locate_template($template));
};

function author($meta){
	echo $meta;
	return;
}

function author_image($imageSize, $imageID){
	$image = wp_get_attachment_image_src($imageID, $imageSize);
	echo '<img src="'.$image[0].'" alt="author photo" />';
	return;
}
?>
