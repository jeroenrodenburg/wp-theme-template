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

	// Core modifications
	'lib/customizer.php',			// Customizer modifications
	'lib/enqueue.php',				// Enqueue CSS and JS
	'lib/filters.php',				// Filter hooks
	'lib/rest.php',					// Rest API configuration
	'lib/cleanup.php',				// Head cleanup
	
	// Custom additions
	'lib/ajax.php',					// Ajax functions
	'lib/helpers.php',				// Helper functions
	'lib/meta.php',					// Meta functions
	'lib/cookie.php',				// Cookie functions
	
	// Theme customizations
	'lib/admin.php',				// Custom admin settings
	'lib/theme-support.php',		// Theme support configuration
	'lib/navigation.php',			// Navigation registration and Nav Walkers
	'lib/post-types.php',			// Post Types registration
	'lib/taxonomies.php',			// Taxonomies registration
	'lib/sidebars.php',				// Sidebars registration
	'lib/widgets.php',				// Widget registration
	
	// Plugin configurations and modifications
	'lib/gutenberg.php',			// Gutenberg modifications
	'lib/acf.php',					// Advanced Custom Fields
	'lib/gf.php',					// Gravity Form modifications
	'lib/woocommerce.php',			// Woocommerce modifications
	'lib/wpml.php',					// WPML modifications
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
