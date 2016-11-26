<?php
// Sponsored Content
function var_template_include( $t ){
	$GLOBALS['current_theme_template'] = basename($t);
	return $t;
}
add_filter( 'template_include', 'var_template_include', 1000 );

// Template check
function get_current_template( $echo = false ) {
	if( !isset( $GLOBALS['current_theme_template'] ) )
		return false;
	if( $echo )
		echo $GLOBALS['current_theme_template'];
	else
		return $GLOBALS['current_theme_template'];
}

// Child Category Check
function is_child_of_category($category_id, $child_category_id = NULL)
{
	// Load all children of the category
	$children = get_categories('child_of='.$category_id.'&hide_empty=0');

	// Initialize an array for all child IDs
	$children_ids = array();

	// Fill the array just with category IDs
	foreach ($children as $child)
	{
		$children_ids[] = $child->cat_ID;
	}

	// Check whether the given child ID, or the current category, exists within the category
	return ($child_category_id !== NULL)
		? in_array($child_category_id, $children_ids)
		: is_category($children_ids);
}

// Sponsored page check
function sponsored_content_page(){

	$sponsored_content_id = get_category_by_slug('super-futures');
	if($sponsored_content_id) {

	$sponsored_content_id = $sponsored_content_id->term_id;
	$template = get_current_template();

	if( $template === 'single.php'){

		$queried_object = get_queried_object();

		$categories = get_the_category( $queried_object->ID );

		$in_category = false;

		foreach($categories as $category){
			if($sponsored_content_id === $category->term_id){ $in_category = true; }
		}

		if($in_category){ return true; }
		else{ return false; }

	}elseif( $template === 'archive.php' ){

		$queried_object = get_queried_object();

		if($sponsored_content_id === $queried_object->term_id){ return true; }
		else{ return false; }

	}
	 }
}

// eSuper function
function esuperfund_lead_capture(){

	if(!empty($_POST)){

		/** eSuperfund API endpoint */
		$url = 'http://api.esuperfund.com.au/api/publicapi/RegisterInfoPack';

		/** POST data */
		$data = array(
			'Name' => $_POST['name'],
			'Email' => $_POST['email'],
			'Source' => 'RealEstateAus',
			'Campaign' => 'Super Futures'
		);

		/** JSON encode $data */
		$data = json_encode($data);

		/** CURL */
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_USERPWD, "realestateaus:Q~bt0)V68A20Di7");
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Content-Length: ' . strlen($data)));
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
		curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_TIMEOUT, 5);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);

		/** Execute CURL */
		$response = curl_exec($ch);
		$status = curl_getinfo($ch);

		/** Close connection */
		curl_close($ch);

		/** Convert response */
		$response = json_decode($response);
		#print_r($response);
		#die;

		if($response->Message == 'SUCCESS'){

			#echo '<pre>';
			echo json_encode($response);
			#echo '</pre>';
			die;

		}else{

			header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
			echo 'error!';
			die;

		}

	}else{

		header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found");
		echo 'error!';
		die;

	}

}

#add_action( 'wp_ajax_esuperfund_lead_capture', 'esuperfund_lead_capture' );
add_action( 'wp_ajax_nopriv_esuperfund_lead_capture', 'esuperfund_lead_capture' );


// detect user mobile agent
function isMobile() {
  return preg_match("/(android|webos|avantgo|iphone|ipad|ipod|blackberry|iemobile|bolt|boost|cricket|docomo|fone|hiptop|mini|operamini|kitkat|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
}

?>