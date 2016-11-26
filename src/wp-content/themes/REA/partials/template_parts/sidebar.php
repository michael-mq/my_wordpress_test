<?php

global $template;
$page = basename($template);

global $post;
rea_advertorial("ad-halfpage", "300x600", "medrec1");
rea_advertorial("ad-medrec-mobile", "300x250", "medrec1");
?>

<?php

if($page == 'single.php'){

    $brand = connected_brand($post->ID);
    if(!$brand){

    ?>

        <div class="discover-widget tab-module">
            <?php rea_sidebar_tabs(); ?>
        </div>

<?php }} ?>

<?php

if($page == 'category.php'){

    $brand = get_field('brand_sponsor', 'category_' . $cat);
    if(!$brand){

        ?>

        <div class="discover-widget tab-module">
            <?php rea_sidebar_tabs(); ?>
        </div>

<?php }} ?>

<div class="discover-widget list-module">
  <?php
    if (is_home()) { rea_post_list('Topics'); }
    else { rea_post_list('Tags'); };
  ?>
</div>

<?php
   rea_advertorial("ad-medrec--all-devices", "300x250", "medrec2");
?>

<?php echo rea_get_HTML(); ?>
