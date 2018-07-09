<?php
/**
 * Theme:				
 * Template:			sidebars.php
 * Description:			Create locations for widgets
 */


/**
 * register_sidebars
 * 
 * Register custom sidebar locations.
 * Repeat the code in the function to register
 * multiple sidebars.
 * 
 * @since	1.0
 */
add_action( 'widgets_init', 'register_sidebars' );
function register_sidebars() {

	// $args = array(
	// 	'id'            => '',
	// 	'class'         => '',
	// 	'name'          => __( '', 'text_domain' ),
	// 	'description'   => __( '', 'text_domain' ),
	// 	'before_title'  => '',
	// 	'after_title'   => '',
	// 	'before_widget' => '<div id="%1$s>',
	// 	'after_widget'  => '</div>',
	// );
	// register_sidebar( $args );

}
