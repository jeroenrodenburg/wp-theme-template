<?php
/**
 * Theme:
 * Template:			cookies-head.php
 * Description:			Cookies head output script
 */


// Cookie active?
$cookie_active 			    = get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name                = get_theme_mod( 'cookie_name' );

// Cookie code head
$cookie_code_head			= get_theme_mod( 'cookie_code_head' );

if ( $cookie_active && isset( $_COOKIE[ $cookie_name ] ) && $_COOKIE[ $cookie_name ] === 'true' ) {
	echo $cookie_code_head;
}