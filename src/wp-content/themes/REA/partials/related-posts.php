<section class="related-container rui-clearfix">
  <div class="rui-grid">
    <div class="related-box">
      <h2 class="rui-brand-heading">We thought you'd also like</h2>
      <?php
        foreach ($posts as $index=>$post_object) :
          include(locate_template('partials/related-loop.php'));
        endforeach;
      ?>
    </div>
  </div>
</section>
