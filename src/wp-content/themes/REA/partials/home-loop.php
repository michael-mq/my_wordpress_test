 <li class="postid-<?php echo $recent_post['post_id']; ?>">
  <a href="<?php echo $recent_post['post_href'] ?>" class="thumbnail">
        <?php
        rea_img_tag($recent_post['thumbnail_image'], $recent_post['post_short_title']);
        $connected_brand = get_connected_brands($recent_post['post_id']);
        if($connected_brand) {
            style_frontpage_branded($recent_post['post_id'], $connected_brand);
        }
        ?>
  </a>
  <div class="content-wrapper">
    <h4>
        <a href="<?php echo $recent_post['post_href'] ?>">
            <?php echo $recent_post['post_short_title']; ?>
        </a>
    </h4>
    <?php echo rea_author_snippet_by_id($recent_post['post_author']); ?>
     <?php if($recent_post['video'] == true){ ?>
        <a class="excerpt-read-more" href="<?php echo $recent_post['post_href'] ?>"><span class="rui-icon rui-icon-play"></span> Watch Video</a>
     <?php }else { ?>
         <a class="excerpt-read-more" href="<?php echo $recent_post['post_href'] ?>">Read More</a>
     <?php } ?>
  </div>
</li>