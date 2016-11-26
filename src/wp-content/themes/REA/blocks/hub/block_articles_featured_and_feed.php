<?php // block for featured articles and feed  ?>

<main class="hero-content rui-grid rui-clearfix">

  <section id="rui-main-content" class="rui-grid-primary featured-articles-block" itemscope itemtype="http://schema.org/Article">

	<section class="features column rui-clearfix">
		<div class="column-wrap">

		<?php // custom relationship query for featured articles
		$posts_array = get_sub_field('featured_articles');

		// setup array of loaded articles (used to ensure posts are not shown twice later on)
		$loaded_posts = get_sub_field('featured_articles');

		// setup a counter for featured articles
		$count_featured_articles = 0;

		//args
		$args = array(
			'post_type' => 'post',
			'post__in' => $posts_array,
			'orderby' => 'post__in',
		);

		// new query
		$new_query = new WP_Query( $args );
		$new_query_posts = $new_query->posts;
		foreach ( $new_query_posts as $post ) {

			// increase counter
			$count_featured_articles++;

			// the first featured article has special hero markup, fall back to sub hero
			if($count_featured_articles == '1') { get_template_part('blocks/hub/partials/article-hero');
			} else { get_template_part('blocks/hub/partials/article-subhero'); }
		}

		// rest the $post data
		wp_reset_postdata();
		?>
		</div>
	</section>



  <section class="feed column">
    <div class="column-wrap">
      <h3 class="mobile-heading">Latest property news</h3>

		<?php
		// get feed type (curated or auto)
		$feed_type = get_sub_field('feed_type');

		// if feed type is curated, show that list
		if($feed_type === 'curated') {

			// get the array of curated posts (up to 7)
			$curated_feed_posts = get_sub_field('curated_feed');

			// setup the args for the curated feed
			$args = array(
				'post_type' => 'post',
				'post__in' => $curated_feed_posts,
				'posts_per_page' => '7',
				'orderby' => 'post__in',
			);

		// else if the feed type is category
		}elseif ($feed_type == 'category') {

			// get the category ID
			$category_id = get_sub_field('category_id');

			// set the args for the category query
			$args = array(
				'post_type' => 'post',
				'cat' => $category_id,
				'post__not_in' => $loaded_posts,
				'posts_per_page' => '7',
				'orderby' => 'date',
				'order' => 'DESC'
			);

		} else {

			// set args for fallback feed
			$args = array(
				'post_type' => 'post',
				'post__not_in' => $loaded_posts,
				'posts_per_page' => '7',
				'orderby' => 'date',
				'order' => 'DESC'
			);

		}

		// new query
		$new_query = new WP_Query( $args );
		$new_query_posts = $new_query->posts;
		foreach ( $new_query_posts as $post ) { get_template_part('blocks/hub/partials/article-small'); }
		?>

	  </div>
	</section>


</section>


<section class="rui-grid-secondary">
	<?php // REA advert
    rea_advertorial("ad-halfpage", "300x600", "medrec1");
	?>

  <article class="tablet-content">
    <strong class="rui-icon rui-icon-link">Quick links</strong>
    <ul class="quick-links">
      <li><a href="/advice/buying/" title="Buying">Buying guide</a></li>
      <li><a href="/advice/selling/" title="Selling">Selling guide</a></li>
      <li><a href="/advice/renting/" title="Renting">Renting guide</a></li>
      <li><a href="/advice/sharing/" title="Sharing">Sharing guide</a></li>
      <li><a href="/advice/investing/" title="Investing">Investing</a></li>
      <li><a href="/advice/renovating/" title="Renovating">Renovating</a></li>
      <li><a href="/lifestyle/dream-homes/" title="Dream homes">Dream homes</a></li>
      <li><a href="/advice/finance/" title="Finance">Finance guide</a></li>
      <li><a href="/advice/building/" title="Building">Building a home</a></li>
      <li><a href="/news/quirky/" title="Quirky">Quirky news</a></li>
    </ul>
  </article>

  <?php // REA advert mobile
    rea_advertorial("ad-medrec-mobile", "300x250", "medrec1"); // TODO: Change to medrec1 when campaign is ready
	?>

  <?php  // REA advert tablet
    rea_advertorial("ad-medrec-tablet", "300x250", "medrec2");
	 ?>
</section>

</main>
