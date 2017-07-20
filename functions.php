<?php
/**
 *  Theme:
 *  Template:     functions.php
 *  Description:  Overview of all theme functionality
 */


locate_template( 'lib/acf.php', true, true );             // Advanced Custom Fields
locate_template( 'lib/ajax.php', true, true );            // Ajax functions
locate_template( 'lib/cleanup.php', true, true );         // Head cleanup
locate_template( 'lib/enqueue.php', true, true );         // Enqueue CSS and JS
locate_template( 'lib/gf.php', true, true );              // Gravity Forms
locate_template( 'lib/helpers.php', true, true );         // Helper functions
locate_template( 'lib/nav.php', true, true );             // Nav registeration
locate_template( 'lib/post-types.php', true, true );      // Custom post types
locate_template( 'lib/taxonomies.php', true, true );      // Custom taxonomies
locate_template( 'lib/theme-support.php', true, true );   // Theme support settings
locate_template( 'lib/widgets.php', true, true );         // Custom widgets

?>
