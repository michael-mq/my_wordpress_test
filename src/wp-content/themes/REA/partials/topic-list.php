<div class="topics">
    <ul>
    <?php

    foreach (get_the_category() as $category) :

        $advice = get_category_by_slug('advice');
        $advice = $advice->term_id;
        if($category->term_id === $advice){ continue; }
        
        $url = get_category_link($category->term_id);
        $title = esc_attr(sprintf(__("View all posts in %s"), $category->name));
    ?>
        <li><a itemprop="articleSection" href="<?php echo $url ?>" title="<?php echo $title ?>"><?php echo $category->name ?></a></li>
    <?php
    endforeach;

    $post_tags = get_the_tags();

    if ($post_tags) :
        foreach ($post_tags as $tag) :
            $url = get_tag_link($tag->term_id);
            $title = esc_attr(sprintf(__("View all posts in %s"), $tag->name));
        ?>
            <li><a itemprop="keywords" href="<?php echo $url ?>" title="<?php echo $title ?>"><?php echo $tag->name ?></a></li>
        <?php
        endforeach;
    endif;
    ?>
    </ul>
</div>

