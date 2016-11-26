<?php
/*
// The Default inner loop for related posts.
*/
    $post_url = get_permalink($post_object->ID);
    $post_title = get_field('short_title', $post_object->ID);
    if (empty($post_title)) {
        $post_title = get_the_title($post_object->ID);
    }
    $post_thumb = NULL;
    $post_thumb_img = get_field('post_thumb', $post_object->ID);
    if (!empty($post_thumb_img)) {
        $post_thumb = wp_get_attachment_image_src($post_thumb_img, 'thumbnail');
        $post_title = wp_trim_words( $post_title, $num_words = 10 );
    }
?>
<article class="related-post">
    <a href="<?php echo $post_url ?>" title="Go to <?php echo $post_title; ?>" onclick="_gaq.push(['_trackEvent', 'Related posts panel', 'Click', 'Related Post <?php echo $index + 1 ?>']);">
        <?php if(isset($post_thumb)) : ?>
          <img src="<?php echo $post_thumb[0]; ?>" width="<?php echo $post_thumb[1]; ?>" height="<?php echo $post_thumb[2]; ?>" alt="<?php echo $post_title; ?>"/>
        <?php endif; ?>
        <div class="details">
          <p class="related-title"><?php echo $post_title; ?></p>
        </div>
    </a>
</article>
