<?php
/**
 *	Theme:
 *	Template:			  theme-support.php
 *	Description:	  Set the core functions of the theme
*/


/**
 *  Register Theme Features
 */
add_action( 'after_setup_theme', 'theme_features' );
function theme_features()  {

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails', array( 'post', 'page' ) );

	// Add theme support for HTML5 Semantic Markup
	add_theme_support( 'html5', array( 'search-form', 'caption' ) );

	// Add theme support for Custom Logo
	add_theme_support( 'custom-logo', array(
		'height'      => '',
		'width'       => '',
		'flex-height' => true,
		'flex-width'  => true,
		'header-text' => array( 'site-title', 'site-description' ),
	) );

  // Add theme support for Image Size
	// add_image_size( 'title', 0, 0, true );

}
