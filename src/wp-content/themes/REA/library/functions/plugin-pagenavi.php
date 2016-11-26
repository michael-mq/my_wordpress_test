<?php

//customize the PageNavi HTML before it is output
function relpagination($html) {
	$output = '';
	$output = str_replace("class='previouspostslink'","class='previouspostslink' rel='prev'",$html);
	$output = str_replace("class='nextpostslink'","class='nextpostslink' rel='next'",$output);
	return $output;
}
add_filter( 'wp_pagenavi', 'relpagination', 10, 2 );


// function to filter page num link 
function rea_filter_pagenum_link( $link ) {
	
	// set the pattern to double slash  
	$pattern = '/\b\/\//';
	
	// set the replacement to single slash 
	$replacement = '/';	
	
	// replace the pattern in the href attr 
 	$link = preg_replace($pattern, $replacement, $link);
	
	// return the updated link value 
	return $link;

}
add_filter( 'get_pagenum_link', 'rea_filter_pagenum_link' );


?>