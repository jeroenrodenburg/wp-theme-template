<?php
/**
 *  Theme:
 *  Template:       pagebuilder.php
 *  Description:	Master template that controls all the pagebuilder templates
 */

// Modify this name to the name 
// of the ACF pagebuilder.
$pagebuilder = 'PAGEBUILDER_NAME';

// Loop over pagebuilder rows
if ( have_rows( $pagebuilder ) ) {
	while ( have_rows( $pagebuilder ) ) {
		the_row();

		// Get template name
		$template = get_row_layout();

		// Get template with the name of the template
		get_template_part( 'includes/pagebuilder/pagebuilder', $template );
	}
}

?>