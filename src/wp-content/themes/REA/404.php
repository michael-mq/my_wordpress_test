<?php redirect_if_old_url(); ?>
<?php get_header(); ?>
        <section class="blog-four fourohbackground">
            <div class="rui-grid rui-clearfix">
              <div class="search-panel">
                <h4>We're really sorry, something's gone a bit wrong. The page you requested can not be found.</h4>
                <?php echo '<div class="searchform">'.get_search_form(false).'</div>'; ?>
                <p>
                  It seems that the page you were trying to reach doesn't exist anymore, or maybe it has just moved.
                  Or maybe, you can't see it because you're a Muggle and not a Wizard.
                </p>
                <p>
                  Anyway, the best thing to do is start again from <a href="<?php bloginfo('url'); ?>">the homepage</a>.
                  Feel free to  <a href="https://about.realestate.com.au/contact-us/" title="Contact us">contact us</a>
                  if the problem persists or if you definitely can't find what your looking for. Thanks very much.
                </p>
              </div>
            </div>
        </section>
<?php get_footer(); ?>
