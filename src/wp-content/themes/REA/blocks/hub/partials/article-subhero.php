<?php // if video post, show the video markup, fallback to default 
if(get_field( 'article_type' ) == 'video') { ?>
	
	<article class="subhero article-subhero article-subhero-video">
		 <figure>
			<?php if( get_field('video_id')) { ?>
				<iframe width="100%" height="120" src="//players.brightcove.net/4342645250001/default_default/index.html?videoId=<?php the_field('video_id'); ?>" frameborder="0" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen=""></iframe>
			<?php } ?>
		  </figure>
		<aside>
			<?php rea_article_title_link(); ?>
			<?php rea_article_category_link(); ?>
			<?php rea_article_summary_sponsor(); ?>
		</aside>
	</article>

<?php // else - this is not a video post, try display an image  
} else { ?>
	
	<article class="subhero article-subhero">
		<figure>
			<?php // check for image
			if(get_field( 'post_thumb' )) { ?>
				<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
					<img <?php rea_responsive_image(get_field( 'post_thumb' ),'thumb-200','200px'); ?> alt="" />
				</a>
			<?php } ?>
		</figure>
		<aside>
			<?php rea_article_title_link(); ?>
			<?php rea_article_category_link(); ?>
			<?php rea_article_summary_sponsor(); ?>
		</aside>
	</article>

<?php } ?>