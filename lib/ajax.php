<?php
/**
 * Theme:
 * Template:			ajax.php
 * Description:			Ajax related functions
 */


/**
 * load_ajax
 * 
 * Generic boilerplate function for handling
 * an AJAX request 
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_nopriv_(action)
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)
 */
add_action( 'wp_ajax_nopriv_load_ajax', 'load_ajax') ;
add_action( 'wp_ajax_load_ajax', 'load_ajax' );
function load_ajax() {
	header( 'Content-Type: text/html' );
	global $post;
	
	// get_template_part( '' );

	wp_die();
}

/**
 * get_posts_ajax
 * 
 * Generic HTTP GET response that processes
 * all the parameter put through the query
 * to get the posts requested.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_nopriv_(action)
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/wp_ajax_(action)
 * @return	string
 */
add_action( 'wp_ajax_nopriv_get_posts_ajax', 'get_posts_ajax') ;
add_action( 'wp_ajax_get_posts_ajax', 'get_posts_ajax' );
function get_posts_ajax() {
	header( 'Content-Type: text/html' );

	// If nonce is not correct do not send a response
	if ( ! $_GET[ '_wp_nonce' ] || ! wp_verify_nonce( $_GET[ '_wp_nonce' ], 'NONCE_NAME' ) ) wp_die(); 

	// Get the variables from the GET Request
	$query_post_type		= isset( $_GET[ 'post_type' ] ) ? explode( ',', $_GET[ 'post_type' ] ) : array( 'POST_TYPE' ); 		// Change POST_TYPE for default post type
	$query_posts_per_page	= isset( $_GET[ 'posts_per_page' ] ) ? $_GET[ 'posts_per_page' ] : -1;         						// Change -1 to desired amount of posts
	$query_paged			= isset( $_GET[ 'paged' ] ) ? $_GET[ 'paged' ] : 1;
	$query_offset			= isset( $_GET[ 'offset' ] ) ? $_GET[ 'offset' ] : 0;
	$query_order 			= isset( $_GET[ 'order' ] ) ? $_GET[ 'order' ] : 'ASC';
	$query_order_by			= isset( $_GET[ 'orderby' ] ) ? $_GET[ 'order_by' ] : 'menu_order';
	$query_p				= isset( $_GET[ 'p' ] ) ? $_GET[ 'p' ] : '';
	$query_s				= isset( $_GET[ 's' ] ) ? $_GET[ 's' ] : '';
	$query_post__in			= isset( $_GET[ 'post__in'] ) ? explode( ',', $_GET[ 'post__in' ] ) : array();
	$query_post__not_in		= isset( $_GET[ 'post__not_in' ] ) ? explode( ',', $_GET[ 'post__not-in' ] ) : array();
	$query_meta_key			= isset( $_GET[ 'meta_key' ] ) ? $_GET[ 'meta_key' ] : '';
	$query_meta_value		= isset( $_GET[ 'meta_value' ] ) ? $_GET[ 'meta_value' ] : '';

	// Set arguments for query
	$args = array(
		'post_type'			=> $query_post_type,
		'posts_per_page'	=> $query_posts_per_page,
		'paged'				=> $query_paged,
		'offset'			=> $query_offset,
		'order'				=> $query_order,
		'orderby'			=> $query_order_by,
		'p'					=> $query_p,
		's'					=> $query_s,
		'post__in'			=> $query_post__in,
		'post__not_in'		=> $query_post__not_in,
		'meta_key'			=> $query_meta_key,
		'meta_value'		=> $query_meta_value,
		'tax_query'			=> array()
	);

	// Fields to ignore for taxonomies
	$excludes = array(
		'action',
		'post_type',
		'posts_per_page',
		'paged',
		'offset',
		'order',
		'orderby',
		'p',
		's',
		'post__in',
		'post__not_in',
		'_wp_nonce',
		'_wp_referrer'
	);

	// Loop over remaining query items and pass them as taxonomy filters
	if ( ! empty( $_GET ) ) {
		foreach( $_GET as $item => $value ) {
			if ( ! in_array( $value, $excludes ) ) {
				$args[ 'tax_query' ][] = array(
					'taxonomy'			=> $item,
					'field'				=> 'slug',
					'terms'				=> $value
				);		
			}
		}
	}

	// Create a new query
	$query = new WP_Query( $args );

	// Loop over the query
	if ( $query->have_posts() ) {
		while ( $query->have_posts() ) {
			$query->the_post();
			$post_type = get_post_type();

			// get_template_part( '' );
		}
	}

	// End connection
	die();
}

