<?php
/**
 * Theme:
 * Template:			acf.php
 * Description:			Advanced Custom Fields options and settings
 */

/**
 * Add options page to theme
 */
if( function_exists( 'acf_add_options_page' ) ) {

	// Main options page
	$parent = acf_add_options_page( array(
		'page_title' 	=> 'Theme settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	) );

	// 404
	acf_add_options_sub_page( array(
		'page_title'	=> '404 Page',
		'menu_title'	=> '404',
		'parent_slug'	=> $parent[ 'menu_slug' ]
	) );

	// Cookies
	acf_add_options_sub_page( array(
		'page_title'	=> 'Cookies',
		'menu_title'	=> 'Cookies',
		'parent_slug'	=> $parent[ 'menu_slug' ]
	) );

}

/**
 * Google Maps API key
 * Adds Google Map functionality to ACF
 */
add_action( 'acf/init', 'my_acf_init' );
function my_acf_init() {
	acf_update_setting( 'google_api_key', '' );
}

/**
 * Remove ACF menu item if user is not ...
 */
// add_action( 'admin_menu', 'remove_acf_menu', 100 );
// function remove_acf_menu() {
//   global $current_user;
//   if ($current_user->user_login!='control') {
//     remove_menu_page( 'edit.php?post_type=acf-field-group' );
//   }
// }
