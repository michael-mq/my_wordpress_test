<ul class="topics">
  <?php
  foreach (get_the_category() as $category) :
  ?>
    <li>
      <a href="<?php echo get_category_link($category->term_id); ?>"
        title="<?php echo esc_attr(sprintf(__("View all posts in %s"), $category->name)); ?>">
        <?php echo $category->name ?>
      </a>
    </li>
  <?php
  endforeach;

  $post_tags = get_the_tags();

  if ($post_tags) :
      foreach ($post_tags as $tag) :
  ?>
      <li>
        <a href="<?php echo get_tag_link($tag->term_id); ?>"
          title="<?php echo esc_attr(sprintf(__("View all posts in %s"), $tag->name)); ?>">
          <?php echo $tag->name; ?>
        </a>
      </li>
      <?php
      endforeach;
  endif;
  ?>
</ul>
