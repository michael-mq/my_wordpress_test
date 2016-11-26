<?php
/*
// An example of how functions can be reused, in this case creating a short author panel displaying only the author name.
*/
?>
<div class="author-meta">
	<span class="author-image"><?php author_image('small-avatar', $image); ?></span>
	<span itemprop="author"  class="author-name"><?php author($fullName); ?></span>
	<span itemprop="datePublished" class="post-date"><?php the_date('d F Y'); ?></span>
</div>

