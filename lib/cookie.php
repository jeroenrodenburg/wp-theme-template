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
 * set_cookie
 * 
 * Form handler for setting the cookie
 * Sets the cookie through php and redirects
 * the user back to the page.
 */
add_action( 'admin_post_set_cookie', 'set_cookie' );
add_action( 'admin_post_nopriv_set_cookie', 'set_cookie' );
function set_cookie() {

	// If nonce is not there or invalid
	if ( ! isset( $_POST[ '_wp_nonce' ] ) || ! wp_verify_nonce( $_POST[ '_wp_nonce' ], 'cookie' ) ) wp_die();

	// Expiration date of cookie
	$cookie_expiration_date = intval( get_theme_mod( 'cookie_expiration_date' ) );

	// Value of cookie
	$cookie_value = '';
	
	if ( isset( $_POST[ 'accept' ] ) ) {
		$cookie_value = 'true';
	}

	if ( isset( $_POST[ 'refuse' ] ) ) {
		$cookie_value = 'false';
	}

	// Referrer URL
	$referrer = esc_url( $_POST[ '_wp_referrer' ] );

	// Set the cookie if a POST is sent with the cookie name.
	if ( isset( $_POST[ 'cookie_name' ] ) ) {
		setcookie( $_POST[ 'cookie_name' ], $cookie_value, (time() + 60 * 60 * 24 * $cookie_expiration_date), '/' );
	}

	// Redirect to thank you page
	wp_redirect( $referrer );
	exit;

}