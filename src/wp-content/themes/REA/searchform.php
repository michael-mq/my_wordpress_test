<?php
/**
 * The template for displaying search forms in Twenty Eleven
 *
 * @package WordPress
 * @subpackage Twenty_Eleven
 * @since Twenty Eleven 1.0
 */
?>
<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>">
    <div class="rui-search-container">
        <input type="text" class="field rui-input" name="s" id="s" placeholder="Search news..." />
        <button class="rui-search-button" type="submit">
            <span class="rui-visuallyhidden">Submit Search</span>
            <span class="rui-icon rui-icon-search"></span>
        </button>
    </div>
</form>
