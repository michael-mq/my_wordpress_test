<?php

class WP_REST_REANews_Users_Controller extends WP_REST_Users_Controller
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
