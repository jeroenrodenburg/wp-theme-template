<?php
/**
 *  Theme:
 *  Template:			functions.php
 *  Description:		Overview of all theme functionality
 */

locate_template( 'lib/init.php', true, true );            // Functions fired on init
locate_template( 'lib/acf.php', true, true );             // Advanced Custom Fields
locate_template( 'lib/admin.php', true, true );           // Custom admin settings
locate_template( 'lib/ajax.php', true, true );            // Ajax functions
locate_template( 'lib/cleanup.php', true, true );         // Head cleanup
locate_template( 'lib/customizer.php', true, true );      // Customizer modifications
locate_template( 'lib/enqueue.php', true, true );         // Enqueue CSS and JS
locate_template( 'lib/filters.php', true, true );         // Filter hooks
locate_template( 'lib/gf.php', true, true );              // Gravity Forms
locate_template( 'lib/gutenberg.php', true, true );		  // Gutenberg modifications
locate_template( 'lib/helpers.php', true, true );         // Helper functions
locate_template( 'lib/meta.php', true, true );            // Meta functions
locate_template( 'lib/navigation.php', true, true );      // Navigation registeration and Walkers
locate_template( 'lib/post-types.php', true, true );      // Custom post types
locate_template( 'lib/rest.php', true, true );            // Rest settings
locate_template( 'lib/sidebars.php', true, true );        // Sidebar registration
locate_template( 'lib/taxonomies.php', true, true );      // Custom taxonomies
locate_template( 'lib/theme-support.php', true, true );   // Theme support settings
locate_template( 'lib/widgets.php', true, true );         // Custom widgets
locate_template( 'lib/woocommerce.php', true, true );     // Woocommerce settings
locate_template( 'lib/wpml.php', true, true );			  // WPML configuration

?>
