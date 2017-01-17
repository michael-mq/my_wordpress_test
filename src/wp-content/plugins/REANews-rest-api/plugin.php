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

// In Wordpress 4.7, REST API is a built in thing in Wordpress. No need of extra REST API plubin
// add_action( 'plugins_loaded', array('REA_REST_API','init') );

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'REA_REST_API' ) ) {

	add_action('rest_api_init', array('REA_REST_API','create_news_integration_api'));
	add_action('add_meta_boxes', array('REA_REST_API','integration_add_meta_boxes'),10,2);

  class REA_REST_API{

    // public static function init(){
    //   add_action('rest_api_init', array(__CLASS__,'create_news_integration_api'));
    //   add_action( 'add_meta_boxes', array(__CLASS__,'integration_add_meta_boxes'), 10, 2 );
    // }

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

			global $wpdb;

      $wpdb->query(
        '
          CREATE TABLE IF NOT EXISTS content_integration_lookup (
          source_id VARCHAR(256) NOT NULL,
          source_name VARCHAR(256) NOT NULL,
          post_id BIGINT(20),
          PRIMARY KEY (source_id, source_name),
          UNIQUE KEY post_id (post_id)
          );
        '
			);
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

}