/**
 * Get markers of a certain post type
 * 
 * @return JSON 
 */
add_action( 'wp_ajax_nopriv_get_markers_ajax', 'get_markers_ajax' );
add_action( 'wp_ajax_get_markers_ajax', 'get_markers_ajax' );
function get_markers_ajax() {
	header( 'Content-Type: text/html' );

	// This template can be used to get JSON data for maps.
	// Fill in the variables below to get the markers of the post type you want.
	$post_type              = isset( $_GET[ 'post_type' ] ) ? explode( ',', $_GET[ 'post_type' ] ) : array( 'POST_TYPE' ); // Change POST_TYPE
	$posts_per_page         = isset( $_GET[ 'posts_per_page' ] ) ? $_GET[ 'posts_per_page' ] : -1;         // Change -1 to desired amount of posts

	// Arguments for the Query
	// These can be modified according to the WP_Query Arguments
	$args = array(
		'post_type'			=> $post_type,
		'post_status'		=> 'publish',
		'posts_per_page'	=> $posts_per_page,
		'tax_query'			=> array(
			'relationship'		=> 'AND',
		)
	);

	/**
	 * Uncomment the code below to unlock the ability to filter.
	 * The fields containing uppercase letters like TAXONOMY are to be replaced with 
	 * the desired taxonomies to filter on.
	 * 
	 * If more filters are needed, simply copy the entire if statement and modify the taxonomy.
	 * 
	 * @example 
	 * GET: http://website.com/wp-admin/admin-ajax.php?action=get_markers&TAXONOMY=VALUE
	 * $_GET[ 'TAXONOMY' ] === VALUE
	 * 
	 */
	// Fields to ignore for taxonomies
	$excludes = array(
		'action',
		'post_type',
		'posts_per_page',
		'paged',
		'offset',
		'order',
		'orderby',
		'p',
		's',
		'post__in',
		'post__not_in',
		'_wp_nonce',
		'_wp_referrer'
	);

	// Loop over remaining query items and pass them as taxonomy filters
	if ( ! empty( $_GET ) ) {
		foreach( $_GET as $item => $value ) {
			if ( ! in_array( $item, $excludes ) ) {
				$args[ 'tax_query' ][] = array(
					'taxonomy'			=> $item,
					'field'				=> 'slug',
					'terms'				=> $value
				);		
			}
		}
	}

	// Create a results array for storing all the markers.
	// We only want a few very specific field for the markers like location and title.
	$markers = array();

	// We create the query and start looping through all of the posts.
	// Every post that is a hit will be stored in our $markers array.
	$query = new WP_Query( $args );
	if ( $query->have_posts() ) { 
		while ( $query->have_posts() ) { 
			$query->the_post();
		
			/**
			 * Here we add the results to the array with the fields we want.
			 * 
			 * @example
			 * title
			 * content
			 * location
			 * thumbnail
			 * permalink
			 * 
			 * More fields can be added in the same way.
			 * Also ACF Fields with the get_field() function.
			 */
			array_push( $markers, array(
				'title'			=> get_the_title(),
				'content'		=> get_the_content(),
				'location'		=> get_field( 'ACF_GOOGLE_MAPS_FIELD' ),
				'thumbnail'		=> get_the_post_thumbnail(),
				'permalink'		=> get_the_permalink()
			) );
		
		} wp_reset_postdata(); 
	}

	// We convert the markers into JSON so that it is readable for JavaScript.
	// Finally we echo the $json_result and send it to the client.
	$json_result = json_encode( $markers );
	echo $json_result;

	die();
}

/**
 * Post JSON Ajax
 * 
 * Send and receive JSON file through POST request
 * 
 * @since	1.0
 */
add_action( 'wp_ajax_nopriv_post_json_ajax', 'post_json_ajax' );
add_action( 'wp_ajax_post_json_ajax', 'post_json_ajax' );
function post_json_ajax() {
	header( 'Content-Type: text/html' );
	
	// Get the JSON file that is sent
	$query = file_get_contents( 'php://input' );

	// Decode the JSON to workable PHP
	$json = json_decode( $query );

	/**
	 * Do some thing here with the $json data
	 */
	
	// Send back a response
	echo true;
	
	die();
}