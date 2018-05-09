<?php
/**
 * Theme:
 * Template:			ajax.php
 * Description:			Ajax related functions
 */


/**
 * Load more function
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
	$post_type              = isset( $_GET[ 'post_type' ] ) ? array( $_GET[ 'post_type' ] ) : array( 'POST_TYPE' ); // Change POST_TYPE
	$posts_per_page         = isset( $_GET[ 'posts_per_page' ] ) ? array( $_GET[ 'posts_per_page' ] ) : -1;         // Change -1 to desired amount of posts

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
	// if ( isset( $_GET[ 'TAXONOMY' ] ) && $_GET[ 'TAXONOMY' ] !== '' ) {
	// 	$args[ 'tax_query' ][] = array(
	// 		'taxonomy'			=> 'TAXONOMY',
	// 		'field'				=> 'slug',
	// 		'terms'				=> $_GET[ 'TAXONOMY' ]
	// 	);
	// }

	// Create an results array for storing all the results.
	// We only want a few very specific field for the markers like location and title.
	$results = array();

	// We create the query and start looping through all of the posts.
	// Every post that is a hit will be stored in our $results array.
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
			array_push( $results, array(
				'title'			=> get_the_title(),
				'content'		=> get_the_content(),
				'location'		=> get_field( 'location' ),
				'thumbnail'		=> get_the_post_thumbnail(),
				'permalink'		=> get_the_permalink()
			) );
		
		} wp_reset_postdata(); 
	}

	// We convert the results into JSON so that it is readable for JavaScript.
	// Finally we echo the $json_result and send it to the client.
	$json_result = json_encode( $results );
	echo $json_result;

	wp_die();
}

/**
 * Post JSON Ajax
 * 
 * Send and receive JSON file through POST request
 */
add_action( 'wp_ajax_nopriv_post_json_ajax', 'post_json_ajax' );
add_action( 'wp_ajax_post_json_ajax', 'post_json_ajax' );
function post_json_ajax() {
	header( 'Content-Type: text/html' );
	
	// Get the JSON file that is sent
	$query = file_get_contents('php://input');

	// Decode the JSON to workable PHP
	$json = json_decode($query);

	/**
	 * Do some thing here with the $json data
	 */
	
	// Send back a response
	echo true;
	
	wp_die();
}