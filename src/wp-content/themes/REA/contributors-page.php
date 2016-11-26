<?php
	/*
	Template Name: Contributors Page
	*/
?>
<?php redirect_old_domain_to_same_path(); ?>

<?php get_header(); ?>

<section class="rui-clearfix">

    <div class="rui-grid contributors-page">

        <h1 class="rui-brand-heading centered"><?php the_title();?></h1>

		<ul class="alphabet">
			<li class="enabled"><a href="#">all</a></li>
			<li><a href="#">a</a></li>
			<li><a href="#">b</a></li>
			<li><a href="#">c</a></li>
			<li><a href="#">d</a></li>
			<li><a href="#">e</a></li>
			<li><a href="#">f</a></li>
			<li><a href="#">g</a></li>
			<li><a href="#">h</a></li>
			<li><a href="#">i</a></li>
			<li><a href="#">j</a></li>
			<li><a href="#">k</a></li>
			<li><a href="#">l</a></li>
			<li><a href="#">m</a></li>
			<li><a href="#">n</a></li>
			<li><a href="#">o</a></li>
			<li><a href="#">p</a></li>
			<li><a href="#">q</a></li>
			<li><a href="#">r</a></li>
			<li><a href="#">S</a></li>
			<li><a href="#">t</a></li>
			<li><a href="#">u</a></li>
			<li><a href="#">v</a></li>
			<li><a href="#">w</a></li>
			<li><a href="#">x</a></li>
			<li><a href="#">y</a></li>
			<li><a href="#">z</a></li>
		</ul>

        <div class="contributor-list">

			<?php

				// Get list of users to skip
				$omit = get_field('hide_contributors');

				// Create an array of ID's to be ommited
				$omitArray = array();
				if($omit):
					foreach($omit as $o){

						array_push($omitArray, $o['ID']);

					}
				endif;

				// Get list of users
				$users = get_users();

				foreach($users as $u):

					// We'll check to make sure we're only getting authors with an image
					$image = get_the_author_meta('profile_image', $u->ID);

					// If its in our array of omits, continue
					if(in_array($u->ID, $omitArray) || !$image ){

						continue;

					} ?>

					<section class="author-posts">

						<?php rea_author_panel($template = 'partials/feature-author.php', $u->ID); ?>

					</section>

				<?php endforeach;

			?>

        </div>

    </div>

</section>

<?php get_footer(); ?>
