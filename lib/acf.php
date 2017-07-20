<?php
/**
 *  Theme:
 *  Template:       acf.php
 *  Description:    Advanced Custom Fields options and settings
 */

/**
 *  Add options page to theme
 */
if( function_exists('acf_add_options_page') ) {

	acf_add_options_page(array(
		'page_title' 	=> 'Theme settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

}

/**
 *	Google Maps API key
 */
add_action('acf/init', 'my_acf_init');
function my_acf_init() {

	acf_update_setting('google_api_key', '');
}

/**
 *	Remove ACF menu item if user is not ...
 */
add_action( 'admin_menu', 'remove_acf_menu', 100 );
function remove_acf_menu() {
  global $current_user;
  if ($current_user->user_login!='control') {
    remove_menu_page( 'edit.php?post_type=acf-field-group' );
  }
}
