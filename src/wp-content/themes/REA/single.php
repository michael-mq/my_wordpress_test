<?php get_header(); ?>

<?php if (have_posts()) :
    while (have_posts()) : the_post();

      set_post_views(get_the_ID());
      get_template_part('partials/template_parts/breadcrumbs', 'breadcrumbs');

      ?>
      <div class="rui-discover-section">

        <?php $prev_post = get_adjacent_post(false, '', true); ?>
        <?php $next_post = get_adjacent_post(false, '', false); ?>

        <ul class="posts-nav-link">
          <?php if($prev_post){ ?>
            <li>
              <a href="<?php echo get_permalink($prev_post->ID); ?>">
                <i class="rui-icon rui-icon-arrow-left"></i>
                <p>Previous:</p> <span><?php echo substr($prev_post->post_title, 0, 50); ?>...</span>
              </a>
            </li>
          <?php
            }
            if($next_post) {
          ?>
            <li>
              <a href="<?php echo get_permalink($next_post->ID); ?>">
                <i class="rui-icon rui-icon-arrow-right"></i>
               <p>Next:</p> <span><?php echo substr($next_post->post_title, 0, 50); ?>...</span>
              </a>
            </li>
          <?php } ?>
        </ul>

        <div class="rui-visuallyhidden">
          <div itemprop="publisher">realestate.com.au</div>
          <div itemprop="headline"><?php echo rea_excerpt($post->post_id); ?></div>
          <div itemprop=""></div>
        </div>

        <div class="rui-grid rui-grid-advanced-mobile-bleed rui-clearfix column-container" itemscope itemtype="http://schema.org/Article">

          <header class="header-wrapper">
            <h1 itemprop="name"><?php the_title(); ?></h1>
            <div class="post-meta rui-clearfix">
              <div class="author">
                <?php rea_short_author_panel($post->post_author, $post->ID); ?>
              </div>
              <?php
              $publisher_name = get_field('publisher_name');

              if ($publisher_name) {
                $json_file = file_get_contents(get_stylesheet_directory()."/library/data/mapping_publisher.json");
                $json_obj = json_decode($json_file, true);
                $found_url = $json_obj[strtolower($publisher_name)];
                if (!$found_url) {
                  reset($json_obj["default"]);
                  $key_default = key($json_obj["default"]);
                  $publisher_name = $key_default;
                  $publisher_url = $json_obj["default"][$key_default];
              ?>
                  <aside class="news-masthead">
                    <span><?php echo $publisher_name; ?></span>
                  </aside>
              <?php
                } else {
                  $publisher_url = $found_url;
              ?>
                  <aside class="news-masthead">
                    <a href="<?php echo $publisher_url; ?>" title="Return to <?php echo $publisher_name; ?>" target="_blank">
                      <?php echo $publisher_name; ?>
                    </a>
                  </aside>
              <?php
                }
              }
              ?>

              <?php
                //Check for connected brands
                $connected_brand = get_connected_brands(get_the_ID());

                if($connected_brand){ style_single_branded(get_the_ID(), $connected_brand, $floatDir = 'left'); }
              ?>

              <?php get_template_part('partials/topic-list'); ?>
            </div>
          </header>

          <div id="rui-main-content" class="primary">
            <div class="main-container">

                <?php if (get_field('video_id')) : ?>
                <div class="video-wrapper lead-video">
                  <iframe src="//players.brightcove.net/4342645250001/default_default/index.html?videoId=<?php echo get_field('video_id'); ?>" width="100%" scrolling="yes" frameborder="0"></iframe>
                </div>
                <?php endif; ?>

                <div class="sharing<?php if (get_field('video_id')) : ?> sharing-video<?php endif; ?> scrollable">
                  <div>Share</div>
                  <ul>
                    <li class="rui-social">
                      <button class="rui-social-link rui-icon rui-icon-facebook"
                          title="Share on Facebook"
                          data-service="facebook"
                          data-show-counter="true">
                        <span class="rui-visuallyhidden">Share on Facebook</span>
                      </button>
                    </li>
                    <li class="rui-social">
                      <button class="rui-social-link rui-icon rui-icon-twitter"
                          title="Tweet this post"
                          data-service="twitter"
                          data-show-counter="true">
                        <span class="rui-visuallyhidden">Tweet this post</span>
                      </button>
                    </li>
                    <li class="rui-social">
                      <button class="rui-social-link rui-icon rui-icon-pinterest"
                          title="Pin this post on Pinterest"
                          data-service="pinterest"
                          data-media="<?php rea_post_thumbnail_url(); ?>"
                          data-show-counter="true">
                        <span class="rui-visuallyhidden">Pin this post on Pinterest</span>
                      </button>
                    </li>
                    <li class="rui-social">
                      <button class="rui-social-link rui-icon rui-icon-googleplus"
                          title="Share this post on Google Plus"
                          data-service="googleplus"
                          data-show-counter="true">
                        <span class="rui-visuallyhidden">Share this post on Google Plus</span>
                      </button>
                    </li>
                    <li class="rui-social">
                      <button class="rui-social-link rui-icon rui-icon-linkedin"
                          title="Share this post on LinkedIn"
                          data-service="linkedin"
                          data-show-counter="true">
                        <span class="rui-visuallyhidden">Share this post on LinkedIn</span>
                      </button>
                    </li>
                  </ul>
                </div>
                <div id="read-more"></div>
                <section class="post-content rui-clearfix">
                  <article itemprop="articleBody" class="article-content">

                    <?php
                    // show the content
                    the_content();
                    ?>

                  </article>

                  <?php get_template_part('partials/topic-list'); ?>

                  <?php
                    //Check for connected brands
                    $connected_brand = get_connected_brands(get_the_ID());

                    if($connected_brand) {
                      echo '<section class="sponsor-author full-author-panel rui-clearfix">';
                      // Branding strip
                      style_single_branded(get_the_ID(), $connected_brand, $floatDir = 'left');
                      // Sponsors author panel
                      rea_short_author_panel($post->post_author, $post->ID);

                      rea_author_panel($template = 'partials/sponsor-author.php', $authorID = get_the_author_meta('ID'));

                      echo '</section>';
                    }
                  ?>

                </section>

            </div><!-- END .main-container -->

          </div><!-- END .rui-grid-primary -->

          <div class="secondary <?php if(!get_field('feature_image')){ echo ' no-featured-image';}?>">
            <?php get_template_part('partials/template_parts/sidebar', 'sidebar');?>
            <div class="sidebar-bg"></div>
          </div>

        </div><!-- end .rui-grid -->
      </div>

      <?php rea_related($post->ID); ?>

      <div class="outbrain-details">
        <?php $image = get_field('post_thumb', $post->ID); ?>
        <div class="outbrain-title"><?php echo get_field('short_title', $post->ID); ?></div>
        <?php echo wp_get_attachment_image( $image ) ?>
      </div>

      <section class="related-container outbrain-container">
        <div class="rui-grid">
          <div class="related-box">
            <div class="OUTBRAIN" data-src="<?php the_permalink($post->ID); ?>"
              data-widget-id="AR_1" data-ob-template="REA" async="async"></div>
            <div class="OUTBRAIN" data-src="<?php the_permalink($post->ID); ?>"
              data-widget-id="AR_2" data-ob-template="REA" async="async"></div>
            <script type="text/javascript" src="//widgets.outbrain.com/outbrain.js"></script>
          </div>
        </div>
      </section>


      <?php
        rea_advertorial("ad-leaderboard", "728x90", "footer");
      ?>

    <?php endwhile; ?>
  <?php endif; ?>
<?php get_footer(); ?>

<?php if(sponsored_content_page()){ ?>
<script type="text/javascript">
  s.pageName = "rea:blog:eSuperfund:<?php echo $post->post_name; ?>";
  s.t(true);
</script>
<?php } ?>
