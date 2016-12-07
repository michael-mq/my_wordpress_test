<?php

class Test_Plugin_REA_REST_API extends WP_UnitTestCase {

	function setUp() {
		parent::setUp();
		$GLOBALS['wp_rest_server'] = new Spy_REST_Server();
		$this->server = $GLOBALS['wp_rest_server'];

		//$this->subscriber = $this->factory->user->create( array( 'role' => 'subscriber' ) );
		$this->administrator = $this->factory->user->create( array( 'role' => 'administrator' ) );

		do_action( 'rest_api_init' );
	}

	function tearDown() {

		$GLOBALS['wp_rest_server'] = null;

		$this->rrmdir(WP_CONTENT_DIR . '/uploads');

		parent::tearDown();
	}

	function rrmdir($dir) {
    if (is_dir($dir)) {
      $objects = scandir($dir);
      foreach ($objects as $object) {
        if ($object != "." && $object != "..") {
          if (is_dir($dir."/".$object))
            $this->rrmdir($dir."/".$object);
          else
            unlink($dir."/".$object);
        }
      }
      //rmdir($dir);
    }
  }

	function test_endpoints_exists(){
		$routes = $this->server->get_routes();
		$this->assertArrayHasKey( '/news_integration/v1/posts/(?P<source_name>[\w]+)/(?P<source_id>[\w]+)', $routes );
		$this->assertArrayHasKey( '/news_integration/v1/media/(?P<source_name>[\w]+)/(?P<source_id>[\w]+)', $routes );
		$this->assertArrayHasKey( '/news_integration/v1/users/(?P<display_name>[\w%-]+)', $routes );
	}

	function test_unauthorized(){
		wp_set_current_user( 0 );
		$request = new WP_REST_Request( 'POST', '/news_integration/v1/posts/'.rand_str().'/'.rand_str() );
		$request->set_query_params( array() );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 401, $response->get_status() );

