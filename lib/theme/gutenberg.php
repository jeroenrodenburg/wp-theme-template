<?php
/**
 * Theme:			
 * Template:			gutenberg.php
 * Description:			Gutenberg modifications
 */


/**
 * add_gutenberg_features
 * 
 * Register gutenberg features
 * Setup support for theme features.
 * Comment the features that should not be supported.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Theme_Features
 * @link	https://developer.wordpress.org/reference/functions/add_theme_support/
 */
add_action( 'after_setup_theme', 'add_gutenberg_features' );
function add_gutenberg_features() {

	// Gutenberg align wide
	add_theme_support( 'align-wide' );

	// Gutenberg custom colors
	add_theme_support( 'editor-color-palette', array(

		array(
			'name'      => __( 'Control Blue', 'control' ),
			'slug'      => 'control-blue',
			'color'     => '#384752',
        ),
        
	) );
	
	// Gutenberg font sizes
	add_theme_support( 'editor-font-sizes', array(
        
		array(
			'name' 			=> __( 'small', 'control' ),
			'shortName' 	=> __( 'S', 'control' ),
			'size' 			=> 12,
			'slug' 			=> 'small'
        ),
        
	) );

	// Gutenberg editor styles
	add_theme_support( 'editor-styles' );
	add_theme_support( 'dark-editor-style' );

	// Gutenberg use default block styles
	add_theme_support( 'wp-block-styles' );

	// Gutenberg use responsive embeds
	add_theme_support( 'responsive-embeds' );

}