<?php

function redirect_old_domain_to_same_path() {
    $host = "$_SERVER[HTTP_HOST]";
    $request_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $old_domains = array('discover.realestate.com.au', 'experts.realestate.com.au', 'discover.resi-blog-qa.com.au', 'discover.wordpress.dev');

    if (in_array($host, $old_domains)) {
        $base_url = get_bloginfo('url');
        $request_path = ltrim($request_path, '/blog');
        wp_redirect("$base_url/$request_path", 301);
    }
}

function redirect_if_old_url() {
    $host = "$_SERVER[HTTP_HOST]";
    $request_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

    try_and_redirect_to_related_post($request_path);

    $old_domains = array('discover.realestate.com.au', 'experts.realestate.com.au', 'discover.resi-blog-qa.com.au', 'discover.wordpress.dev');
    if (in_array($host, $old_domains)) {
        handle_old_domains($request_path);
    }
}

// TODO: Can this query be refined to only return posts that have a
//       'discover_url' value set?
function try_and_redirect_to_related_post($request_path) {
    // All Posts (memory intensive)
    //$args = array('posts_per_page' => -1);

    // Only Posts that have a set discover url
    $args = array(
        'posts_per_page'    => -1,
        'post_type'         => 'post',
        'meta_query' => array(
            array(
                'key' => 'discover_url',
                'value' => '',
                'compare' => '!='
            )
        )
    );

    $posts = get_posts($args);

    foreach ($posts as $post) {
        $post_old_url = get_field('discover_url', $post->ID);
        $post_new_url = get_permalink($post->ID);
        if ($post_old_url && preg_match('|' . $request_path . '$|', $post_old_url) > 0) {
            wp_redirect($post_new_url, 301);
            die();
        }
    }
}

function handle_old_domains($request_path) {
    $base_url = get_bloginfo('url');
    $request_path = ltrim($request_path, '/');
    //try_and_redirect_to_equivalent_category($base_url, $request_path);
    do_a_search_as_last_resort($base_url, $request_path);
}

/*
function try_and_redirect_to_equivalent_category($base_url, $request_path) {
    $path_mappings = array(
        'buying' => '/',
        'buying/news' => 'news',
        'buying/how-to' => 'tips-guides/buying',
        'buying/checklists' => 'tips-guides/buying',
        'buying/experts' => 'tips-guides/buying',
        'buying/investing' => 'tips-guides/investing',
        'buying/video' => 'tips-guides/buying',
        'selling' => 'tips-guides/selling',
        'selling/news' => 'news',
        'selling/how-to' => 'tips-guides/selling',
        'selling/checklists' => 'tips-guides/selling',
        'selling/tips-guides' => 'tips-guides/selling',
        'selling/video ' => 'tips-guides/selling',
        'renting-sharing' => 'tips-guides/renting',
        'renting-sharing/news' => 'news',
        'renting-sharing/how-to' => 'tips-guides/renting',
        'renting-sharing/rental-information' => 'tips-guides/renting',
        'renovating-building' => 'tips-guides/renovating',
        'renovating-building/news' => 'tips-guides/renovating',
        'renovating-building/how-to' => 'tips-guides/renovating',
        'renovating-building/checklists' => 'tips-guides/renovating',
        'renovating-building/build ' => 'tips-guides/building',
        'renovating-building/video ' => 'tips-guides/renovating',
        'moving' => 'tips-guides/moving',
        'moving/news' => 'news',
        'moving/how-to ' => 'tips-guides/moving',
        'moving/checklists ' => 'tips-guides/moving',
        'calculators' => 'finance-loans/calculators',
        'buying/calculators' => 'finance-loans/calculators',
        'buying/calculators/split-loan-calculator' => 'finance-loans/calculators',
        'buying/calculators/extra-repayments-calculator' => 'finance-loans/calculators',
        'buying/calculators/term-deposit-calculator' => 'finance-loans/calculators',
        'buying/calculators/lump-sum-repayments-calculator' => 'finance-loans/calculators',
        'buying/calculators/loan-repayments-calculator' => 'finance-loans/calculators',
        'buying/calculators/stamp-duty-calculator' => 'finance-loans/calculators'
    );

    $new_request_path = $path_mappings[$request_path];
    if ($new_request_path) {
        wp_redirect("$base_url/$new_request_path", 301);
        die();
    }
}
*/

function do_a_search_as_last_resort($base_url, $request_path) {
    if (preg_match("/[a-z0-9-_+]*$/", $request_path, $matches)) {
        $search_terms = preg_replace('/[\W_]/', '%20', $matches[0]);
        wp_redirect("$base_url?s=$search_terms", 302);
        die();
    }
}

// rewrite pagination base name
// add_action( 'init', 'remove_page' );
// function remove_page(){ global $wp_rewrite; $wp_rewrite->pagination_base = ""; }

// disable guessing of URLS
remove_filter('template_redirect', 'redirect_canonical');

// Yoast SEO
apply_filters( 'wpseo_sitemaps_base_url', '/news/sitemaps/'); // not working!!! why....
add_action( 'init', 'news_seo' );

function news_seo() {

    global $wp;

    $wp->add_query_var( 'sitemap' );
    $wp->add_query_var( 'sitemap_n' );
    $wp->add_query_var( 'xsl' );

    add_rewrite_rule( 'news/sitemaps/sitemap_index\.xml$', 'index.php?sitemap=1', 'top' );
    add_rewrite_rule( 'news/sitemaps/([^/]+?)-sitemap([0-9]+)?\.xml$', 'index.php?sitemap=$matches[1]&sitemap_n=$matches[2]', 'top' );
    add_rewrite_rule( 'news/sitemaps/([a-z]+)?-?sitemap\.xsl$', 'index.php?xsl=$matches[1]', 'top' );

    // RSS
    add_rewrite_rule( 'news/feed/index.xml(.*)?', 'index.php?feed=rss2', 'top' );

}

// rewrite preview url
add_filter( 'preview_post_link', function ( $link, \WP_Post $post )
{

    $link = explode('?',$link);
    return $link[0] . 'news/?' . $link[1];

}, 10, 2 );

?>