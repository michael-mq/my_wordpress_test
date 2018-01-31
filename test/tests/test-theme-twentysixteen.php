<?php

//seems for child theme, we have to manually include functions.php
//require_once dirname( dirname( __FILE__ ) )  . '/functions.php';

class TestTheme extends WP_UnitTestCase {

	/**
	 * Fired before the set of tests is run. After WordPress is installed,
	 * switches from the default theme to the Basic Theme.
	 */
	function setUp() {

		parent::setUp();
		//switch_theme( 'twentysixteen' );

	} // end setup

	/**
	 * Verifies that Basic Theme is the active theme.
	 */
	function testActiveTheme() {

		$this->assertTrue( 'Twenty Sixteen' == wp_get_theme() );

	} // end testThemeInitialization

	/**
	 * Verifies that Twenty Eleven is not the active theme.
	 */
	function testInactiveTheme() {

		$this->assertFalse( 'Twenty Fourteen' == wp_get_theme() );

	} // end testInactiveTheme

	/**
	 * First verifies that jQuery has not been loaded, then fires WordPress' 'wp_enqueue_scripts'
	 * action to enqueue specified JavaScript (in our case, jQuery).
	 *
	 * Next, asserts that jQuery has been enqueued.
	 */
	function testjQueryIsLoaded() {

		// Typically, I'm not a fan of multiple assertions per function, but in this case,
		// we need to make sure jQuery isn't loaded before the 'wp_enqueue_scripts' action
		// is fired.
		$this->assertFalse( wp_script_is( 'jquery' ) );

		// Fire the enqueue action and now check for jQuery
		do_action( 'wp_enqueue_scripts' );
		$this->assertTrue( wp_script_is( 'jquery' ) );

	} // end testjQueryIsLoaded

	function testUnitTest(){
		$this->assertTrue( unit_test() );
	}

	function testREASharpieImage(){
		$src = 'https://www.realestate.com.au/blog/wp-content/uploads/2018/02/01090005/capi_36a96de08b7448a3ea0ed8873546755c_4454bcb32a6e1a28eae9c95d9149bf08.jpeg';
		$width = '875';
		$height = '492';
		$sizes = 875;
		$image = new ReaSharpieImage($src, $width, $height, $sizes);

		$this->assertEquals('https://www.realestate.com.au/blog/images/875x492-fit,progressive/2018/02/01090005/capi_36a96de08b7448a3ea0ed8873546755c_4454bcb32a6e1a28eae9c95d9149bf08.jpeg', $image->src() );

	}

}
