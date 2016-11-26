<?php /* Template Name: Sponsored Content */ ?>

<?php get_header(); ?>

<?php if (have_posts()) :
	while (have_posts()) : the_post();

		set_post_views(get_the_ID());
		get_template_part('partials/template_parts/breadcrumbs', 'breadcrumbs');

		// Get Featured Image
		if (get_field('feature_image')) :
			$attachment_id = get_field('feature_image');
			$hero = wp_get_attachment_image_src( $attachment_id, 'hero-image');
			?>
			<div class="discover-hero-panel">
				<img src="<?php echo $hero[0]; ?>" alt="<?php the_title();?>"/>
			</div>
		<?php endif; ?>

		<?php
		//Check for connected brands
		$connected_brand = get_connected_brands(get_the_ID());

		if($connected_brand){
			style_single_branded(get_the_ID(), $connected_brand, $floatDir = 'left');
		}
		?>
		<div class="rui-discover-section">

			<?php $prev_post = get_adjacent_post(false, '', true); ?>
			<?php $next_post = get_adjacent_post(false, '', false); ?>

			<ul class="posts-nav-link">
				<?php if($prev_post){ ?><li><a href="<?php echo $prev_post->guid; ?>"><i></i><p>Previous:</p><span><?php echo substr($prev_post->post_title, 0, 50); ?>...</span></a></li><?php } ?>
				<?php if($next_post){ ?><li><a href="<?php echo $next_post->guid; ?>"><i></i><p>Next:</p><span><?php echo substr($next_post->post_title, 0, 50); ?>...</span></a></li><?php } ?>
			</ul>

			<div class="rui-visuallyhidden">
				<div itemprop="publisher">realestate.com.au</div>
				<div itemprop="headline"><?php echo rea_excerpt($post->post_id); ?></div>
				<div itemprop=""></div>

			</div>

			<div class="rui-grid rui-clearfix">
				<div id="rui-main-content" class="rui-grid-primary">
					<div class="main-container" itemscope itemtype="http://schema.org/Article">

						<h1><?php $brand = get_field('brand'); print_r($brand[0]->ID); ?></h1>

						<?php $image = wp_get_attachment_image_src(get_field('brand_logo', $brand[0]->ID), 'full'); ?>
						<img src="<?php echo $image[0]; ?>" />

					</div><!-- END .main-container -->

					<?php rea_related($post->ID); ?>

					<div class="outbrain-details">
						<?php $image = get_field('post_thumb', $post->ID); ?>
						<div class="outbrain-title"><?php echo get_field('short_title', $post->ID); ?></div>
						<?php echo wp_get_attachment_image( $image ) ?>
					</div>

					<section class="related-container outbrain-container">
						<div class="OUTBRAIN" data-src="<?php the_permalink($post->ID); ?>" data-widget-id="AR_1" data-ob-template="REA" async="async"></div>
						<div class="OUTBRAIN" data-src="<?php the_permalink($post->ID); ?>" data-widget-id="AR_2" data-ob-template="REA" async="async"></div>
						<script type="text/javascript" src="//widgets.outbrain.com/outbrain.js"></script>
					</section>

				</div><!-- END .rui-grid-primary -->

				<div class="rui-grid-secondary <?php if(get_field('feature_image')){ echo 'following-hero';}?>">
					<?php get_template_part('partials/template_parts/sidebar', 'sidebar');?>
					<div class="sidebar-bg"></div>
				</div><!-- END .rui-grid-secondary -->

			</div><!-- END .rui-grid -->
		</div>

	<?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>
