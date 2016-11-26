<?php //The default page template ?>
<?php get_header(); ?>

    <section class="single-page rui-clearfix">

        <div class="rui-grid">

	        <?php if (have_posts()) : ?>
	       		<?php while (have_posts()) : the_post(); ?>

	        		<h1><?php the_title(); ?></h1>
	        		<?php echo get_the_content(); ?>

	        	<?php endwhile; ?>
	        <?php endif; ?>

        </div>

    </section>

<?php get_footer(); ?>
