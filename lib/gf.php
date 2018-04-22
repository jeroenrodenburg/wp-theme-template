<?php
/**
 *	Theme:			
 *	Template:			gf.php
 *	Description:		Gravity Forms modifications and additions
*/


/**
 *	Return a new GF submit button
 *
 *	@param {String} $button	- The old button
 *	@param {Object}	$form - The form
 *	@return {String} - The new button
 */
add_filter( 'gform_submit_button', 'change_submit_button', 10, 2 );
function change_submit_button( $button, $form ) {
	return '<button type="submit" class="button" id="gform_submit_button_' . $form['id'] . '">' . $form['button']['text'] . '</button>';
}