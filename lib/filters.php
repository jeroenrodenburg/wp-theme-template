<?php
/**
 * Theme:				
 * Template:			filters.php
 * Description:			Filters to modify theme
 */


/**
 * Custom excerpt length.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/excerpt_length/
 * @param	integer $length Length of the excerpt
 * @return 	integer
 */
add_filter( 'excerpt_length', 'custom_excerpt_length' );
function custom_excerpt_length( $length ) {
	return 18;
}

/**
 * Custom excerpt more string.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/excerpt_more/
 * @return 	string
 */
add_filter( 'excerpt_more', 'custom_excerpt_more' );
function custom_excerpt_more( $excerpt ) {
	return '...';
}

/**
 * Add custom string to paginate links
 *
 * @since	1.0
 * @return 	string
 */
add_filter( 'paginate_links', 'custom_paginate_links' );
function custom_paginate_links( $link ) {
	return $link;
}

/**
 * Add custom fields to user contact fields
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/user_contactmethods/
 * @return	array
 */
add_filter( 'user_contactmethods', 'custom_contact_methods', 10, 1 );
function custom_contact_methods( $contactmethods ) {
	// $contactmethods['twitter'] = 'Twitter';
	// $contactmethods['facebook'] = 'Facebook';
	return $contactmethods;
}
	

/**
 * Password protected form
 *
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/the_password_form/
 * @return 	string
 */
add_filter( 'the_password_form', 'custom_password_form' );
function custom_password_form() {
	global $post;
    $label = 'pwbox-'.( empty( $post->ID ) ? rand() : $post->ID );
    $o = 
    	'<form class="search" action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" method="post">
			<p>' . __( "De inhoud is beveiligd met een wachtwoord. Vul het wachtwoord hieronder in om hem te kunnen bekijken:" ) . '</p>
			<label for="' . $label . '">' . __( "Wachtwoord:" ) . ' </label>
			<div class="search__fields">
				<input name="post_password" id="' . $label . '" type="password" size="20" maxlength="20" />
				<input type="submit" name="Submit" value="' . esc_attr__( "Submit" ) . '" />
			</div>
		</form>';
    return $o;
}

/**
 * Add attributes to the style tag
 * 
 * Can be used to add a link attributes 
 * to a script tag
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/style_loader_tag/
 * @return	string
 */
add_filter( 'style_loader_tag', 'custom_style_attributes', 10, 4 );
function custom_style_attributes( $html, $handle, $href, $media ) {
	// Handles to perform the task on
	$handles = array( 'style' );
	if ( in_array( $handle, $handles) && THEME_DEV_MODE === false ) {
		return '<link href="' . $href . '" rel="stylesheet" media="none" onload="if(media!=\'all\')media=\'all\'">';
	}
	return $html;
}

/**
 * Add attributes to the script tag
 * 
 * Can be used to add a 'async' or 'defer' attribute 
 * to a script tag
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/script_loader_tag/
 * @return	string
 */
add_filter( 'script_loader_tag', 'custom_script_attributes', 10, 3 );
function custom_script_attributes( $tag, $handle, $src ) {
	// Select a script handle to modify
	$attr = 'async';
	$handles = array( 'script' );
	if ( in_array( $handle, $handles ) && THEME_DEV_MODE === false ) {
		return '<script src="' . $src . '" type="text/javascript" ' . $attr . '></script>';
	}
	return $tag;
}
