<?php
/*
// The Default Layout for author panels at the bottom of posts.
*/
?>
<div class="author-panel">
	Author photo: <?php author_image('thumbnail', $image); ?> <br/>
	Author name: <?php author($name); ?> <br/>
	Author title: <?php author($title); ?><br/>
	Author bio: <?php author($bio); ?><br/>
	
	<?php if($googleUrl){ ?>
	Google URL: <?php author($googleUrl); ?><br/>
	<?php }; ?>
	
	<?php if($facebookUrl){ ?>
	Fb URL: <?php author($facebookUrl); ?><br/>
	<?php }; ?>
	
	<?php if($twitterUrl){ ?>
	Twitter URL: <?php author($twitterUrl); ?><br/>
	<?php }; ?>
	
	<?php if($pinterestUrl){ ?>
	Pinterest URL: <?php author($pinterestUrl); ?><br/>
	<?php }; ?>

	<?php if($linkedinUrl){ ?>
		LinkedIn URL: <?php author($linkedinUrl); ?><br/>
	<?php }; ?>

</div>