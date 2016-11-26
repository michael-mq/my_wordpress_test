<?php // block for featured articles and feed  ?>

<div class="rui-grid rui-clearfix">
  <section class="category-block" itemscope itemtype="http://schema.org/Article">


	<?php

	$feed_type = get_sub_field('feed_type');

	if($feed_type === 'category') { $category_id = get_sub_field('category_id'); ?>

		<?php

		$brand_sponsor = get_field('brand_sponsor', 'category_' . $category_id); #print_r($brand_sponsor);
		$brand_logo = wp_get_attachment_image_src(get_field('brand_logo', $brand_sponsor), 'full');

		?>

		<h2>
			<a href="<?php echo get_category_link($category_id); ?>"><?php the_sub_field('category_heading'); ?></a>
			<?php if($brand_sponsor){ ?><img class="sponsored-category-logo" style="float: right; width: 100px;" src="<?php echo $brand_logo[0]; ?>" alt=""/><?php } ?>
		</h2>

	<?php }else{ ?>
		<h2><?php the_sub_field('category_heading'); ?></h2>
	<?php } ?>





    <!-- first column - hero block -->
		<section class="cat-column">

			<?php // get the hero article 
			$post_object = get_sub_field('hero_article');
			
			// as long as we have a hero article,
			if( $post_object ):
				$post = $post_object;
				$hero_post = $post;

				setup_postdata( $post ); 

					// get the template part for a hero article 
					get_template_part('blocks/hub/partials/article-hero');

				// rest the $post data 
				wp_reset_postdata();
			endif;
			?>
		</section>

		<section class="feed">
			<div class="column-wrap column-wrap-2-up">

			<?php
			// Five articles
			// Mobile is a list of all 5
			// iPad shows 4 in list (hide last child)
			// Desktop shows 2 x block & 3 in list (needs a div around the first 2)
			?>

			<?php // custom relationship query for feed of articles
			
			// get the feed type 
			$feed_type = get_sub_field('feed_type');
						
			// if the feed type is category 
			if($feed_type == 'category') { 
				
				// get the category ID 
				$category_id = get_sub_field('category_id');
				
				// set the args for the category query 
				$args = array(
					'post_type' => 'post',
					'cat' => $category_id,
					'post__not_in' => array($hero_post),
					'posts_per_page' => '5',
					'orderby' => 'date',
					'order' => 'DESC'
				);
				
			// if the feed type is category 
			} elseif($feed_type == 'curated') {
				
				// get the curated feed array (array of ID's)
				$curated_posts = get_sub_field('curated_feed');

				// set the args for the curated post 
				$args = array(
					'post_type' => 'post',
					'post__in' => $curated_posts,
					'orderby' => 'post__in'
				);
			
			// if the feed type is not set or is latest 	
			} else {
				
				// default to show the latest 5 post 
				$args = array(
					'post_type' => 'post',
					'posts_per_page' => '5',
					'orderby' => 'date',
					'order' => 'DESC'
				);

			}

			// setup a counter 
			$post_counter = 0;

			// new query
			$new_query = new WP_Query( $args );
			$new_query_posts = $new_query->posts;
			foreach ( $new_query_posts as $post ) {
				
				// get he small template part for the article small  
				get_template_part('blocks/hub/partials/article-small');
				
				// add one to the counter 
				$post_counter++;

				// if our counter is 2, close a div (for breakpoint styles )
				if($post_counter == '2') { 
					
					// close the 2 up div and open a 3 up div 
					echo '</div><div class="column-wrap column-wrap-3-up">';
				
				} // end if 

			} // end for each 

		?>
		</div><!-- end column wrap 3-up -->
		</section>

	</section>
</div>
