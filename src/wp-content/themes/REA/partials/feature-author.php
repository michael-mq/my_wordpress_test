<?php
/*
// An example of how functions can be reused, in this case creating a short author panel displaying only the author name.
*/
?>
<section class="blog-feature-author rui-clearfix">

<div class="rui-grid">

    <div id="rui-main-content" class="rui-grid-primary">

        <?php

        global $authordata;
        $author_roles = $authordata->roles;
        $author_role = array_shift($author_roles);

        ?>

        <?php if(isset($authorAvatar) && $author_role != 'brand') {
        echo '<img src="' . $authorAvatar[0] . '" width="' . $authorAvatar[1] . '" height="' . $authorAvatar[2] . '" alt="' . $authorName . '" class="author-avatar"/>';
        } ?>

        <div class="author-details">
            <div class="author-name"><?php echo $authorName ?></div>
            <p class="author-bio"><?php echo author($bio); ?></p>
            <ul class="rui-list-inline">
            <?php
                echo '<li><a href="'.$authPermalink.'">Profile</a></li>';
                if($authorNoFollow && $authorUrl) {
                    echo '<li><a rel="nofollow" href="'. $authorUrl .'" target="_blank">Website</a></li>';
                }elseif($authorUrl){
                    echo '<li><a href="'. $authorUrl .'" target="_blank">Website</a></li>';
                }
                if ($authArray) {
                    if (in_array('Google+', $authArray)) {
                        echo '<li><a rel="publisher" href="'.$googleUrl.'?rel=author" target="_blank">Google+</a></li>';
                    }else{
                        echo '<li class="rui-visuallyhidden"><a rel="publisher" href="'.$googleUrl.'?rel=author" target="_blank">Google+</a></li>';
                    };
                    if (in_array('Facebook', $authArray)) {
                        echo '<li><a href="'.$facebookUrl.'" target="_blank">Facebook</a></li>';
                    };
                    if (in_array('Twitter', $authArray)) {
                        echo '<li><a href="'.$twitterUrl.'" target="_blank">Twitter</a></li>';
                    };
                    if (in_array('Pinterest', $authArray)) {
                        echo '<li><a href="'.$pinterestUrl.'" target="_blank">Pinterest</a></li>';
                    };
                    if (in_array('LinkedIn', $authArray)) {
                        echo '<li><a href="'.$linkedinUrl.'" target="_blank">LinkedIn</a></li>';
                    }
                };
            ?>
            </ul>
        </div>
    </div>

</div>

</section>
