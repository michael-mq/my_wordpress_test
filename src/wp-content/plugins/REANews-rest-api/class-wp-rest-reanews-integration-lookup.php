<?php
if ( ! class_exists( 'WP_REST_REANews_Integration_Lookup' ) ) {

  class WP_REST_REANews_Integration_Lookup
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
      if($creating){
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
    }

    public static function integration_conflict_warning()
    {
      return new WP_Error( 'rest_resource_creation_in_progress', __( 'Resource creation in progress, please resubmit request' ), array( 'status' => 409 ) );
    }

  }

}
