<?php if( is_single() ):

	$authorID = $post->post_author;

	// Setup Twitter @ Name
	if( get_field('twitter_url', 'user_' . $authorID) ){

		$twitterUrl = get_field('twitter_url', 'user_' . $authorID);
		preg_match("|https?://(www\.)?twitter\.com/(#!/)?@?([^/]*)|", $twitterUrl, $matches);

		if($matches) {
			$twitter = $matches[3];
		}

	}else{

		$twitter = 'realestate_au';

	}

	// Setup Image URL from post thumbnail
	if( get_field('post_thumb', $post->ID) ){

		$image = wp_get_attachment_image_src( get_field('post_thumb', $post->ID), 'full' );
		$imageURL = $image[0];

	}else{

		// if no thumbnail, get the first image from the post
		ob_start();
		ob_end_clean();
		$output = preg_match_all('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);

		if(isset($matches[1][0])){ 
			$imageURL = $matches[1][0];
		}

	}

?>

<!-- Manual Twitter OG -->
<meta name="twitter:card" content="summary">
<meta name="twitter:domain" content="The realestate.com.au Blog">
<meta name="twitter:site" content="@realestate_au">
<meta name="og:title" content="<?php echo $post->post_title ?>">
<meta name="twitter:url" content="<?php echo get_permalink( $post->ID );  ?>">
<meta name="twitter:creator" content="@<?php echo $twitter ?>">
<meta name="og:image" content="<?php echo $imageURL ?>">

<?php endif; ?>