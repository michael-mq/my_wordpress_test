<?php //The root fallback template ?>
<?php get_header(); ?>

    <section class="single-page rui-clearfix">
    
        <div class="rui-grid">
	        
	        <h1><?php the_title(); ?></h1>
	        
	        <?php the_content(); ?>
	        
        </div>
        
    </section>
	 		
<?php get_footer(); ?>
