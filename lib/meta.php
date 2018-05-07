<?php
/**
 * Theme:
 * Template:			meta.php
 * Description:         Metadata related functions
 */

/**
 * get_post_views
 * 
 * Retrieves the 'post_views_count' meta field of a post.
 * 
 * @param   post $post
 * @return  string
 */
function get_post_views( $post = null ) {
    $count_key = 'post_views_count';
    $count = get_post_meta( $post->ID, $count_key, true );
    if ( $count == '' ) {
        delete_post_meta( $post->ID, $count_key );
        add_post_meta( $post->ID, $count_key, '0' );
        return '0 Views';
    }
    return $count . ' Views';
}

/**
 * the_post_views
 * 
 * Echoes the result of get_post_views.
 * Uses get_post_views to get the result
 * 
 * @uses    get_post_views
 * @since   1.0
 * @param   post $post
 */
function the_post_views( $post = null ) {
    $post_views = get_post_views( $post );
    echo $post_views;
}

/**
 * set_post_views
 * 
 * Adds 1 to the 'post_views_count' meta key and creates
 * the key if the meta key doesn't exist
 * 
 * @since   1.0
 * @param   post $post
 */
function set_post_views( $post = null ) {
    $count_key = 'post_views_count';
    $count = get_post_meta( $post->ID, $count_key, true );
    if( $count == '' ) {
        $count = 0;
        delete_post_meta( $post->ID, $count_key );
        add_post_meta( $post->ID, $count_key, '0' );
    }else{
        $count++;
        update_post_meta( $post->ID, $count_key, $count );
    }
}

/**
 * reset_post_views
 * 
 * Resets the 'post_views_count' of the post to 0
 * or creates the meta key if it doesn't exist.
 * 
 * @since   1.0
 * @param   post $post
 */
function reset_post_views( $post = null ) {
	$count_key = 'post_views_count';
	$count = get_post_meta( $post->ID, $count_key, true );
	if ( $count == '' ) {
		delete_post_meta($post->ID, $count_key);
        add_post_meta($post->ID, $count_key, '0');
	} else {
		update_post_meta( $post->ID, $count_key, '0' );	
	}
}

//To keep the count accurate, lets get rid of prefetching
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);

/**
 * Add the 'post_views_count' meta field to a
 * newly created post
 */
add_action( 'wp_insert_post', 'add_post_views_count_key_to_post', 10, 3 );
function add_post_views_count_key_to_post( $post_id, $post, $update ) {
    set_post_views( $post );
}