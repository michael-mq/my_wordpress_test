<article class="rui-clearfix article-small">
		<figure>
			<?php // check for thumbnail image 
			if(get_field( 'post_thumb' )) { ?>
				<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
					<img <?php rea_responsive_image(get_field( 'post_thumb' ),'thumb-200','200px'); ?> alt="<?php the_title(); ?>" />
				</a>
			<?php } ?>
		</figure>
		
		<?php rea_article_title_link(); ?>
		<?php rea_article_category_link(); ?>
		<?php rea_article_summary_sponsor(); ?>
		
</article>