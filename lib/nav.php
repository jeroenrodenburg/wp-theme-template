<?php
/**
 *	Theme:
 *	Template:			  nav.php
 *	Description:	  Register navigation locations for theme
*/

/**
 *  Register Navigation Menus
 */
function navigation_menus() {

	// $locations = array(
	// 	'slug'          => __( 'Nav title', 'text_domain' ),
	// );
	// register_nav_menus( $locations );

}
add_action( 'init', 'navigation_menus' );
