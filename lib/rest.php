<?php
/**
 * Theme:				
 * Template:			rest.php
 * Description:			REST API Settings
 */


/** 
 * Disabled REST API
 * 
 * Uncomment disable the REST API from this 
 * theme. Currently standard uncommented to prevent
 * human errors.
 */
add_filter( 'json_enabled', '__return_false' );
add_filter( 'json_jsonp_enabled', '__return_false' );
remove_action( 'xmlrpc_rsd_apis', 'rest_output_rsd' );
remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
remove_action( 'template_redirect', 'rest_output_link_header', 11 );

/**
 * Modify REST API responses
 * 
 * Register new fields for responses
 * and modify requests. 
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/rest_api_init-3/
 * @link	https://developer.wordpress.org/reference/functions/register_rest_field/
 */
add_action( 'rest_api_init', 'modify_rest_api_response' );
function modify_rest_api_response() {

	// Add featured_media_urls field to post types
	register_rest_field( array( 'post', 'page' ), 
		'featured_media_urls', 
		array(
			'get_callback'		=> 'get_featured_media_urls_callback',	// How to get the data?
			'update_callback'	=> null,								// How to update the data?
			'schema'			=> null									// How is the data presented?
		) 
	);

	// Add terms field to post types
	register_rest_field( array( 'post' ),
		'terms',
		array(
			'get_callback'		=> 'get_terms_of_post_callback',
			'update_callback'	=> null,
			'schema'			=> null
		) 
	);

}

/**
 * get_featured_media_urls_callback
 * 
 * Gets the URLs of the post thumbnail in different
 * sizes. Sizes can be adjusted.
 * 
 * @since	1.0
 * @param	WP_Post $object
 * @param	string $field_name
 * @param	WP_REST_Request $request
 * @return	array
 */
function get_featured_media_urls_callback( $object, $field_name, $request ) {

	// Create array to store URLs in
	$urls = array();

	// Get ID of post
	$id = $object[ 'id' ];

	// If has post thumbnail add the image sizes
	if ( has_post_thumbnail( $id ) ) {

		// Sizes to include
		$sizes = array( 'thumbnail', 'medium', 'large', 'full', 'full-hd', 'retina' );
		foreach ( $sizes as $size ) {
			array_push( $urls, get_the_post_thumbnail_url( $id, $size ) );
		}

	}

	// Return the URLs list
	return $urls;
}

/**
 * get_terms_of_post_callback
 * 
 * Returns a nested list of categories
 * with the terms of the post
 * 
 * @since	1.0
 * @param	WP_Post $object
 * @param	string $field_name
 * @param	WP_REST_Request $request
 * @return	array
 */
function get_terms_of_post_callback( $object, $field_name, $request ) {

	// Create array for taxonomies
	$taxonomies = array();

	// Get all taxonomies connected to the post
	$taxonomy_names = get_post_taxonomies( $object );
	if ( ! empty( $taxonomy_names ) && ! is_wp_error( $taxonomy_names ) ) {

		// Loop over the taxonomy names and create an array per name
		foreach ( $taxonomy_names as $tax_name ) {
			$taxonomies[ $tax_name ] = array();

			// Add the terms of the taxonomy to the array
			$terms = get_the_terms( $object, $tax_name );
			if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
				foreach ( $terms as $term ) {

					// Add the terms to the taxonomy
					array_push( $taxonomies[ $tax_name ], 
						array(
							'name'		=> $term->name,
							'slug'		=> $term->slug,
							'term_id'	=> $term->term_id
						) 
					);

				}
			}

		}

	}

	// Return the taxonomies list
	return $taxonomies;

}

/**
 * update_callback
 * 
 * Function that is fired when the POST or UPDATE
 * request is fired on this field.
 * Modify the function
 * 
 * @since	1.0
 * @param	post_id $id
 * @param	string $value
 * 
 */
// function update_callback( $id, $value ) {
	
// }

/**
 * Modify REST API routes
 * 
 * Register new routes and use them
 * to get custom data.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/rest_api_init-3/
 * @link	https://developer.wordpress.org/reference/functions/register_rest_route/
 */
add_action( 'rest_api_init', 'modify_rest_api_routes' );
function modify_rest_api_routes() {

	// Register new route to get data from
	register_rest_route( '/control/v1', 
		'/route/', 
		array(
			'methods'		=> array( 'GET' ),
			'callback'		=> 'route_callback'
		) 
	);

}

/**
 * route_callback
 * 
 * Callback function for REST endpoint.
 * 
 * @param	WP_REST_Request $request
 * @return	any
 */
function route_callback( $request ) {

}