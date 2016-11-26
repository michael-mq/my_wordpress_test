<?php
// Image Gallery Shortcode
// [gallery name="the gallery name"]
function rea_gallery($atts){
	extract(shortcode_atts(array(
		'name' => 'none',
	), $atts));

	return map_gallery($name);
	}

add_shortcode( 'reagallery', 'rea_gallery' );

// Map Shortcode to created ACF Gallery
function map_gallery($galID){
	global $post;
	$gallery_names = array();
	if(get_field('gallery', $post->ID)):
	while(has_sub_field('gallery', $post->ID)): ?>

		<?php $gallery_names[] = get_sub_field('gallery_name'); ?>

	<?php endwhile;
	endif;

	foreach ($gallery_names as &$galName) {
		if($galName == $galID){
			return build_gallery($galID);
		}else{
			continue;
		}
	}
	return 'Gallery not found';;
	unset($galName);
}

// Build Gallery Arrays
function build_gallery($subGal){
	global $post;
	$postID = $post->ID;
	$gallery_images = array();
	$gallery_captions = array();

	if(get_field('gallery', $postID)):
		while(has_sub_field('gallery', $postID)):
			if(get_sub_field('gallery_name') == $subGal):
					while( has_sub_field('gallery_images') ): ?>

					<?php $gallery_images[] = get_sub_field('gal_image');
					$gallery_captions[] = get_sub_field('gal_caption'); ?>

					<?php endwhile;
			endif;
		endwhile;
	endif;
	return show_gallery($gallery_images, $gallery_captions);
}

// Show Gallery
function show_gallery($gallery_images, $gallery_captions){
	ob_start();
	include(locate_template('partials/gallery.php'));
	$output_string = ob_get_contents();
	ob_end_clean();
	return $output_string;
}
?>