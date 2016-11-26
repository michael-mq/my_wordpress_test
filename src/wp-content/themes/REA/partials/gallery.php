<?php
/*
// The Default Layout for image galleries within posts.
*/
?>
<div class="gallery_display">
	<?php $i = 0;
	foreach ($gallery_images as &$galImg):
    	$image = wp_get_attachment_image_src($galImg, 'full'); ?>
    	
    	<img src="<?php echo $image[0]; ?>" title="<?php echo $gallery_captions[$i]; ?>" alt="<?php echo $gallery_captions[$i]; ?>" />
    	
    	<?php $i++;
    endforeach;
    unset($galImg);?>
</div>