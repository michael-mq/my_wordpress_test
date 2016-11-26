<?php get_header(); ?>
    <?php get_template_part('partials/template_parts/breadcrumbs', 'breadcrumbs'); ?>
    <section class="search category-posts rui-clearfix">
        <div class="rui-grid">
            <h1 class="rui-brand-heading">Search Results for <?php echo get_search_query(); ?></h1>
            <p class="results-message">We found <span class="post-count"><?php print_r($wp_query->found_posts); ?></span> results that match your search.</p>
        </div>
        <div class="rui-grid">
            <div id="rui-main-content" class="rui-grid-primary">
                <?php
                if ($wp_query->found_posts > 0) :
                    rea_posts($templateDir = 'partials/search-category-loop.php');
                    wp_pagenavi();
                else :
                ?>
                    <p>Sorry, we were unable to find any posts that match your search. Please try searching again.</p>
                    <?php echo get_search_form(false); ?>

                    <h4>Suggestions</h4>
                    <ul class="rui-list">
                        <li>Check that the words are spelt correctly</li>
                        <li>Try different keywords</li>
                        <li>Try more general keywords</li>
                    </ul>
                <?php endif; ?>
            </div>
            <div class="rui-grid-secondary">
                <?php get_template_part('partials/template_parts/sidebar', 'sidebar');?>
            </div>
        </div>
    </section>
<?php get_footer(); ?>
