<section class="featured-panel rui-clearfix">
    <div class="rui-grid">

        <ol class="hero-image">
            <?php foreach ($slides as $slide) : ?>
            <li class="slide slide-<?php echo $slide['post_id'] ?> <?php echo $slide['selected'] ?>">
                <a href="<?php echo $slide['post_href'] ?>">
                	<?php if($slide['hero_image']):
	                	echo '<img src="' . $slide['hero_image'][0] . '" width="' . $slide['hero_image'][1] . '" height="' . $slide['hero_image'][2] . '" alt="' . $slide['post_short_title'] . '"/>';
	                else:
	                	echo '<img src="' . $slide['carousel_image'][0] . '" width="' . $slide['carousel_image'][1] . '" height="' . $slide['carousel_image'][2] . '" alt="' . $slide['post_short_title'] . '"/>';
                	endif; ?>
                </a>
            </li>
            <?php endforeach; ?>
        </ol>

        <ol class="controls rui-clearfix">
            <?php foreach ($slides as $slide) : ?>
            <li class="slide-<?php echo $slide['post_id'] ?> <?php echo $slide['selected'] ?>">
                <span class="title"><?php echo $slide['post_short_title'] ?></span>
            </li>
            <?php endforeach; ?>
        </ol>

        <ol class="slide-details">
            <?php foreach ($slides as $slide) : ?>
            <li class="slide slide-<?php echo $slide['post_id'] ?> <?php echo $slide['selected'] ?>">
                <h3 class="rui-brand-heading">
                    <a href="<?php echo $slide['post_href'] ?>"><?php echo $slide['post_full_title'] ?></a>
                </h3>
                <aside class="post-meta"><?php rea_short_author_panel($slide['post_author'], $slide['post_id']) ?></aside>
                <div class="post-details">
                    <?php rea_excerpt($slide['post_id']); ?>
                </div>
            </li>
            <?php endforeach; ?>
        </ol>

    </div>
</section>
