<?php
/**
 * Theme:				Work At Textkernel
 * Template:			customizer.php
 * Description:			Customizer modifications
 */


/**
 * Customizer customizations
 * 
 * Use this hook to create new sections, settings and
 * fields for the customizer section.
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'theme_customizer_register' );
function theme_customizer_register( WP_Customize_Manager $wp_customize ) {

    
	
}

/**
 * customizer_preview_js
 * 
 * Add JavaScript preview controls
 * for the customizer.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/customize_preview_init
 * 
 * Tutorial
 * @link	https://code.tutsplus.com/tutorials/customizer-javascript-apis-getting-started--cms-26838
 */
add_action( 'customize_preview_init', 'customizer_preview_scripts' );
function customizer_preview_scripts() {
	wp_register_script( 'customizer-preview', get_template_directory_uri() . '/js/admin/customizer-preview.js', array( 'jquery' ), false, true );
    wp_enqueue_script( 'customizer-preview' );
}

/**
 * customizer_control_js
 * 
 * Add JavaScript controls for 
 * the customizer
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/customize_controls_enqueue_scripts
 * 
 * Tutorial
 * @link	https://code.tutsplus.com/tutorials/customizer-javascript-apis-getting-started--cms-26838
 */
add_action( 'customize_controls_enqueue_scripts', 'customizer_control_scripts' );
function customizer_control_scripts() {
	wp_register_script( 'customizer-control', get_template_directory_uri() . '/js/admin/customizer-control.js', array( 'jquery' ), false, true );
	wp_enqueue_script( 'customizer-control' );
}