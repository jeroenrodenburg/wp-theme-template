<?php
/**
 *  Theme:
 *  Template:       	enqueue.php
 *  Description:    	Add CSS and Javascript to the page
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

	// wp_register_style( 'fancybox', '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css', false, '3.1.20', 'all' );
	// wp_enqueue_style( 'fancybox' );

	// wp_register_style( 'slick', '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css', false, '1.6.0', 'all' );
	// wp_enqueue_style( 'slick' );

	// wp_register_style( 'swiper', '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/css/swiper.min.css', false, '4.2.6', 'all' );
	// wp_enqueue_style( 'swiper' );

	// wp_register_style( 'aos', '//cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css', false, '2.1.1', 'all' );
	// wp_enqueue_style( 'aos' );

	wp_register_style( 'style', get_template_directory_uri() . '/dist/style.css', false, false, 'all' );
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

	// wp_enqueue_script( 'webfontLoader', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', false, false, true );
	// wp_add_inline_script( 'webfontLoader', "WebFont.load({google: {families: ['Open+Sans:300,400,500,600,700']}});" );

	// jQuery for Gravity Forms
	// wp_register_script( 'jquery', '//code.jquery.com/jquery-3.3.1.min.js', false, '3.3.1', true );
	// wp_enqueue_script( 'jquery' );
	
	// jQuery Migrate for using a later version of jQuery
	// wp_register_script( 'jquery-migrate', '//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.0.1/jquery-migrate.min.js', true, '3.0.1', true );
	// wp_enqueue_script( 'jquery-migrate' );

	// wp_register_script( 'fancybox', '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js', array( 'jquery' ), '3.1.20', true );
	// wp_enqueue_script( 'fancybox' );

	// wp_register_script( 'slick', '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js', array( 'jquery' ), '1.6.0', true );
	// wp_enqueue_script( 'slick' );

	// wp_register_script( 'swiper', '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/js/swiper.min.js', false, '4.2.6', true );
	// wp_enqueue_script( 'swiper' );

	// wp_register_script( 'isotope', '//unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', false, '3.0', true );
	// wp_enqueue_script( 'isotope' );

	// wp_register_script( 'aos', '//cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js', false, '2.1.1', true );
	// wp_enqueue_script( 'aos' );

	wp_register_script( 'script', get_template_directory_uri() . '/dist/js/script.js', false, false, true );
	wp_localize_script( 'script', 'wp', array( 
		'ajax' => admin_url( 'admin-ajax.php' ), 
		'theme' => get_template_directory_uri() 
	) );
	wp_enqueue_script( 'script' );

}
