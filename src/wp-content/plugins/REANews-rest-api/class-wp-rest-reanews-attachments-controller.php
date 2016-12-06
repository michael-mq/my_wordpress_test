<?php

class WP_REST_REANews_Attachments_Controller extends WP_REST_Attachments_Controller
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

      $post_id = WP_REST_REANews_Integration_Lookup::integration_get_post_id($source_name, $source_id);

      $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_id, 1 => $post_id)));

      return parent::get_item_permissions_check($request);
  }

  public function create_update_item_permissions_check($request)
  {
    $source_name = trim($request['source_name']);
    $source_id = trim($request['source_id']);

    $post_id = WP_REST_REANews_Integration_Lookup::integration_get_post_id($source_name, $source_id);

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

    $post_row = WP_REST_REANews_Integration_Lookup::integration_lookup_post($source_name, $source_id);

    if ($post_row && $post_row->post_id) {
        $request->set_url_params(array_merge($request->get_url_params(), array('id' => $post_row->post_id, 1 => $post_row->post_id)));
        return parent::update_item($request);
    } elseif ($post_row) {
        return WP_REST_REANews_Integration_Lookup::integration_conflict_warning();
    } else {
        if(WP_REST_REANews_Integration_Lookup::integration_insert_post($source_name, $source_id)){
          add_action( 'rest_insert_'.$this->post_type, array('WP_REST_REANews_Integration_Lookup', 'integration_update_post'), 10, 3 );
          return parent::create_item($request);
        }else{
          return WP_REST_REANews_Integration_Lookup::integration_conflict_warning();
        }
    }
  }
}
