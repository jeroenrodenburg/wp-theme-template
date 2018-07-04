<?php
/**
 * Theme:
 * Template:       		enqueue.php
 * Description:    		Add CSS and Javascript to the page
 */


/**
 * Theme styles
 * Add styles for the theme
 * 
 * @since	1.0
 */
add_action( 'wp_enqueue_scripts', 'theme_styles' );
function theme_styles() {

	// wp_register_style( 'flexgrid', get_template_directory_uri() . '/css/flexgrid/flexgrid.min.css', false, false, 'all' );
	// wp_enqueue_style( 'flexgrid' );

	// wp_register_style( 'animate', get_template_directory_uri() . '/css/animate/animate.css', false, false, 'all' );
	// wp_enqueue_style( 'animate' );

	/**
	 * Fancybox
	 * @link	http://fancyapps.com/fancybox/3/docs/
	 */
	// wp_register_style( 'fancybox', '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.css', false, '3.1.20', 'all' );
	// wp_enqueue_style( 'fancybox' );

	/**
	 * Slick
	 * @link	http://kenwheeler.github.io/slick/
	 */
	// wp_register_style( 'slick', '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css', false, '1.9.0', 'all' );
	// wp_enqueue_style( 'slick' );

	/**
	 * Swiper
	 * @link	http://idangero.us/swiper/api/
	 */
	// wp_register_style( 'swiper', '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/css/swiper.min.css', false, '4.2.6', 'all' );
	// wp_enqueue_style( 'swiper' );

	/**
	 * aos - Animate On Scroll
	 * @link	https://github.com/michalsnik/aos
	 */
	// wp_register_style( 'aos', '//cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.css', false, '2.1.1', 'all' );
	// wp_enqueue_style( 'aos' );

	wp_register_style( 'style', get_template_directory_uri() . '/dist/css/style.css', false, false, 'all' );
	wp_enqueue_style( 'style' );

}

/**
 * Theme scripts
 * Add scripts to the head or body
 * 
 * @since	1.0
 */
add_action( 'wp_enqueue_scripts', 'theme_scripts' );
function theme_scripts() {

	wp_deregister_script( 'wp-embed' );
	wp_deregister_script( 'jquery' );

	/**
	 * WebfontLoader
	 * @link	https://github.com/typekit/webfontloader
	 */
	// wp_enqueue_script( 'webfontLoader', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js', false, false, true );
	// wp_add_inline_script( 'webfontLoader', "WebFont.load({google: {families: ['Open+Sans:300,400,500,600,700']},custom:{families:['FontAwesome'],urls:['//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css']}});" );

	/**
	 * jQuery 
	 * @link	http://api.jquery.com/
	 */
	// wp_register_script( 'jquery', '//code.jquery.com/jquery-3.3.1.min.js', false, '3.3.1', true );
	// wp_enqueue_script( 'jquery' );
	
	/**
	 * jQuery Migrate 
	 * for using a later version of jQuery
	 * @link	https://github.com/jquery/jquery-migrate
	 */
	// wp_register_script( 'jquery-migrate', '//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.0.1/jquery-migrate.min.js', true, '3.0.1', true );
	// wp_enqueue_script( 'jquery-migrate' );

	/**
	 * Fancybox
	 * @link	http://fancyapps.com/fancybox/3/docs/
	 */
	// wp_register_script( 'fancybox', '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.1.20/jquery.fancybox.min.js', array( 'jquery' ), '3.1.20', true );
	// wp_enqueue_script( 'fancybox' );

	/**
	 * Slick
	 * @link	http://kenwheeler.github.io/slick/
	 */
	// wp_register_script( 'slick', '//cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', array( 'jquery' ), '1.9.0', true );
	// wp_enqueue_script( 'slick' );

	/**
	 * Swiper
	 * @link	http://idangero.us/swiper/api/
	 */
	// wp_register_script( 'swiper', '//cdnjs.cloudflare.com/ajax/libs/Swiper/4.2.6/js/swiper.min.js', false, '4.2.6', true );
	// wp_enqueue_script( 'swiper' );

	/**
	 * Isotope
	 * @link	https://isotope.metafizzy.co/
	 */
	// wp_register_script( 'isotope', '//unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js', false, '3.0', true );
	// wp_enqueue_script( 'isotope' );

	/**
	 * Masonry
	 * @link	https://masonry.desandro.com/
	 */
	// wp_register_script( 'masonry', '//unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js', false, '4.0', true );
	// wp_enqueue_script( 'masonry' );

	/**
	 * Packery
	 * @link	https://packery.metafizzy.co/
	 */
	// wp_register_script( 'packery', '//unpkg.com/packery@2/dist/packery.pkgd.min.js', false, '2.0', true );
	// wp_enqueue_script( 'packery' );

	/**
	 * aos - Animate On Scroll
	 * @link	https://github.com/michalsnik/aos
	 */
	// wp_register_script( 'aos', '//cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js', false, '2.1.1', true );
	// wp_enqueue_script( 'aos' );

	/**
	 * Anime
	 * @link	http://animejs.com/documentation/
	 */
	// wp_register_script( 'anime', '//cdnjs.cloudflare.com/ajax/libs/animejs/2.0.0/anime.min.js', false, '2.0.0', true );
	// wp_enqueue_script( 'anime' );

	/**
	 * Three
	 * @link	https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene
	 */
	// wp_register_script( 'threejs', '//cdnjs.cloudflare.com/ajax/libs/three.js/93/three.min.js', false, '93', true );
	// wp_enqueue_script( 'threejs' );

	/**
	 * Google Maps
	 * @link	https://developers.google.com/maps/documentation/javascript/tutorial
	 * @link	https://developers.google.com/maps/documentation/javascript/reference/3.exp/
	 */
	// $api_key = '';
	// $libraries = array( 'geometry', 'places' );
	// if ( !empty( $libraries ) ) $api_key .= '&libraries=' . join(',', $libraries);
	// wp_register_script( 'google-maps', '//maps.googleapis.com/maps/api/js?key=' . $api_key, false, false, true );
	// wp_enqueue_script( 'google-maps');

	wp_register_script( 'script', get_template_directory_uri() . '/dist/js/script.js', false, false, true );
	wp_localize_script( 'script', 'wp', array( 
		'ajax' => admin_url( 'admin-ajax.php' ), 
		'theme' => get_template_directory_uri()
	) );
	wp_enqueue_script( 'script' );

}
