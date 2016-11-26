<?php
// Register the short cake style short codes.
add_action( 'init', 'rea_register_shortcodes' );

function rea_register_shortcodes() {

	// This short code is for the Table AU integration  
	add_shortcode( 'tableau', 'tableau_shortcode' );

}

// Register the short code UI for Tableau 
add_action( 'register_shortcode_ui', 'shortcode_ui_tableau' );
function shortcode_ui_tableau() {
	
	$fields = array(
		array(
			'label'  => 'Large Screen URL',
			'attr'   => 'url',
			'type'   => 'text',
		),
		array(
			'label'   => 'Large Screen Height',
			'attr'    => 'height',
			'type'    => 'number',
			'placeholder' => '600'
		),
		array(
			'label'  => 'Small Screen URL',
			'attr'   => 'mobile',
			'type'   => 'text',
		),
		array(
			'label'   => 'Small Screen Height',
			'attr'    => 'mobile_height',
			'type'    => 'number',
			'placeholder' => '600'
		),
	);

	// Define the shortcode UI args 
	$shortcode_ui_args = array(
		'label' => 'TableAU',
		'listItemImage' => 'dashicons-text',
		'post_type' => array( 'post' ),
		'attrs' => $fields
	);

	shortcode_ui_register_for_shortcode( 'tableau', $shortcode_ui_args );
}

// return the tableau short code 
function tableau_shortcode( $atts ) {

	$iframe = '<div class="tableau-container">';
	$iframe .= '<iframe class="tableau-desktop" src="' . $atts['url'] . '?:embed=y&:display_count=yes&:showVizHome=n&:showTabs=n" scrolling="no" width="100%" height="' . $atts['height'] . '" frameborder="0"></iframe>';

	if(isset($atts['mobile'])){ $iframe .= '<iframe class="tableau-mobile" src="' . $atts['mobile'] . '?:embed=y&:display_count=yes&:showVizHome=n&:showTabs=n" scrolling="no" width="100%" height="' . $atts['mobile_height'] . '" frameborder="0"></iframe>'; }
	else { $iframe .= '<iframe class="tableau-mobile" src="' . $atts['url'] . '?:embed=y&:display_count=yes&:showVizHome=n&:showTabs=n" scrolling="no" width="100%" height="' . $atts['height'] . '" frameborder="0"></iframe>'; }

	$iframe .= '<style type="text/css"> .tableau-container { margin: 0 0 30px; } .tableau-mobile { display: none; } @media only screen and (min-width: 300px) and (max-width: 680px) { .tableau-desktop{ display: none; } .tableau-mobile{ display: block!important; } }</style>';

	$iframe .= '</div>';
	
	// setup a preview to be returned in the editor view  
	
	$preview = '<div class="tableau-container" style="background:#f1f1f1; padding:10px;"><p><strong>Tableau Embed </strong>';
	$preview .= '<a href="'.$atts['url'].'" target="_blank">Large Screen</a> | <a href="'.$atts['mobile'].'" target="_blank">Small Screen</a></br>';
	$preview .= '<small>ID: '.substr($atts['url'], strrpos($atts['url'], '/') + 1).'</small></p>';
	$preview .= '</div>';
	
	// if we're in the admin area
	if(is_admin()) { 
		
		// return the preview for editors  
		return $preview;
		
	} else { 
		
		// return the iframe for users 
		return $iframe;
		
	}
}
?>