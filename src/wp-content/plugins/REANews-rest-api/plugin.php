<?php
/**
 * Plugin Name: WP REST API - REANews REST API
 * Description: Extended API Endpoints from rest-api plugin for REA News Integration
 * Author: REA Media Development Team
 * Author URI: http://www.realestate.com.au/news
 * Version: 1.0
 * Plugin URI: http://www.realestate.com.au/news
 * License: GPL2+
 */

add_action( 'plugins_loaded', array('REA_REST_API','init') );

class REA_REST_API{

  public static function init(){
    add_action('rest_api_init', array(__CLASS__,'create_news_integration_api'));
    add_action( 'add_meta_boxes', array(__CLASS__,'integration_add_meta_boxes'), 10, 2 );
  }

  public static function create_news_integration_api()
  {
    require_once dirname( __FILE__ ) . '/class-wp-rest-reanews-integration-lookup.php';
    require_once dirname( __FILE__ ) . '/class-wp-rest-reanews-posts-controller.php';
    require_once dirname( __FILE__ ) . '/class-wp-rest-reanews-attachments-controller.php';
    require_once dirname( __FILE__ ) . '/class-wp-rest-reanews-users-controller.php';

    $controller = new WP_REST_REANews_Posts_Controller('post');
    $controller->register_routes();

    $controller = new WP_REST_REANews_Attachments_Controller('attachment');
    $controller->register_routes();

    $controller = new WP_REST_REANews_Users_Controller();
    $controller->register_routes();

  }

  public static function integration_add_meta_boxes($post_type, $post)
  {
    global $wpdb;

    $row = $wpdb->get_row( $wpdb->prepare(
      '
        SELECT source_id, source_name
        FROM content_integration_lookup
        WHERE post_id = %s
      ',
      $post->ID
    ) );

    if($row){
      add_meta_box( 'integration_source', 'Integration Source', array(__CLASS__,'integration_source_meta_box'), 'post', 'normal', 'default', $row);
      add_meta_box( 'integration_source', 'Integration Source', array(__CLASS__,'integration_source_meta_box'), 'attachment', 'normal', 'default', $row);
    }

  }

  public static function integration_source_meta_box($post, $callback_args)
  {
    echo 'Source ID: '. $callback_args['args']->source_id;
    echo '<br />';
    echo 'Source Name: '. $callback_args['args']->source_name;
  }

}
