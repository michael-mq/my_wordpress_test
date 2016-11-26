<div class="video-widget list-module">
<h4 class="rui-brand-heading">Video Content</h4>

<?php //print_r($video); ?>

<ul class="post-list">

<?php $i = 0; foreach ($videos as $video) { ?>

    <?php //print_r($video); ?>

    <li class="video">
    <div class="col-6">
    <a href="#">
        <img src="<?php echo $video["images"]["thumbnail"]["src"]; ?>" alt="<?php echo $video['name']; ?>"/>
        <span class="rui-icon rui-icon-play"></span>
    </a>
    </div>
        <div class="col-6">
        <p class="title"><?php echo $video['name']; ?></p>
        <p class="duration"><?php echo video_duration($video["duration"]); ?></p>
            </div>
    <div class="clearfix"></div>
    </li>

<?php $i++; if($i == 5) break; } ?>

    <?php //print_r($item['videos']); ?>

</ul>
</div>