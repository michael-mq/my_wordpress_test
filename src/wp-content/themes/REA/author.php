<?php get_header(); ?>
    <?php get_template_part('partials/template_parts/breadcrumbs', 'breadcrumbs'); ?>
    <section class="author-posts rui-clearfix">

        <?php
            $queried_object = get_queried_object();
            rea_author_panel($template = 'partials/feature-author.php', $queried_object->data->ID);
        ?>

        <div class="rui-grid">
            <div id="rui-main-content" class="rui-grid-primary">

                <h1 class="rui-brand-heading"><?php

                $author_name = $queried_object->data->display_name;
                echo 'Posts by ' . $author_name;
                ?></h1>

                <?php rea_posts($templateDir = 'partials/category-loop.php'); ?>
                <?php wp_pagenavi(); ?>
            </div>
            <div class="rui-grid-secondary">
                <?php get_template_part('partials/template_parts/sidebar', 'sidebar');?>
            </div>
        </div>
    </section>
<?php get_footer(); ?>
