<?php redirect_old_domain_to_same_path(); ?>

<?php get_header(); ?>
    <?php get_template_part('partials/template_parts/breadcrumbs', 'breadcrumbs'); ?>

    <?php
        $queried_object = get_queried_object();
        rea_featured_post_carousel($queried_object->term_id);
    ?>

    <section class="category-posts rui-clearfix">
        <header class="rui-grid rui-clearfix">
            <h1 class="rui-brand-heading"><?php
                echo $queried_object->name;
            ?></h1>

            <?php if(sponsored_content_page()){ ?>
                <img height="1" width="1" alt="" style="display:none" src="http://sasinator.realestate.com.au/rea/adclick/FCID=529842/"/>
                <style type="text/css">
                    .sponsored-presented-by { display: block; height: 50px; width: 320px; margin: 0 auto; }
                    .sponsored-presented-by h2 { float: left; text-align: center; }
                    .sponsored-presented-by img { float: right; margin-top: -5px; }
                    .archive #esuperfund-sidebar-widget { margin-top: 30px!important; }
                    .category-super-futures .category-description p { margin-bottom: 5px; }
                </style>
                <div class="sponsored-presented-by">
                    <h2>Presented by</h2>
                    <img src="/blog/wp-content/uploads/2016/03/esuperfund-black.png" alt=""/>
                </div>
            <?php } ?>

            <?php if($queried_object->description){ ?>
            <h2 class="category-description">
            	<?php echo $queried_object->description; ?>
            </h2>
            <?php } ?>
        </header>
        <div class="rui-grid">
            <div id="rui-main-content" class="rui-grid-primary">
                <?php rea_posts($templateDir = 'partials/category-loop.php'); ?>
                <?php wp_pagenavi(); ?>
            </div>
            <div class="rui-grid-secondary">
                <?php get_template_part('partials/template_parts/sidebar', 'sidebar');?>
            </div>
        </div>
    </section>
<?php get_footer(); ?>
