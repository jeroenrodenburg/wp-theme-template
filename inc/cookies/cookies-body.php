<?php
/**
 * Theme:
 * Template:			cookies-body.php
 * Description:			Cookies body output script
 */


// Cookie active?
$cookie_active 			    = get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name                = get_theme_mod( 'cookie_name' );

// Cookie code body
$cookie_code_body			= get_theme_mod( 'cookie_code_body' );

if ( $cookie_active && isset( $_COOKIE[ $cookie_name ] ) && $_COOKIE[ $cookie_name ] === 'true' ) {
	echo $cookie_code_body;
}
?>