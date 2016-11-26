<div class="rui-ad-wrapper">
    <div
        <?php if (isset($ad['class']))          echo "class=\"".$ad['class']."\""; ?>
        <?php if (isset($ad['type']))           echo "data-type=\"".$ad['type']."\""; ?>
        <?php if (isset($ad['site']))           echo "data-site=\"".$ad['site']."\""; ?>
        <?php if (isset($ad['sz']))             echo "data-sz=\"".$ad['sz']."\""; ?>
        <?php if (isset($ad['auto-hide']))      echo "data-auto-hide=\"".$ad['auto-hide']."\""; ?>
        <?php if (isset($ad['channel']))        echo "data-channel=\"".$ad['channel']."\""; ?>
        <?php if (isset($ad['sect']))           echo "data-sect=\"".$ad['sect']."\"" ?>
        <?php if (isset($ad['post-name']))      echo "data-postname=\"".$ad['post-name']."\"" ?>
        <?php if (isset($ad['categories']))     echo "data-cat=\"".$ad['categories']."\"" ?>
        <?php if (isset($ad['subcategories']))  echo "data-subcat=\"".$ad['subcategories']."\"" ?>
        <?php if (isset($ad['brand']))          echo "data-brand=\"".$ad['brand']."\"" ?>
        <?php if (isset($ad['pos']))            echo "data-pos=\"".$ad['pos']."\"" ?>
        <?php if (isset($ad['author']))         echo "data-author=\"".$ad['author']."\"" ?>
    >
    </div>
</div>
