<?php // custom filter for post gallery
add_filter('post_gallery','rea_custom_gallery',10,2);

function rea_custom_gallery($string,$attr){

	// fetch the images
	$images = get_posts(array('include' => $attr['ids'],'post_type' => 'attachment', 'order'=> 'ASC'));

	// start an image list
	$image_list = '';

	// count the total number of images in our array
	$image_total = count($images);

	// define the content directory
	$content_dir = content_url().'/';

	$output = '<div class="media-viewer-container"><div class="media-viewer">';

	foreach( $images as $image ):

		$image_caption = $image->post_excerpt;

		$image_1_array = wp_get_attachment_image_src($image->ID, 'thumb-400');
		$image_2_array = wp_get_attachment_image_src($image->ID, 'thumb-800');
		$image_3_array = wp_get_attachment_image_src($image->ID, 'thumb-1200');

    $image_1_data = array("source" => $image_1_array[0], "width" => $image_1_array[1], "height" => $image_1_array[2], "caption" => $image_caption);
    $image_2_data = array("source" => $image_2_array[0], "width" => $image_2_array[1], "height" => $image_2_array[2], "caption" => $image_caption);
    $image_3_data = array("source" => $image_3_array[0], "width" => $image_3_array[1], "height" => $image_3_array[2], "caption" => $image_caption);

    $json_image_data = htmlspecialchars(json_encode(array($image_1_data, $image_2_data, $image_3_data)), ENT_QUOTES, "UTF-8");

		// start the output buffer
		ob_start(); ?>

			<div class="gallery-item">
				<div class="wp-image" data-images="<?php echo $json_image_data; ?>">
        </div>
			</div>

			<?php
			// add the output buffer to the output variable
			$output = $output.ob_get_clean();

	// end for each image
	endforeach;

	// end the output
	$output = $output.'</div></div>';

	// return the output
	return $output;
}
?>