<?php 

// get this category ID 
$this_category = get_category($cat);

// if this category is a parent 
if ($this_category->category_parent == 0) { 
	
	//  set the ACF location category_ID to this categories id 
	$acf_location = 'category_'.$this_category->term_id;
	
// else this is a sub category 	
} else { 
	
	// get the parent category id 
	$parent_category = get_category($this_category->category_parent);
	
	// set the ACF location category_ID to the parent category id 
	$acf_location = 'category_' . $parent_category->term_id;

}

$acf_location = 'category_'.$this_category->term_id;

// if we have sub navigation defined display it 
if( have_rows('sub_navigation', $acf_location) ): ?>
	<ul class="main-heading-sub-nav">
		<?php while( have_rows('sub_navigation', $acf_location)): the_row(); ?>
			<li><a href="<?php echo get_category_link(  get_sub_field('link') ); ?>"><?php the_sub_field('label'); ?></a></li>
		<?php endwhile; ?>
	</ul>
<?php endif; ?>