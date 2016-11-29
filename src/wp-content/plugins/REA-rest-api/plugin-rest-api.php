<?php
/**
 * Plugin Name: REA REST API
 * Description: JSON-based REST API for WordPress, originally developed as part of GSoC 2013.
 * Author: WP REST API Team
 * Author URI: http://v2.wp-api.org
 * Version: 2.0-beta15
 * Plugin URI: https://github.com/WP-API/WP-API
 * License: GPL2+
 */

/*
* New REST API endpoint for REANew Project
*/

if ( ! function_exists( 'is_plugin_active' ) )
     require_once( ABSPATH . '/wp-admin/includes/plugin.php' );

if ( is_plugin_active( 'rest-api/plugin.php' ) ) {

  add_action('rest_api_init', 'create_news_integration_api');

  function create_news_integration_api()
  {
      $controller = new WP_REST_Posts_REANew_Controller('post');
      $controller->register_routes();

      $controller = new WP_REST_Attachments_REANew_Controller('attachment');
      $controller->register_routes();

      $controller = new WP_REST_Users_REANew_Controller();
      $controller->register_routes();
  }

  add_action( 'add_meta_boxes', 'integration_add_meta_boxes', 10, 2 );

  function integration_add_meta_boxes($post_type, $post)
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
      add_meta_box( 'integration_source', 'Integration Source', 'integration_source_meta_box', 'post', 'normal', 'default', $row);
      add_meta_box( 'integration_source', 'Integration Source', 'integration_source_meta_box', 'attachment', 'normal', 'default', $row);
    }

  }

  function integration_source_meta_box($post, $callback_args)
  {
    echo 'Source ID: '. $callback_args['args']->source_id;
    echo '<br />';
    echo 'Source Name: '. $callback_args['args']->source_name;
  }

  class WP_REST_Posts_REANew_Controller extends WP_REST_Posts_Controller
  {
      public function register_routes()
      {
          $this->namespace = 'news_integration/v1';

          register_rest_route($this->namespace, '/'.$this->rest_base.'/(?P<source_name>[\w]+)/(?P<source_id>[\w]+)', array(
              array(
                  'methods' => WP_REST_Server::READABLE,
                  'callback' => array($this, 'get_item'),
                  'permission_callback' => array($this, 'get_item_permissions_check'),
                  'args' => array(
                      'context' => $this->get_context_param(array('default' => 'view')),
                  ),
              ),
              array(
                  'methods' => WP_REST_Server::EDITABLE,
                  'callback' => array($this, 'create_update_item'),
                  'permission_callback' => array( $this, 'create_update_item_permissions_check' ),
                  'args' => $this->get_endpoint_args_for_item_schema(WP_REST_Server::EDITABLE),
              ),
              'schema' => array($this, 'get_public_item_schema'),
          ));
      }

      public function get_item_permissions_check($request)
      {
          $source_name = trim($request['source_name']);
          $source_id = trim($request['source_id']);

          $post_id = Integration_Lookup::integration_get_post_id($source_name, $source_id);

          $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_id, 1 => $post_id)));

          return parent::get_item_permissions_check($request);
      }

      public function create_update_item_permissions_check($request)
      {
          $source_name = trim($request['source_name']);
          $source_id = trim($request['source_id']);

          $post_id = Integration_Lookup::integration_get_post_id($source_name, $source_id);

          if ($post_id) {
              $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_id, 1 => $post_id)));
              return parent::update_item_permissions_check($request);
          } else {
              return parent::create_item_permissions_check($request);
          }
      }

      public function create_update_item($request)
      {
        $source_name = trim($request['source_name']);
        $source_id = trim($request['source_id']);

        $post_row = Integration_Lookup::integration_lookup_post($source_name, $source_id);

        if ($post_row && $post_row->post_id) {
            $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_row->post_id, 1 => $post_row->post_id)));
            return parent::update_item($request);
        } elseif ($post_row) {
            return Integration_Lookup::integration_conflict_warning();
        } else {
            if(Integration_Lookup::integration_insert_post($source_name, $source_id)){
              add_action( 'rest_insert_'.$this->post_type, array('Integration_Lookup', 'integration_update_post'), 10, 3 );
              return parent::create_item($request);
            }else{
              return Integration_Lookup::integration_conflict_warning();
            }
        }
      }

  }

  class WP_REST_Attachments_REANew_Controller extends WP_REST_Attachments_Controller
  {
    public function register_routes()
    {
        $this->namespace = 'news_integration/v1';

        register_rest_route($this->namespace, '/'.$this->rest_base.'/(?P<source_name>[\w]+)/(?P<source_id>[\w]+)', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array($this, 'get_item'),
                'permission_callback' => array($this, 'get_item_permissions_check'),
                'args' => array(
                    'context' => $this->get_context_param(array('default' => 'view')),
                ),
            ),
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array($this, 'create_update_item'),
                'permission_callback' => array( $this, 'create_update_item_permissions_check' ),
                'args' => $this->get_endpoint_args_for_item_schema(WP_REST_Server::EDITABLE),
            ),
            'schema' => array($this, 'get_public_item_schema'),
        ));
    }

    public function get_item_permissions_check($request)
    {
        $source_name = trim($request['source_name']);
        $source_id = trim($request['source_id']);

        $post_id = Integration_Lookup::integration_get_post_id($source_name, $source_id);

        $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_id, 1 => $post_id)));

        return parent::get_item_permissions_check($request);
    }

    public function create_update_item_permissions_check($request)
    {
      $source_name = trim($request['source_name']);
      $source_id = trim($request['source_id']);

      $post_id = Integration_Lookup::integration_get_post_id($source_name, $source_id);

      if ($post_id) {
          $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_id, 1 => $post_id)));
          return parent::update_item_permissions_check($request);
      } else {
          return parent::create_item_permissions_check($request);
      }
    }

    public function create_update_item($request)
    {
      $source_name = trim($request['source_name']);
      $source_id = trim($request['source_id']);

      $post_row = Integration_Lookup::integration_lookup_post($source_name, $source_id);

      if ($post_row && $post_row->post_id) {
          $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_row->post_id, 1 => $post_row->post_id)));
          return parent::update_item($request);
      } elseif ($post_row) {
          return Integration_Lookup::integration_conflict_warning();
      } else {
          if(Integration_Lookup::integration_insert_post($source_name, $source_id)){
            add_action( 'rest_insert_'.$this->post_type, array('Integration_Lookup', 'integration_update_post'), 10, 3 );
            return parent::create_item($request);
          }else{
            return Integration_Lookup::integration_conflict_warning();
          }
      }
    }
  }

  class WP_REST_Users_REANew_Controller extends WP_REST_Users_Controller
  {
    public function register_routes() {

      $this->namespace = 'news_integration/v1';

      register_rest_route( $this->namespace, '/' . $this->rest_base . '/(?P<display_name>[\w%-]+)', array(
        array(
          'methods'         => WP_REST_Server::READABLE,
          'callback'        => array( $this, 'get_item' ),
          'permission_callback' => array( $this, 'get_item_permissions_check' ),
          'args'            => array(
            'context'          => $this->get_context_param( array( 'default' => 'view' ) ),
          ),
        ),
        'schema' => array( $this, 'get_public_item_schema' ),
      ) );
    }

    public function get_item_permissions_check($request)
    {
        $display_name = urldecode(trim($request['display_name']));

        $user_id = $this->find_user_by_name($display_name);

        $request->set_url_params(array_merge($request->get_url_params(), array('id' => $user_id, 1 => $user_id)));

        return parent::get_item_permissions_check($request);
    }

    public function find_user_by_name($display_name)
    {
      global $wpdb;
      $users = $wpdb->get_results("SELECT ID FROM $wpdb->users WHERE display_name = '".$display_name."' LIMIT 1");

      if($users){
        return $users[0]->ID;
      }else{
        return NULL;
      }
    }
  }

  class Integration_Lookup
  {
    public static function integration_lookup_post($source_name, $source_id)
    {
      global $wpdb;

      return $wpdb->get_row( $wpdb->prepare(
        '
          SELECT post_id
          FROM content_integration_lookup
          WHERE source_id = %s AND source_name = %s
        ',
        $source_id,
        $source_name
      ) );
    }

    public static function integration_get_post_id($source_name, $source_id)
    {
      $post_row = self::integration_lookup_post($source_name, $source_id);

      if ($post_row) {
        return $post_row->post_id;
      }

      return NULL;
    }

    public static function integration_insert_post($source_name, $source_id)
    {
      global $wpdb;

      $wpdb->query(
        $wpdb->prepare(
          '
            INSERT INTO content_integration_lookup
            (source_id,source_name)
            values(%s, %s)
          ',
          $source_id,
          $source_name
        )
      );

      if ($wpdb->last_error) {
        return false;
      }
      return true;

    }

    public static function integration_update_post($post, $request, $creating)
    {
      $source = $request->get_url_params();

      global $wpdb;

      $wpdb->query(
        $wpdb->prepare(
          '
            UPDATE content_integration_lookup
            SET post_id = %s
            WHERE source_id = %s AND source_name = %s
          ',
          $post->ID,
          $source['source_id'],
          $source['source_name']
        )
      );
    }

    public static function integration_conflict_warning()
    {
      return new WP_Error( 'rest_resource_creation_in_progress', __( 'Resource creation in progress, please resubmit request' ), array( 'status' => 409 ) );
    }

  }
}
