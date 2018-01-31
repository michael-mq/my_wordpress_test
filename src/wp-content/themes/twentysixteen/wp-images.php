<?php

// `intermediate_image_sizes` defines how uploaded images are resized
// We only need the original image because sharpie will resize on-the-fly
add_filter( 'intermediate_image_sizes', '__return_empty_array', PHP_INT_MAX );

/**
 * Disable the built in responsive image support because we will generate 
 * `srcset` and `sizes` in `the_content` filter later instead
 */

add_filter( 'wp_calculate_image_sizes', '__return_empty_string',  PHP_INT_MAX );
add_filter( 'wp_calculate_image_srcset', '__return_empty_string', PHP_INT_MAX );
remove_filter( 'the_content', 'wp_make_content_images_responsive' );

// Remove `sizes` and `srcset` attributes whenever wp_get_attachment_image() function is called
add_filter( 'wp_get_attachment_image_attributes', function( $attr )
{
    if( isset( $attr['sizes'] ) )
        unset( $attr['sizes'] );

    if( isset( $attr['srcset'] ) )
        unset( $attr['srcset'] );

    return $attr;

 }, PHP_INT_MAX );

/**
 ********* End of Disable responsive image support
 */


 /**
 * Sharpie
 */

// This class should only be used as a helper in this file to encourage the
// already defined convention of globally available functions here acting
// as a public interface for other parts of the codebase to use.
class ReaSharpieImage {
    const DEFAULT_SIZE = '1600x1600';
    const DEFAULT_OPERATIONS = '-fit,progressive';
    const DEFAULT_IMAGE_WIDTHS = array(200, 400, 600, 800, 1000, 1200, 1400, 1600);

    private $src_original;
    private $width;
    private $height;
    private $ratio;
    private $sizes;

    function __construct($src, $width, $height, $sizes){
        if ( !self::rea_sharpie_is_from_rea( $src ) )
            throw new Exception( 'Not From REA' );

        $this->src_original = $src;
        $this->width = $width;
        $this->height = $height;
        // $width and $height might be empty sometimes if they are not specified in <img> tag
        $this->ratio = ( !empty( $width ) && !empty( $height ) ) ? $width / $height : 1;
        $this->sizes = $sizes;
    }

    private function generate_srcset( $sizes, $src ){
        $srcset = '';
        foreach( $sizes as $width => $size_operations ){
            $srcset .= rea_sharpie_replace_image_src( $src, $size_operations ) . ' ' . $width . ', ';
        }
        return rtrim( $srcset, ', ' );
    }

    private function generate_srcset_sizes_by_widths_ratio( $widths, $ratio ){
        $arr_sizes = array();
    
        foreach( $widths as $width ){
            $height = round( $width / $ratio );
            $arr_sizes[$width . 'w'] = $width . 'x' . $height . self::DEFAULT_OPERATIONS;
        }
        return $arr_sizes;
    }

    private static function rea_sharpie_is_from_rea( $src ) {
        // Quick Fix. Only accept image urls with Latin characters because Sharpie does so
        return (preg_match("/^[\w\d\s.,\/:-]*$/", $src)) && (stripos( $src, 'realestate.com.au' ) !== false) && (stripos( $src, '/wp-content/uploads/' ) !== false);
    }

    public static function rea_sharpie_replace_image_src( $src , $size_operations ){
        if( !self::rea_sharpie_is_from_rea( $src ) )
            return $src;
        
        //s3 urls could be either `.../news/wp-content/uploads/...` or `.../blog/wp-content/uploads/...`
        $s3_server_path = '/wp-content/uploads/';
        $sharpie_server = 'https://www.realestate.com.au/blog/images/';
    
        $image_id = explode( $s3_server_path, $src )[1];
    
        return $sharpie_server . $size_operations . '/' . $image_id;
    }

    public function src() {
        return rea_sharpie_replace_image_src( $this->src_original, (( !empty( $this->width ) && !empty( $this->height )) ? ($this->width . 'x' . $this->height) : self::DEFAULT_SIZE ) . self::DEFAULT_OPERATIONS );
    }

    public function srcset() {
        $src_sizes = $this->generate_srcset_sizes_by_widths_ratio( self::DEFAULT_IMAGE_WIDTHS, $this->ratio );
        return $this->generate_srcset( $src_sizes, $this->src_original );
    }

    public function sizes(){
        return is_numeric( $this->sizes ) ? '(max-width: ' . $this->sizes . 'px) 100vw, ' . $this->sizes . 'px' : $this->sizes;
    }
}

// Filter the content by replacing image `src` and adding `srcset` and `sizes`
add_filter( 'the_content', 'rea_sharpie_replace_content', PHP_INT_MAX );

function rea_sharpie_replace_content( $content ){
    if( empty( $content ) )
        return;

    $doc = new DOMDocument();

    // `LIBXML_HTML_NODEFDTD` parameter is used to avoid `<!DOCTYPE` tag from HTML
    // Didn't use `LIBXML_HTML_NOIMPLIED` to avoid <html> and <body> because it will mess up some <div> tags
    $doc->loadHTML( mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NODEFDTD );

    foreach( $doc->getElementsByTagName( 'img' ) as $tag ) {
        $src_original = $tag->getAttribute( 'src' );
        $width = $tag->getAttribute( 'width' );
        $height = $tag->getAttribute( 'height' );

        try{
            $image = new ReaSharpieImage( $src_original, $width, $height, '(max-width: 767px) 100vw, (max-width: 939px) 60vw, (max-width: 1112px) 70vw, 800px' );
            $tag->setAttribute( 'src', $image->src());
            $tag->setAttribute( 'srcset', $image->srcset());
            $tag->setAttribute( 'sizes', $image->sizes());
        } catch( Exception $e){
            continue;
        }
    }

    // Remove automatically added <html> and <body> tags
    return str_ireplace( array('<html>', '</html>', '<body>', '</body>'), array('', '', '', ''), $doc->saveHTML() );
}

// $sizes can be a number of max_width like `400` or string like `(max-width: 200px) 100vw, 200px`
function rea_sharpie_image_attributes( $image_id, $sizes ){
    if( empty( $image_id ) )
        return;

    list($src, $width, $height) = wp_get_attachment_image_src( $image_id, 'full' );

    try{
        $image = new ReaSharpieImage($src, $width, $height, $sizes);
        echo 'src="'. $image->src() . '" sizes="' . $image->sizes() . '"  srcset="'. $image->srcset() .'" ';
    } catch( Exception $e){
        return;
    }
}

function rea_sharpie_replace_image_src( $src , $size_operations ){
    return ReaSharpieImage::rea_sharpie_replace_image_src( $src , $size_operations );
}

/**
 ********* End of Sharpie
 */