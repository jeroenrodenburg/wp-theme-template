<?php
/**
 * Theme:
 * Template:			theme-support.php
 * Description:			Set the core functions of the theme
 */


/**
 * add_theme_features
 * 
 * Register theme features
 * Setup support for theme features.
 * Uncomment the features that should not be supported.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Theme_Features
 * @link	https://developer.wordpress.org/reference/functions/add_theme_support/
 */
add_action( 'after_setup_theme', 'add_theme_features' );
function add_theme_features()  {

	// Add theme support for title tag
	add_theme_support( 'title-tag' );

	// Add theme support for post formats
	add_theme_support( 'post-formats', array( 'aside', 'gallery', 'link', 'image', 'quote', 'status', 'video', 'audio', 'chat' ) );

	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );

	// Add theme support for HTML5 Semantic Markup
	add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

	// Add theme support for Custom Logo
	add_theme_support( 'custom-logo', array(
		'height'      => '',
		'width'       => '',
		'flex-height' => true,
		'flex-width'  => true,
		'header-text' => array( 'site-title', 'site-description' ),
	) );

	// Add theme support for Custom Header
	add_theme_support( 'custom-header', array(
		'default-image' => '',
		'random-default' => false,
		'width' => 0,
		'height' => 0,
		'flex-height' => false,
		'flex-width' => false,
		'default-text-color' => '',
		'header-text' => true,
		'uploads' => true,
		'wp-head-callback' => '',
		'admin-head-callback' => '',
		'admin-preview-callback' => '',
		'video' => false,
		'video-active-callback' => 'is_front_page',
	) );

	// Add theme support for Custom Backgrounds
	add_theme_support( 'custom-background', array(
		'default-image' => '',
		'default-preset' => 'default',
		'default-position-x' => 'left',
		'default-position-y' => 'top',
		'default-size' => 'auto',
		'default-repeat' => 'repeat',
		'default-attachment' => 'scroll',
		'default-color' => '',
		'wp-head-callback' => '_custom_background_cb',
		'admin-head-callback' => '',
		'admin-preview-callback' => '',
	) );

	// Add theme support for selective refresh of widgets in customizer
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add theme support for Image Size
	add_image_size( 'retina', 2560, 1600, true );
	add_image_size( 'full-hd', 1920, 1080, true );

	// Add theme support for Woocommerce
	add_theme_support( 'woocommerce' );

}
