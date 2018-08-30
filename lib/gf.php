<?php
/**
 * Theme:			
 * Template:			gf.php
 * Description:			Gravity Forms modifications and additions
 */


/**
 * custom_gf_gfield_content
 * 
 * Customize the output per gfield.
 * Returns a string with the new HTML.
 * 
 * @since	1.0
 * @link	https://docs.gravityforms.com/gform_field_content/
 * 
 * @param	string $field_content
 * @param	Field_Object $field
 * @param	string $value
 * @param	integer $entry_id
 * @param	integer $form_id
 * @return	string
 */
add_filter( 'gform_field_content', 'custom_gf_gfield_content', 10, 5 );
function custom_gf_gfield_content( $field_content, $field, $value, $entry_id, $form_id ) {
	if ( is_admin() ) return $field_content;
	return $field_content;
}

/**
 * custom_gf_submit_button
 * 
 * Modify the output of the submit button.
 * Returns a string with the new HTML.
 *
 * @since	1.0
 * @link	https://docs.gravityforms.com/gform_submit_button/
 * 
 * @param 	string $button The old button
 * @param 	object $form The form
 * @return	string The new button
 */
add_filter( 'gform_submit_button', 'custom_gf_submit_button', 10, 2 );
function custom_gf_submit_button( $button, $form ) {
	return '<button type="submit" class="button" id="gform_submit_button_' . $form[ 'id' ] . '">' . $form[ 'button' ][ 'text' ] . '</button>';
}

/**
 * Load all the GF scripts of a form in the footer
 * 
 * @since	1.0
 * @link	https://docs.gravityforms.com/gform_init_scripts_footer/
 */
add_filter( 'gform_init_scripts_footer', '__return_true' );

/**
 * enqueue_gform_scripts
 * 
 * Enqueues script that are needed for gforms.
 * This gives us the control to load in scripts 
 * only when GForms is used on the page.
 * 
 * @since	1.0
 * @link	https://docs.gravityforms.com/gform_enqueue_scripts/
 * 
 * @param	GF_Form $form
 * @param	boolean $is_ajax
 */
add_action( 'gform_enqueue_scripts', 'enqueue_gform_scripts', 10, 2 );
function enqueue_gform_scripts( $form, $is_ajax ) {
	wp_enqueue_script( 'jquery' );
}