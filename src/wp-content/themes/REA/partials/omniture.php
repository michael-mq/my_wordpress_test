<?php

$page_type = "";
$post_name = "";
$tag_name = "";
$events = "";
$categories_and_tags = "";
$source_name = "";

function omniture_data() {

	global $page_type;
	global $post_name;
	global $tag_name;
	global $events;
	global $categories_and_tags;
	global $source_name;

	if (is_singular('post')) {
		$page_type = "post";
		$post_name = get_queried_object()->post_name;

		$source_name = (($_source_name = get_field('source_name')) ? $_source_name : "");

		$events="event12,event11";

		$tags = get_the_tags();
		$tags = is_array($tags) ? $tags : array();
		$categories = get_the_category();
		$categories = is_array($categories) ? $categories : array();
		$categories_and_tags = array();		
		foreach (array_merge($categories, $tags) as $i) {
			$categories_and_tags[] = $i->slug;
		}
	} elseif (is_tag()) {

		$page_type = "tag";
		$tag_name = single_tag_title("", false);
	} elseif (is_category()) {

		$page_type = "category";
	} elseif (is_search()) {

		global $wp_query;
    $page_type = "search";
		if ($wp_query->found_posts > 0) {
			$events = "event12,event4";
		} else {
			$events = "event12,event5";
		}
		$keywords = $wp_query->query["s"];
	} elseif (is_author()) {

		$page_type = "author";
	} 
}

function getCategories() {
	if (is_category()) {
		return array(
			get_queried_object(),
			get_category(get_queried_object()->parent)
		);
	} elseif (is_author() || is_tag()) {
		return array("", "");
	}

	return get_the_category();
}

function get_page_number() {
	return (get_query_var('paged')) ? get_query_var('paged') : 1;
}

$json_categories_data = htmlspecialchars(json_encode(getCategories()), ENT_QUOTES, "UTF-8");

omniture_data();

?>

<div
	id="global-data"
	data-events="<?php global $events; echo $events; ?>"
	data-tag-name="<?php global $tag_name; echo $tag_name; ?>"
	data-categories="<?php echo $json_categories_data; ?>"
	data-page-no="<?php echo get_page_number(); ?>"
	data-article-slug="<?php global $post_name; echo $post_name; ?>"
	data-page-type="<?php global $page_type; echo $page_type; ?>"
  	data-categories-tags="<?php global $categories_and_tags; echo empty($categories_and_tags) ? '' : join(",", $categories_and_tags); ?>"
	data-source-name="<?php global $source_name; echo $source_name; ?>">
</div>
