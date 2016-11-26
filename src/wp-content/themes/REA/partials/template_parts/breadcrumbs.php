<?php // Get Breadcrumbs 
  if(function_exists('yoast_breadcrumb')){ ?>
  <section class="discover-breadcrumbs">
    <div class="rui-grid rui-clearfix">
      <?php yoast_breadcrumb('<p class="breadcrumbs">','</p>'); ?>
    </div>
  </section>
<?php }; ?>
