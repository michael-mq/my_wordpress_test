<?php

// [legacy ] Thumbnail sizes
// commented out for now for quick reference
// add_image_size( 'hero-contained', 1010, 360, true );
// add_image_size( 'hero-image', 1400, 450, true );
//
// add_image_size( 'hero', 1200, 768, true );
//
// add_image_size( 'hero-large', 1600, 900, true );
// add_image_size( 'hero-medium', 1200, 800, true );
// add_image_size( 'hero-small', 680, 280, false );
//
// add_image_size( 'small-avatar', 40, 40, true );
add_image_size( 'large-avatar', 120, 120, true );
// add_image_size( 'rea-post-thumbnail', 270, 180, true );

// Add theme support for featured images
add_theme_support( 'post-thumbnails' );

// Register Thumbnail sizes (2016) - resize by width x any height
add_image_size( 'thumb-100', 100);
add_image_size( 'thumb-200', 200);
add_image_size( 'thumb-300', 300);
add_image_size( 'thumb-400', 400);
add_image_size( 'thumb-600', 600);
add_image_size( 'thumb-800', 800);
add_image_size( 'thumb-1200', 1200);
add_image_size( 'thumb-1400', 1400);
add_image_size( 'thumb-2000', 2000);

// Register Crop sizes (2016) - width, height, crop
add_image_size( 'crop-337-667', 375, 667, true );
add_image_size( 'crop-800-600', 800, 600, true );
add_image_size( 'crop-768-1024', 768, 1024, true );
add_image_size( 'crop-1024-768', 1024, 768, true );
add_image_size( 'crop-1400-600', 1400, 600, true );

// Default post thumbnail size (legacy)
set_post_thumbnail_size(125, 125, true);

// Responsive image set max width
function rea_max_srcset_image_width() {
	return 2200;
}
add_filter( 'max_srcset_image_width', 'rea_max_srcset_image_width', 10 , 2 );

// Filter responsive image src set to remove legacy sizes  
function rea_filter_image_srcset( $sources, $size_array, $image_src, $image_meta, $attachment_id ){
	
	// check if the size exists int he array and remove it from the src set 
	if( array_key_exists('180',  $sources ) )  { unset($sources['180']);  }
	if( array_key_exists('768',  $sources ) )  { unset($sources['768']);  }
	if( array_key_exists('1024', $sources ) )  { unset($sources['1024']); }
	if( array_key_exists('680',  $sources ) )  { unset($sources['680']);  }
	if( array_key_exists('640',  $sources ) )  { unset($sources['640']);  }
	
	//return sources with new value
	return $sources;
}

add_filter( 'wp_calculate_image_srcset', 'rea_filter_image_srcset', 10, 5 );

?>