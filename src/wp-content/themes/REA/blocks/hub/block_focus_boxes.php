	<section class="block-focus-boxes rui-clearfix">

		<?php if( have_rows('focus_items') ): ?>
		<?php while( have_rows('focus_items')): the_row(); ?>
			
			<article class="focus-box">
			  <a href="<?php the_sub_field('button_link'); ?>" title="<?php the_sub_field('description'); ?>">
				<?php
          // check for image
          if(get_sub_field( 'image' )) { ?>
            <img class="focus-box__image" <?php rea_responsive_image(get_sub_field( 'image' ),'thumb-400','400px'); ?> alt="<?php the_sub_field('title'); ?>" />
				  <?php } ?>
					<h3 class="focus-box__title"><?php the_sub_field('title'); ?></h3>
					<p class="focus-box__description"><?php the_sub_field('description'); ?></p>
					<span class="focus-box__link"><?php the_sub_field('button_label'); ?></span>
				</a>
			</article>

		<?php endwhile; ?>
		<?php endif; ?>
		
	</section>