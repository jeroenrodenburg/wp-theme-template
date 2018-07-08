<?php
/**
 * Theme:
 * Template:			cookie.php
 * Description:			Functions performed on init
 */

/**
 * get_cookie
 * 
 * Retrieves the cookie value if it is found.
 * Returns an array or string
 * 
 * @since	1.0
 * @param	string $cookie_name
 * @return	array|string The value of the cookie if it is found
 */
function get_cookie( $cookie_name ) {
	$cookie = isset( $_COOKIE[ $cookie_name ] ) ? explode( ',', $_COOKIE[ $cookie_name ] ) : '';
	return $cookie;
}

/**
 * set_cookie_consent()
 * 
 * Set a cookie when it is sent with a POST request.
 * 
 * @since	1.0
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