		$request = new WP_REST_Request( 'POST', '/news_integration/v1/media/'.rand_str().'/'.rand_str() );
		$request->set_query_params( array() );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 401, $response->get_status() );
	}

	function test_post(){
		wp_set_current_user( $this->administrator );

		$source_id = rand_str();
		$source_name = rand_str();

		// Create a new post and get this post
		$request = new WP_REST_Request( 'POST', '/news_integration/v1/posts/'.$source_name.'/'.$source_id );
		$request->set_query_params( array('title'=>'Title Test','content'=>'Content Test') );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 201, $response->get_status() );

		$request = new WP_REST_Request( 'GET', '/news_integration/v1/posts/'.$source_name.'/'.$source_id );
		$request->set_query_params( array() );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 200, $response->get_status() );
		$response_data = $response->get_data();
		$this->assertEquals( 'Title Test', $response_data['title']['rendered'] );
		$this->assertContains( 'Content Test', $response_data['content']['rendered'] );
		$this->assertEquals( $this->administrator, $response_data['author'] );

		// Update a post and get this post again
		$request = new WP_REST_Request( 'POST', '/news_integration/v1/posts/'.$source_name.'/'.$source_id );
		$request->set_query_params( array('title'=>'Title Test Change','content'=>'Content Test Change') );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 200, $response->get_status() );

		$request = new WP_REST_Request( 'GET', '/news_integration/v1/posts/'.$source_name.'/'.$source_id );
		$request->set_query_params( array() );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 200, $response->get_status() );
		$response_data = $response->get_data();
		$this->assertEquals( 'Title Test Change', $response_data['title']['rendered'] );
		$this->assertContains( 'Content Test Change', $response_data['content']['rendered'] );
		$this->assertEquals( $this->administrator, $response_data['author'] );

		// Get a non-existing post
		$request = new WP_REST_Request( 'GET', '/news_integration/v1/posts/'.rand_str().'/'.rand_str() );
		$request->set_query_params( array() );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 404, $response->get_status() );

	}

	function test_attachment(){
		wp_set_current_user( $this->administrator );

		$source_id = rand_str();
		$source_name = rand_str();

		$test_file = dirname( __FILE__ ) . '/images/canola.jpg';

		$request = new WP_REST_Request( 'POST', '/news_integration/v1/media/'.$source_name.'/'.$source_id );
		$request->set_header( 'Content-Type', 'image/jpeg' );
		$request->set_header( 'Content-Disposition', 'attachment; filename=canola.jpg' );
		$request->set_param( 'title', 'My title is very cool' );
		$request->set_param( 'caption', 'This is a better caption.' );
		$request->set_param( 'description', 'Without a description, my attachment is descriptionless.' );
		$request->set_param( 'alt_text', 'Alt text is stored outside post schema.' );
		$request->set_body( file_get_contents( $test_file ) );
		$response = $this->server->dispatch( $request );
		$data = $response->get_data();
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 201, $response->get_status() );
		$this->assertEquals( 'image', $data['media_type'] );

		$attachment = get_post( $data['id'] );
		$this->assertEquals( 'My title is very cool', $data['title']['raw'] );
		$this->assertEquals( 'My title is very cool', $attachment->post_title );
		$this->assertEquals( 'This is a better caption.', $data['caption']['raw'] );
		$this->assertEquals( 'This is a better caption.', $attachment->post_excerpt );
		$this->assertEquals( 'Without a description, my attachment is descriptionless.', $data['description']['raw'] );
		$this->assertEquals( 'Without a description, my attachment is descriptionless.', $attachment->post_content );
		$this->assertEquals( 'Alt text is stored outside post schema.', $data['alt_text'] );
		$this->assertEquals( 'Alt text is stored outside post schema.', get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ) );


		$request = new WP_REST_Request( 'GET', '/news_integration/v1/media/'.$source_name.'/'.$source_id );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 'image', $data['media_type'] );

		$attachment = get_post( $data['id'] );
		$this->assertEquals( 'My title is very cool', $data['title']['raw'] );
		$this->assertEquals( 'My title is very cool', $attachment->post_title );
		$this->assertEquals( 'This is a better caption.', $data['caption']['raw'] );
		$this->assertEquals( 'This is a better caption.', $attachment->post_excerpt );
		$this->assertEquals( 'Without a description, my attachment is descriptionless.', $data['description']['raw'] );
		$this->assertEquals( 'Without a description, my attachment is descriptionless.', $attachment->post_content );
		$this->assertEquals( 'Alt text is stored outside post schema.', $data['alt_text'] );
		$this->assertEquals( 'Alt text is stored outside post schema.', get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ) );

		// Update image and get image again
		$request = new WP_REST_Request( 'POST', '/news_integration/v1/media/'.$source_name.'/'.$source_id );
		$request->set_header( 'Content-Type', 'image/jpeg' );
		$request->set_header( 'Content-Disposition', 'attachment; filename=canola_2.jpg' );
		$request->set_param( 'title', 'My title is very cool - changed' );
		$request->set_body( file_get_contents( $test_file ) );
		$response = $this->server->dispatch( $request );
		$data = $response->get_data();
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 200, $response->get_status() );
		$this->assertEquals( 'image', $data['media_type'] );

		$attachment = get_post( $data['id'] );
		$this->assertEquals( 'My title is very cool - changed', $data['title']['raw'] );
		$this->assertEquals( 'My title is very cool - changed', $attachment->post_title );

		// Get a non-existing imgage
		$request = new WP_REST_Request( 'GET', '/news_integration/v1/media/'.rand_str().'/'.rand_str() );
		$response = $this->server->dispatch( $request );
		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 404, $response->get_status() );

	}

	function test_user(){

		$user_args = array(
			'role' => 'editor',
			'display_name' => 'Michael Qiu'
		);
		$michael_qiu = $this->factory->user->create( $user_args );

		wp_set_current_user( $this->administrator );

		$request = new WP_REST_Request( 'GET', '/news_integration/v1/users/Michael%20Qiu' );
		$response = $this->server->dispatch( $request );

		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 200, $response->get_status() );

		$request = new WP_REST_Request( 'GET', '/news_integration/v1/users/Michael' );
		$response = $this->server->dispatch( $request );

		$this->assertInstanceOf( 'WP_REST_Response', $response );
		$this->assertEquals( 404, $response->get_status() );

	}

}
