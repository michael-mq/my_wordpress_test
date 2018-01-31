<?php get_header(); ?>

<div class="article-page">

  <div class="wrapper">
    <ul class="breadcrumbs">
      <?php if (function_exists('bcn_display')) {
            bcn_display();
        } ?>
      <!-- <li>
        <a class="category-link" href="#">
          <span>Category 01</span>
        </a>
      </li>
       &gt;
      <li>
        <a class="category-link" href="#">
          <span>Category 02</span>
        </a>
      </li>
       &gt;
      <li>
        <a class="category-link" href="#">
          <span>Category 03</span>
        </a>
      </li> -->
    </ul>

    <?php
    if (have_posts()) :
      while (have_posts()) :
        the_post();
    ?>
    <header class="article-header">
      <h1><?php the_title(); ?></h1>
      <div class="post-meta">
        <div class="author">
          <!--  TODO: author-avatar-->
          <img src="https://www.realestate.com.au/blog/wp-content/uploads/2015/01/Alice-Bradlye-120x120.jpg" class="author-avatar" alt="Alice Bradley" title="Alice Bradley">
          <div class="post-author">
            <a href="http://lifestyle.news-lifestyle-staging.realestate.com.au/news/author/Alice-Bradley/" class="author-name" title="View author profile"><?php the_author(); ?></a>
          </div>
          <div class="post-date"><?php the_date('d M Y'); ?></div>
        </div>
        <?php include(locate_template('templates/partials/topic-list.php')); ?>
      </div>
    </header>

    <section class="article-body">
        <article class="article-content">
          <?php the_content(); ?>
          <?php include(locate_template('templates/partials/topic-list.php')); ?>
        </article>

      <div class="sidebar">
        <img src="https://creative.mathads.com/0001/d2/61/d2/6d/f30f11bba6493605e69abf9e1ac5628f.jpg" alt="" />
      </div>
    </section>
    <?php
      endwhile;
    endif;
    ?>
</div>

<?php get_footer(); ?>
