<?php // block for featured articles and feed  ?>

<section class="sponsored-category-block" style="background-color: <?php the_sub_field('background_colour'); ?>;">
  <div class="rui-grid category-block rui-clearfix" itemscope itemtype="http://schema.org/Article">

  <?php $feed_type = get_sub_field('feed_type'); ?>

  <h2><?php the_sub_field('category_heading'); ?></h2>

  <div class="sponsored-by">
		<?php
		$brand_sponsor = get_sub_field('sponsor');
		$brand_logo = wp_get_attachment_image_src(get_field('brand_logo', $brand_sponsor[0]->ID), 'full');
		$alt_brand_logo = wp_get_attachment_image_src(get_field('alternative_brand_logo', $brand_sponsor[0]->ID), 'full');
		?>
		<img class="sponsored-category-logo" src="<?php if(!empty($alt_brand_logo)){ echo $alt_brand_logo[0]; }else{ echo $brand_logo[0]; } ?>" alt=""/>
		<p class="article-summary-category-link">Sponsored By</p>
	</div>

  <div class="rui-clearfix">

    <?php

			// get the curated feed array (array of ID's)
			$curated_posts = get_sub_field('curated_feed');

			// set the args for the curated post
			$args = array(
				'post_type' => 'post',
				'post__in' => $curated_posts,
				'orderby' => 'post__in'
			);

			// new query
			$new_query = new WP_Query( $args );
			$new_query_posts = $new_query->posts;
			$counter = 1;

      foreach ( $new_query_posts as $post ) { ?>

        <section class="cat-column">
          <?php get_template_part('blocks/hub/partials/article-hero'); ?>
        </section>

      <?php  } ?>

    </div>

    <div class="sponsored-footer">
      <?php if(get_sub_field('excerpt')){ ?><h4><?php the_sub_field('excerpt'); ?></h4><?php } ?>
      <?php if(get_sub_field('button_link')){ ?>
        <a href="<?php the_sub_field('button_link'); ?>" class="rui-button-basic-light"><?php the_sub_field('button_text'); ?></a>
      <?php } ?>
    </div>

    <?php wp_reset_postdata(); // rest the $post data ?>

  </div>
</section>
