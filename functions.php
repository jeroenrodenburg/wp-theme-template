<?php
/**
 * Theme:
 * Template:			functions.php
 * Description:			Overview of all theme functionality
 * 
 * @package 	WordPress
 * @subpackage	Control Theme Template
 *
 * Control WP Theme boilerplate
 * 
 * Use this theme to kickstart yourself into development.
 * Start off by defining these constants here below.
 */
define( 'THEME_NAME', 'THEMENAME' );
define( 'THEME_VERSION', 1.0 );
define( 'THEME_DEV_MODE', true );

/**
 * All the files and definitions should be placed
 * in the LIB folder and be called here below.
 * 
 * @example
 * locate_template( 'path-to-folder.php', true, true );
 */
$templates = array(
	'lib/core/cleanup.php',          // Head cleanup
	'lib/core/ajax.php',             // Ajax functions
	'lib/core/cookie.php',           // Cookie related functions
	'lib/core/filters.php',          // Filter hooks
	'lib/core/helpers.php',          // Helper functions
	'lib/core/meta.php',             // Meta functions

	'lib/theme/customizer.php',       // Customizer modifications
	'lib/theme/rest.php',             // Rest settings
	'lib/theme/enqueue.php',          // Enqueue CSS and JS
	'lib/theme/admin.php',            // Custom admin settings
	'lib/theme/theme-support.php',    // Theme support settings
	'lib/theme/navigation.php',       // Navigation registration and Walkers
	'lib/theme/post-types.php',       // Custom post types
	'lib/theme/taxonomies.php',       // Custom taxonomies
	'lib/theme/sidebars.php',         // Sidebar registration
	'lib/theme/widgets.php',          // Custom widgets

	'lib/plugins/gutenberg.php',        // Gutenberg modifications
	'lib/plugins/acf.php',              // Advanced Custom Fields
	'lib/plugins/gf.php',               // Gravity Forms
	'lib/plugins/woocommerce.php',      // Woocommerce settings
	'lib/plugins/wpml.php',             // WPML configuration
);

/**
 * Loop trough all the templates and locate them.
 */
if ( ! empty( $templates ) ) {
	foreach ( $templates as $template ) {
		locate_template( $template, true, true );
	}
}

?>
