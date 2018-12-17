<?php
/**
 * Theme:				
 * Template:			class-theme-rest.php
 * Description:			
 */

class Theme_Rest
{

	public function __construct()
	{
		
	}

	protected function add_hooks()
	{
        add_action( 'rest_api_init', array( $this, 'modify_rest_api_response' ) );
        add_action( 'rest_api_init', array( $this, 'modify_rest_api_routes' ) );
	}

	public function modify_rest_api_response()
	{

		// Add featured_media_urls field to post types
        register_rest_field( array( 'post', 'page' ), 
            'featured_media_urls', 
            array(
                'get_callback'		=> array( $this, 'get_featured_media_urls_get_callback' ),	// How to get the data?
                'update_callback'	=> null,								                // How to update the data?
                'schema'			=> null									                // How is the data presented?
            ) 
        );

        // Add terms field to post types
        register_rest_field( array( 'post' ),
            'terms',
            array(
                'get_callback'		=> array( $this, 'get_terms_of_post_get_callback' ),
                'update_callback'	=> null,
                'schema'			=> null
            ) 
        );

    }

    public function modify_rest_api_routes() {

        // Register new route to get data from
        register_rest_route( '/control/v1', 
            '/route/', 
            array(
                'methods'		=> array( 'GET' ),
                'callback'		=> array( $this, 'route_callback' )
            ) 
        );
    
    }
    
    /**
     * get_featured_media_urls_get_callback
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
    public function get_featured_media_urls_get_callback( $object, $field_name, $request ) {

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
     * get_terms_of_post_get_callback
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
    public function get_terms_of_post_get_callback( $object, $field_name, $request ) {

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
     * route_callback
     * 
     * Callback function for REST endpoint.
     * 
     * @param	WP_REST_Request $request
     * @return	any
     */
    public function route_callback( $request ) {
    
    }

}