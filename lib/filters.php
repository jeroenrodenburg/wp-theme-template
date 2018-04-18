<?php
/**
 *	Theme:				
 *	Template:			filters.php
 *	Description:	  	Filters to modify theme
*/


/**
 *	Custom excerpt length.
 *	@return integer
 */
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
function custom_excerpt_length( $length ) {
	return 18;
}

/**
 *	Custom excerpt more string.
 *	@return string
 */
add_filter( 'excerpt_more', 'custom_excerpt_more' );
function custom_excerpt_more( $excerpt ) {
	return '...';
}

/**
 *	Add custom string to paginate links
 *
 *	@return string
 */
add_filter( 'paginate_links', 'custom_paginate_links' );
function custom_paginate_links( $link ) {
	return $link;
}

/**
 *	Password protected form
 *
 *	@return string
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