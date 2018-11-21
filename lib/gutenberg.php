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


/**
 * gutenberg_boilerplate_block
 * 
 * Serverside registration of a new Gutenberg
 * block for the gutenberg editor
 * 
 * @type    action (init)
 * @since   1.0
 * 
 */
add_action( 'init', 'gutenberg_boilerplate_block' );
function gutenberg_boilerplate_block() {

    /**
     * Stop if the register_block_type function 
     * does not exist.
     */
    if ( ! function_exists( 'register_block_type' ) ) return;

    /**
     * Register Gutenberg boilerplate JS
     */
    wp_register_script(
        'gutenberg-boilerplate',
        get_template_directory_uri() . '/js/gutenberg/gutenberg.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor' )
    );

    /**
     * Register Gutenberg boilerplate CSS
     */
    wp_register_style(
        'gutenberg-boilerplate',
        get_template_directory_uri() . '/css/gutenberg/gutenberg.css',
        array( 'wp-edit-blocks' )
    );

    /**
     * Gutenberg Boilerplate
     */
    register_block_type( 'control/gutenberg-boilerplate', array(
        'editor_script' => 'gutenberg-boilerplate',
        'editor_style'  => 'gutenberg-boilerplate'
    ) );

}