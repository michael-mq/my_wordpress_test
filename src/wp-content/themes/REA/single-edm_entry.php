<?php

/**
 * Output
 *
 * Basic loop template, prints out the `pre` tags if required
 */

require('./wp-blog-header.php');

if (have_posts()) : ?>

<?php while (have_posts()) : the_post(); ?>

  <?php if (get_field('output_type') && get_field('output_type') == 'expanded') { echo '<pre>'; } ?>

  <?php while (has_sub_field('post_layout')) : ?>
  
  <?php if( get_field('output_type') == 'testing' ){

	  echo '<div class="testing-warning" style="text-align: center; background: red; position: absolute; width: 100%; bottom: 0; height: 20px; padding: 5px 0 8px 0; font-family: Helvetica, Arial, sans-serif; font-size: 18px; color:white;">Testing mode only, switch to Responsys Production Output before sending for publishing</div>';

   }; ?>

   <?php ACF_Layout::render(get_row_layout()); ?>

  <?php endwhile; ?>

  <?php if (get_field('output_type') && get_field('output_type') == 'expanded') { echo '</pre>'; } ?>

<?php endwhile; ?>

<?php endif; ?>
