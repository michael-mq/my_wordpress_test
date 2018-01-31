<article class="row">
  <div class="col-md-4 ">
    <?php the_post_thumbnail(); ?>
  </div>
  <div class="col-md-8">
      <h2>
        <a href="<?php the_permalink(); ?>" title="Read about <?php the_title(); ?>">
          <?php the_title(); ?>
        </a>
      </h2>
      <aside>
        <?php the_date('d M Y'); ?>
      </aside>
      <p>
        <?php
          the_excerpt();
        ?>
      </p>
  </div>
</article>
