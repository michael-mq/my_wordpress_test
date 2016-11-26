<?php // main heading block

// Check if we are on a category
if($cat) { 
	// Set the ACF location to category, to get the values from a category 
	$acf_location = 'category_'.$cat;
} else {
	// Set the ACF location to the page id, to get the values from a page 
	$acf_location = $post->ID;
}

// Set the layout 
$layout = get_field('header_layout',$acf_location);

// If we're a banner / advanced layout  (layout2)
if($layout == 'layout2') { ?>
	
	<header class="main-heading main-heading-banner">		
		
		<?php // get the sponsor id 
		$brand_sponsor_id = get_field('brand_sponsor', $acf_location); 
		
		// get the brand sponsor logo 
		$brand_sponsor_logo = wp_get_attachment_image_src(get_field('brand_logo',$brand_sponsor_id), 'thumb-400');
		
		// get the banner image 
		//$banner = wp_get_attachment_image_src(get_field('image', $acf_location), 'thumb-1400');

		// if we have a banner image 
		if(get_field('image', $acf_location)) { ?>
			<img class="main-heading-banner__image"  <?php rea_responsive_image(get_field( 'image', $acf_location ),'thumb-1400','1400px'); ?> alt="" />
		<?php } ?>

		<div class="main-heading-banner__content">

			<h1><?php the_field('heading', $acf_location); ?></h1>
			<p><?php the_field('description', $acf_location); ?></p>

			<?php if($paged >= 2) { ?>
				<p class="main-heading-banner-page-label"> Page: <?php echo $paged; ?></p>
			<?php } ?>

      <?php if($brand_sponsor_logo) { ?>
        <div class="main-heading-banner-sponsor">
          <small class="main-heading-banner-sponsor-label">Sponsored by</small>
          <img class="main-heading-banner-sponsor-logo" src="<?php echo $brand_sponsor_logo[0]; ?>" alt="Sponsors Logo" />
        </div>
      <?php
			  }
			?>

		</div>
	</header>

<?php // Else - fallback to simple text layout
} else { ?>

	<header class="main-heading">
		<h1><?php the_field('heading', $acf_location); ?></h1>
		<p><?php the_field('description', $acf_location); ?></p>
	</header>

<?php } ?>