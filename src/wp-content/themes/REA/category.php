<?php // news category archive

// get wp header
get_header();

// get current pagination count
$current_page = $paged;

// get the main heading
get_template_part('blocks/hub/block_main_heading');

// get the category sub navigation
get_template_part('blocks/hub/block_category_sub_nav');

// if we're on the first page & the blocks are not empty
if($current_page === 0 & have_rows('content_blocks', 'category_'.$cat)) {

	// counter
	$counter = 0;

	// Looping over the ACF flexible fields on this page and render component
	while (the_flexible_field('content_blocks','category_' . $cat)) {

		get_template_part('blocks/hub/'. get_row_layout());

		if($counter == 1){

      // billboard ad placement after first category block
      rea_advertorial("ad-billboard", "970x250", "billboard");
		}

		if($counter == 2){
      rea_advertorial("ad-medrec-mobile", "300x250", "medrec2");
		}

		++$counter;
	}

  // footer ad placement
  rea_advertorial("ad-leaderboard", "728x90", "footer");

	// echo the pagination
	wp_pagenavi();

// else show the default layout
} else { ?>

	<main class="category-content">

		<div class="rui-grid rui-grid-advanced-mobile-bleed rui-clearfix">

			<?php if(have_rows('focus_boxes', 'category_'.$cat)){

				// Looping over the ACF flexible fields on this page and render component
				while (the_flexible_field('focus_boxes','category_' . $cat)) {
					get_template_part('blocks/hub/'. get_row_layout());
				}

			} ?>

			<div id="rui-main-content" class="rui-grid-primary col-category-list">
				<?php rea_posts($templateDir = 'partials/category-loop.php'); ?>
				<?php wp_pagenavi(); ?>
			</div>

			<div class="rui-grid-secondary col-category-sidebar">
				<?php get_template_part('partials/template_parts/sidebar', 'sidebar');?>
			</div>
		</div>
    <?php
      rea_advertorial("ad-leaderboard", "728x90", "footer");
    ?> 
	</main>

<?php }


// get wp footer
get_footer();
?>
