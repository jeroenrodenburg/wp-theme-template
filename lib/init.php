<?php
/**
 * Theme:
 * Template:			init.php
 * Description:			Functions performed on init
 */


/**
 * Set a cookie when it is sent with a POST request
 *	
 */
add_action( 'init', 'set_cookie_consent' );
function set_cookie_consent() {

	// Modify cookie_name for current site
	$cookie_name = 'cookie-consent';
	
	// Set the cookie if a POST is sent with the cookie name.
	if ( isset( $_POST[ $cookie_name ] ) ) {
		setcookie( $cookie_name, $_POST[ $cookie_name ], time() + 3600 * 24 * 356, '/' );
	}
	
}