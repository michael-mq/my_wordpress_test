<?php // if video post, show the video markup, fallback to default 
if(get_field( 'article_type' ) == 'video') { ?>
	
	<article class="hero article-hero article-hero-video">
		<figure>
			<?php if( get_field('video_id')) { ?>
				<iframe width="100%" height="214" src="//players.brightcove.net/4342645250001/default_default/index.html?videoId=<?php the_field('video_id'); ?>" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen=""></iframe>
			<?php } ?>
		</figure>
		<aside>
			<?php
        rea_article_category_link();
        rea_article_title_link();
        rea_article_summary_sponsor();
			?>
		</aside>
	</article>

<?php // else - this is not a video post, try display an image 
} else { ?>

	<article class="hero article-hero">
			<figure>
				<?php // check for image
				if(get_field( 'post_thumb' )) { ?>
					<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
						<img <?php rea_responsive_image(get_field( 'post_thumb' ),'thumb-400','400px'); ?> alt="<?php the_title(); ?>" />
					</a>
				<?php } ?>
			</figure>
		<aside>
			<?php 
			  rea_article_category_link();
			  rea_article_title_link();
			  rea_article_summary_sponsor();
			?>
		</aside>
	
	</article>
	
<?php } ?>