<?php

class Test_Theme_REA extends WP_UnitTestCase {

	/**
	 * Fired before the set of tests is run. After WordPress is installed,
	 * switches from the default theme to the Basic Theme.
	 */
	function setUp() {

		parent::setUp();
		switch_theme( 'REA' );

	} // end setup

	// function tearDown() {
	// 	wp_clean_themes_cache();
	// 	unset( $GLOBALS['wp_themes'] );
	// 	parent::tearDown();
	// }

	/**
	 * Verifies that Basic Theme is the active theme.
	 */
	function testActiveTheme() {

		$this->assertTrue( 'REA Blog' == wp_get_theme() );

	} // end testThemeInitialization

	/**
	 * Verifies that Twenty Eleven is not the active theme.
	 */
	function testInactiveTheme() {

		$this->assertFalse( 'Twenty Fourteen' == wp_get_theme() );

	} // end testInactiveTheme

}
