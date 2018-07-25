<?php
/**
 * Theme:			
 * Template:			gf.php
 * Description:			Gravity Forms modifications and additions
 */


/**
 * Return a new GF submit button
 *
 * @since	1.0
 * @link	https://docs.gravityforms.com/gform_submit_button/
 * @param 	string $button The old button
 * @param 	object $form The form
 * @return	string The new button
 */
add_filter( 'gform_submit_button', 'change_submit_button', 10, 2 );
function change_submit_button( $button, $form ) {
	return '<button type="submit" class="button" id="gform_submit_button_' . $form[ 'id' ] . '">' . $form[ 'button' ][ 'text' ] . '</button>';
}

/**
 * Load all the GF scripts of a form in the footer
 * 
 * @since	1.0
 * @link	https://docs.gravityforms.com/gform_init_scripts_footer/
 */
add_filter( 'gform_init_scripts_footer', '__return_true' );