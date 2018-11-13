<?php
/**
 * Theme:			
 * Template:			gutenberg.php
 * Description:			Gutenberg modifications
 */


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