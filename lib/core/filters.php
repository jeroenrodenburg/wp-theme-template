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
add_filter( 'excerpt_length', 'custom_excerpt_length', 10, 1 );
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
add_filter( 'excerpt_more', 'custom_excerpt_more', 10, 1 );
function custom_excerpt_more( $excerpt ) {
	return '...';
}

/**
 * Add custom string to paginate links
 *
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/paginate_links/
 * @param	string $link
 * @return 	string
 */
add_filter( 'paginate_links', 'custom_paginate_links', 10, 1 );
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
			<p>' . __( "De inhoud is beveiligd met een wachtwoord. Vul het wachtwoord hieronder in om hem te kunnen bekijken:", "text_domain" ) . '</p>
			<label for="' . $label . '">' . __( "Wachtwoord:", "text_domain" ) . ' </label>
			<div class="search__fields">
				<input name="post_password" id="' . $label . '" type="password" size="20" maxlength="20" />
				<input type="submit" name="Submit" value="' . esc_attr__( "Verzenden", "text_domain" ) . '" />
			</div>
		</form>';
    return $o;
}

/**
 * Remove default image sizes
 * 
 * Can be used to create custom image sizes
 * instead of the WP standard ones.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/intermediate_image_sizes_advanced/
 * @return	array
 */
add_filter( 'intermediate_image_sizes_advanced', 'remove_default_image_sizes', 10, 1 );
function remove_default_image_sizes( $sizes ) {

	// Sizes to remove
	// $needles = array( 'thumbnail', 'medium', 'medium_large', 'large' );

	/**
	 * Loop trough the sizes and remove 
	 * the size if it is found in the 
	 * haystack
	 */
	foreach ( $needles as $needle ) {
		if ( ( $key = array_search( $needle, $sizes ) ) !== false ) {
			unset( $sizes[ $key ] );
		}
	}

	// Return new sizes
	return $sizes;
}

/**
 * Customize max width of img srcset
 * 
 * Resize the maximal possible width of the srcset
 * when outputting an image with the srcset attribute
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/max_srcset_image_width/
 * @return	integer
 */
add_filter( 'max_srcset_image_width', 'custom_max_srcset_image_width', 10, 1 );
function custom_max_srcset_image_width( $max_width ) {

	// Set new max width
	// $max_width = 2560;

	// Return max width
	return $max_width;
}