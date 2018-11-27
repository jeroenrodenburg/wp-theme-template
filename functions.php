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
 */
$templates = array(
	
	// Core
	'lib/core/ajax.php',				// Ajax functions
	'lib/core/cleanup.php',				// Head cleanup
	'lib/core/filters.php',				// Filter hooks
	'lib/core/helpers.php',				// Helper functions
	'lib/core/meta.php',				// Meta functions
	'lib/core/cookie.php',				// Cookie functions
	
	// Theme
	'lib/theme/theme-support.php',		// Theme support configuration
	'lib/theme/post-types.php',			// Post Types registration
	'lib/theme/gutenberg.php',			// Gutenberg modifications
	'lib/theme/taxonomies.php',			// Taxonomies registration
	'lib/theme/navigation.php',			// Navigation registration and Nav Walkers
	'lib/theme/customizer.php',			// Customizer modifications
	'lib/theme/enqueue.php',			// Enqueue CSS and JS
	'lib/theme/admin.php',				// Custom admin settings
	'lib/theme/rest.php',				// Rest API configuration
	'lib/theme/sidebars.php',			// Sidebars registration
	'lib/theme/widgets.php',			// Widget registration
	
	// Plugin
	'lib/plugins/acf.php',				// Advanced Custom Fields
	'lib/plugins/gf.php',				// Gravity Form modifications
	'lib/plugins/woocommerce.php',		// Woocommerce modifications
	'lib/plugins/wpml.php',				// WPML modifications
);

/**
 * Loop over all the paths and locate the
 * templates. This will include all files into
 * this functions.php file.
 */
foreach ( $templates as $template ) {
	locate_template( $template, true, true );
}

?>
