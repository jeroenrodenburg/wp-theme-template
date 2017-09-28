<?php
/**
 *  Theme:
 *  Template:       enqueue.php
 *  Description:    Add CSS and Javascript to the page
 */


/**
 *  Theme styles
 *  Add styles for the theme
 */
add_action( 'wp_enqueue_scripts', 'theme_styles' );
function theme_styles() {

  // wp_register_style( 'flexgrid', get_template_directory_uri() . '/css/flexgrid/flexgrid.min.css', false, false, 'all' );
  // wp_enqueue_style( 'flexgrid' );

  // wp_register_style( 'animate', get_template_directory_uri() . '/css/animate/animate.css', false, false, 'all' );
  // wp_enqueue_style( 'animate' );

  // wp_register_style( 'slick', '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css', false, '1.6.0', 'all' );
	// wp_enqueue_style( 'slick' );

  // wp_register_style( 'fancybox', '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css', false, '3.1.20', 'all' );
	// wp_enqueue_style( 'fancybox' );

  wp_register_style( 'style', get_template_directory_uri() . '/style.css', false, false, 'all' );
	wp_enqueue_style( 'style' );

}

/**
 *  Theme scripts
 *  Add scripts to the head or body
 */
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
function theme_scripts() {

  wp_deregister_script( 'wp-embed' );
	wp_deregister_script( 'jquery' );

  // wp_register_script( 'jquery', '//code.jquery.com/jquery-2.2.4.min.js', false, '2.2.4', false );
	// wp_enqueue_script( 'jquery' );
	//
	// wp_register_script( 'jquery-migrate', '//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/1.4.1/jquery-migrate.min.js', false, '1.4.1', false);
	// wp_enqueue_script( 'jquery-migrate' );

  // wp_register_script( 'fancybox', '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js', array( 'jquery'), '3.1.20', true );
	// wp_enqueue_script( 'fancybox' );

  // wp_register_script( 'slick', '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', array( 'jquery' ), '1.6.0', true );
  // wp_enqueue_script( 'slick' );

  // wp_register_script( 'isotope', '//unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', false, '3.0', true );
  // wp_enqueue_script( 'isotope' );

  // wp_register_script( 'spotter', get_template_directory_uri() . '/js/spotter/spotter.min.js', false, false, true );
  // wp_enqueue_script( 'spotter' );
  //
  // wp_register_script( 'slider', get_template_directory_uri() . '/js/slider/slider.min.js', false, false, true );
  // wp_enqueue_script( 'slider' );

  wp_register_script( 'script', get_template_directory_uri() . '/js/script.js', false, false, true );
  wp_localize_script( 'script', 'ajax', array( 'url' => admin_url( 'admin-ajax.php' ) ) );
  wp_enqueue_script( 'script' );

}
