<?php redirect_old_domain_to_same_path(); ?>

<?php get_header(); ?>

<?php rea_featured_post_carousel(); ?>

<section class="rui-clearfix stories">
    <div class="rui-grid">
        <h1 class="rui-brand-heading">Top real estate stories</h1>
        <h2 class="category-description">Read the top real estate &amp; finance news, interiors &amp; lifestyle ideas, home DIY &amp; how-to guides</h2>
        <div id="rui-main-content" class="rui-grid-primary">
            <ul class="categories">

                <?php
                 //Create an array of post IDs and ignore posts that have already been displayed on the homepage
                $uniquePosts = array();
                $home_page_categories = get_rea_top_level_categories();
                foreach ($home_page_categories as $category) :
                ?>
                    <li>
                        <h2 class="rui-brand-heading">
                            <a href="<?php echo $category['url']; ?>">
                                <?php echo $category['title']; ?><i class="rui-icon rui-icon-forward"></i>
                            </a>
                        </h2>
                        <ol class="category rui-clearfix">
                            <?php
                            //Get more posts than we need, incase some are duplicates
                            $recent_posts = get_recent_posts($category['id'], 8, $children = true);
                            $i = 0;
                            foreach ($recent_posts as $recent_post) :
                                if (in_array($recent_post['post_id'], $uniquePosts)) {
                                    continue;
                                };
                                if($i < 4){
                                    $i++;
                                    array_push($uniquePosts, $recent_post['post_id']);
                                    include(locate_template('/partials/home-loop.php'));
                                };
                            endforeach; ?>
                        </ol>
                    </li>
                <?php endforeach; ?>

                <?php $sponsored_content_categories = get_rea_sponsored_content_categories(); ?>

                <?php

                if($sponsored_content_categories){
                foreach ($sponsored_content_categories as $category) :
                    ?>
                    <li>
                        <img height="1" width="1" alt="" style="display:none" src="//sasinator.realestate.com.au/rea/adclick/FCID=529729/"/>
                        <h2 class="rui-brand-heading">
                            <a onclick="_gaq.push(['_trackEvent', 'eSuperfund - Homepage', 'Click', 'Category - <?php echo $category['title']; ?>']);" href="<?php echo $category['url']; ?>">
                                <?php echo $category['title']; ?><i class="rui-icon rui-icon-forward"></i>
                            </a>
                        </h2>
                        <ol class="category rui-clearfix">
                            <?php
                            //Get more posts than we need, incase some are duplicates
                            $recent_posts = get_recent_posts($category['id'], 8, $children = true);
                            $i = 0;
                            foreach ($recent_posts as $recent_post) :
                                if($i < 4){
                                    $i++;
                                    array_push($uniquePosts, $recent_post['post_id']);
                                    ?>
                                    <li class="postid-<?php echo $recent_post['post_id']; ?>">
                                        <a onclick="_gaq.push(['_trackEvent', 'eSuperfund - Homepage', 'Click', '<?php echo $recent_post['post_short_title']; ?>']);" href="<?php echo $recent_post['post_href'] ?>" class="thumbnail">
                                            <?php
                                            rea_img_tag($recent_post['thumbnail_image'], $recent_post['post_short_title']);
                                            $connected_brand = get_connected_brands($recent_post['post_id']);
                                            if($connected_brand) { style_frontpage_branded($recent_post['post_id'], $connected_brand); }
                                            ?>
                                        </a>
                                        <div class="content-wrapper">
                                          <h4>
                                            <a onclick="_gaq.push(['_trackEvent', 'eSuperfund - Homepage', 'Click', '<?php echo $recent_post['post_short_title']; ?>']);" href="<?php echo $recent_post['post_href'] ?>">
                                                <?php echo $recent_post['post_short_title']; ?>
                                            </a>

                                          </h4>
                                        <?php echo rea_author_snippet_by_id($recent_post['post_author']); ?>
                                        <?php if($recent_post['video'] == true){ ?>
                                            <a onclick="_gaq.push(['_trackEvent', 'eSuperfund - Homepage', 'Click', '<?php echo $recent_post['post_short_title']; ?>']);" class="excerpt-read-more" href="<?php echo $recent_post['post_href'] ?>"><span class="rui-icon rui-icon-play"></span> Watch Video</a>
                                        <?php }else { ?>
                                            <a onclick="_gaq.push(['_trackEvent', 'eSuperfund - Homepage', 'Click', '<?php echo $recent_post['post_short_title']; ?>']);" class="excerpt-read-more" href="<?php echo $recent_post['post_href'] ?>">Read More</a>
                                        <?php } ?>
                                      </div>
                                    </li>
                                    <?php
                                };
                            endforeach; ?>
                        </ol>
                    </li>
                <?php endforeach;
                }
                ?>

            </ul>
        </div>
        <div class="rui-grid-secondary">
            <?php get_template_part('partials/template_parts/sidebar', 'sidezbar');?>
        </div>
    </div>
    
</section>

<?php get_featured_categories() ?>

<section class="rui-clearfix">
    <div class="OUTBRAIN" data-src="<?php site_url(); ?>" data-widget-id="SF_1" data-ob-template="REA"></div>
    <div class="OUTBRAIN" data-src="<?php site_url(); ?>" data-widget-id="SF_2" data-ob-template="REA"></div>
    <script type="text/javascript" src="//widgets.outbrain.com/outbrain.js"></script>
</section>

<?php get_footer(); ?>
