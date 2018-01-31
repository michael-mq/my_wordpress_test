<?php
get_header();
?>
<div class="category-page">
  <header class="cateogry-header">
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2">
          <h1><?php echo single_cat_title(); ?></h1>
          <hr/>
          <p>
            <?php echo category_description(); ?>
          </p>
        </div>
      </div>
    </div>
  </header>

  <section class="category-body">
    <div class="wrapper">
      <div class="article-list container-fluid">

        <?php
        if (have_posts()) :
          while (have_posts()) :
            the_post();
            include(locate_template('templates/partials/category-loop.php'));
          endwhile;
        endif;

        if (function_exists('wp_pagenavi')){
          wp_pagenavi();
        }
        ?>

      </div>
      <div class="sidebar">
        <img src="https://creative.mathads.com/0001/d2/61/d2/6d/f30f11bba6493605e69abf9e1ac5628f.jpg" alt="" />
      </div>
    </div>
  </section>
</div>
<?php
get_footer();
?>
