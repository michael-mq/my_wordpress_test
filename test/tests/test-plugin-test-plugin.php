<?php
/**
 * Class PluginTest
 *
 * @package Test_Plugin
 */

/**
 * Plug test case.
 */
class PluginTest extends WP_UnitTestCase {

	function test_awepop_add_view() {

		$post_id = $this->factory->post->create( array( 'post_title' => 'Test Post' , 'post_content'  => 'This is a test post.') );

		parent::go_to(get_permalink($post_id));

		$this->assertEquals(1, awepop_add_view() );
	}

	function test_awepop_get_view_count(){

		$post_id = $this->factory->post->create( array( 'post_title' => 'Test Post' , 'post_content'  => 'This is a test post.') );

		WP_UnitTestCase::go_to(get_permalink($post_id));

		awepop_add_view();
		awepop_add_view();
		awepop_add_view();

		$this->assertEquals(3, awepop_get_view_count() );

	}

	function test_awepop_show_views(){

		$post_id = $this->factory->post->create( array( 'post_title' => 'Test Post' , 'post_content'  => 'This is a test post.') );

		WP_UnitTestCase::go_to(get_permalink($post_id));

		awepop_add_view();
		awepop_add_view();
		awepop_add_view();

		$this->expectOutputString('This post has: 3 views');
		awepop_show_views();

	}

	function test_awepop_popularity_list(){

		$post_ids = array();
		$post_lists = array();
		$str = '';

		for ( $i = 0; $i < 3; $i++) {
			$post_id = $this->factory->post->create( array( 'post_title' => 'Test Post '.$i , 'post_content'  => 'This is a test post of '.$i) );
			$post_ids[] = $post_id;
			WP_UnitTestCase::go_to(get_permalink($post_id));
			for ( $j = 0; $j < $i + 1; $j++) {
				awepop_add_view();
			}
			$post_lists[]= '<li><a href="'.get_site_url().'/?p='.$post_id.'">Test Post '.$i.'</a></li>';
		}

		$post_lists = array_reverse($post_lists);

		foreach ($post_lists as $post_list) {
			$str .= $post_list;
		}

		$this->expectOutputString('<ul>'.$str.'</ul>');
		awepop_popularity_list(3);



	}

}
