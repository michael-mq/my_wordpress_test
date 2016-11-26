<div class="video-widget list-module">
<h4 class="rui-brand-heading">Video Content</h4>

<?php //print_r($video); ?>

<ul class="post-list">

<?php $i = 0; foreach ($videos as $video) { ?>

    <?php //print_r($video); ?>

    <li class="video">
        <a href="<?php echo $video["post_href"]; ?>">
    <div class="col-6">
        <img src="<?php echo $video["video_data"]["images"]["thumbnail"]["src"]; ?>" alt="<?php echo $video['post_full_title']; ?>"/>
    </div>
        <div class="col-6">
        <p class="title"><?php echo $video["post_full_title"]; ?></p>
        <p class="duration"><span class="rui-icon rui-icon-play"></span> <?php echo video_duration($video["video_data"]["duration"]); ?></p>
            </div>
    <div class="clearfix"></div>
        </a>
    </li>

<?php $i++; if($i == 5) break; } ?>

    <?php //print_r($item['videos']); ?>

</ul>
</div>