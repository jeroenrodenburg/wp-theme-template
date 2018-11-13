<?php
/**
 * Theme:
 * Template:			helpers.php
 * Description:			Custom functions to use around the theme
 */


/**
 * Get the logo from theme mods and return it if it is present
 *
 * @return	string Returns an URL if the logo is present
 */
function get_the_logo() {
	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
	return !empty( $image ) ? $image[0] : false;
}

/**
 * Print the logo in the document
 * Echoes an URL if the logo is present
 *
 * @uses 	get_the_logo() to get the logo if it is present
 * @return	null
 */
function the_logo() {
	$logo = get_the_logo();
	if ($logo) echo $logo;
	return null;
}

/**
 * get_the_post_term_names
 * 
 * Returns an array with the names
 * of the terms of a taxonomy of the 
 * current or given post.
 * 
 * @link	https://codex.wordpress.org/Function_Reference/wp_get_post_terms
 * 
 * @param	WP_Post $post - Current post object
 * @param	string $taxonomy - Taxonomy to get the terms from
 * @param	array $args - Arguments array for the wp_get_post_terms function
 * @return	array - Array with the names of the posts
 */
function get_the_post_term_names( $post = null, $taxonomy = 'category', $args = array( 'orderby' => 'name', 'order' => 'ASC', 'fields' => 'all' ) ) {
	$term_names = array();
	$terms = wp_get_post_terms( $post->ID, $taxonomy, $args );
	if ( $terms && ! is_wp_error( $terms ) ) {
		foreach( $terms as $term ) {
            $term_names[] = $term->name;
        }
	}
	return $term_names;
}

/**
 * the_post_term_names
 * 
 * Echoes the names of terms
 * of a given taxonomy related
 * to the current post in a string
 * split by a given delimiter.
 *
 * @since	1.0
 * @uses	get_the_post_term_names
 * @param	string $taxonomy - Taxonomy to get the terms from
 * @param	array $args - Arguments array for the wp_get_post_terms function
 * @param 	string $delimiter - String to split the items with
 */
function the_post_term_names( $taxonomy, $args = array( 'orderby' => 'name', 'order' => 'ASC', 'fields' => 'all' ), $delimiter = ', ' ) {
	global $post;
	$term_names = get_the_post_term_names( $post, $taxonomy, $args );
	if ( ! empty( $term_names ) ) {
		$names = join( $delimiter, $term_names );
		echo $names;
	} 
}

/**
 * the_option_terms
 * 
 * Output a taxonomy inside <option> elements.
 *
 * @since	1.0
 * @param 	string $taxonomy
 * @param 	string $orderby
 * @param 	boolean $hide_empty
 */
function the_option_terms( $taxonomy, $orderby = 'menu_order', $hide_empty = false ) {
	$terms = get_terms( array(
		'taxonomy'			=> $taxonomy,
		'orderby'			=> $orderby,
		'hide_empty'		=> $hide_empty
	) );
    if ( $terms && ! is_wp_error( $terms )) {
	    foreach( $terms as $term ) {
			$result = '<option value="' . $term->slug . '" ';
			if ( isset( $_GET[ $taxonomy ] ) ) selected( $_GET[ $taxonomy ], $term->slug );
			$result .= '>' . $term->name . '</option>';
		    echo $result;
	    }
	}
}

/**
 * get_children_terms
 * 
 * Returns a new array with all the children of a taxonomy.
 *
 * @since	1.0
 * @param 	string $tax - The taxonomy to get all the terms from
 * @param 	string $orderby - The order in which the terms are ordered
 * @param 	boolean $hide_empty - True: only show terms with posts. False: show all terms
 * @return  array
 */
function get_children_terms( $taxonomy, $orderby = 'menu_order', $hide_empty = false ) {
	
	// Create new array to store children.
	$terms = array();

	// Get all parent terms.
	$parents = get_terms( array (
			'taxonomy'		=>	$taxonomy,
			'orderby'		=>	$orderby,
			'hide_empty'	=>	$hide_empty,
			'parent'		=>	0
		)
	);

	// Loop over parent terms and add all children to the 
	// $terms array.
	if ( $parents && ! is_wp_error( $parents ) ) {
		foreach ( $parents as $parent ) {

			// Get the child terms
			$children = get_terms( array (
					'taxonomy'		=> $taxonomy,
					'orderby'		=> $orderby,
					'hide_empty'	=> $hide_empty,
					'parent'		=> $parent->term_id
				)
			);

			// Loop over children and add them to $terms array
			if ( $children && ! is_wp_error( $children ) ) {
				foreach ( $children as $child ) {
					array_push( $terms, $child );
				}
			}

		}
	} 
	return $terms;
}

/**
 * get_the_user_ip
 * 
 * Gets IP from client and 
 * returns it in a string.
 *
 * @since	1.0
 * @return	string
 */
function get_the_user_ip() {
	if ( ! empty( $_SERVER[ 'HTTP_CLIENT_IP' ] ) ) {
		$ip = $_SERVER[ 'HTTP_CLIENT_IP' ];
	} else if ( ! empty( $_SERVER[ 'HTTP_X_FORWARDED_FOR' ] ) ) {
		$ip = $_SERVER[ 'HTTP_X_FORWARDED_FOR' ];
	} else {
		$ip = $_SERVER[ 'REMOTE_ADDR' ];
	}
	return $ip;
}

/**
 * is_available_between
 *
 * Checks between two dates if
 * the start date and end date overlap
 * previous start and end dates.
 *
 * @since	1.0
 * @param	date $new_start
 * @param	date $new_end
 * @param	date $prev_start
 * @param	date $prev_end
 * @return	boolean
 */
function is_available_between( $new_start, $new_end, $prev_start, $prev_end ) {
	return (
		( $new_start < $prev_start && 
		$new_end <= $prev_start ) || 
		( $new_start >= $prev_end  && 
		$new_end > $prev_end )
	);
}

/**
 * date_range
 * 
 * Creating date collection between two dates
 *
 * @example
 * // Example 1
 * date_range( '2014-01-01', "2014-01-20", "+1 day", "m/d/Y");
 *
 * @example
 * // Example 2. you can use even time
 * date_range("01:00:00", "23:00:00", "+1 hour", "H:i:s");
 *
 * @since	1.0
 * @author	Ali OYGUR <alioygur@gmail.com>
 * @param	string $first since any date, time or datetime format
 * @param	string $last until any date, time or datetime format
 * @param	string $step step
 * @param	string $format date of output format
 * @return	array
 */
function date_range( $first, $last, $step = '+1 day', $format = 'd/m/Y' ) {

    $dates = array();
    $current = strtotime( $first );
    $last = strtotime( $last );

    while( $current <= $last ) {
        $dates[] = date( $format, $current );
        $current = strtotime( $step, $current );
    }

    return $dates;
}

/**
 * the_breadcrumb
 * 
 * This functions outputs a clickable breadcrumb
 * path with some customization options.
 * 
 * @since	1.0
 * @param	boolean $show_on_home Shows the breadcrumb on home
 * @param	string $delimiter Character or symbol to split the items with
 * @param	string $home Name of home page if it is shown
 * @param	boolean $show_current Insert the current page into breadcrumb
 * @param	string $before Current item html before
 * @param	string $after Current item html after
 */
function the_breadcrumb( $show_on_home = false, $delimiter = '/', $home = 'Home', $show_current = true, $before = '<span class="current">', $after = '</span>' ) {

	global $post;
	$home_link = get_bloginfo( 'url' );
	
	// Home or front page
	if ( is_home() || is_front_page() ) {

		if ( $show_on_home === true ) echo '<div class="breadcrumb"><a href="' . $home_link . '">' . $home . '</a></div>';

	// All other cases
	} else {

		echo '<div class="breadcrumb"><a href="' . $home_link . '">' . $home . '</a> ' . $delimiter . ' ';

		// Category
		if ( is_category() ) {
			$this_cat = get_category( get_query_var( 'cat' ), false );
			if ( $this_cat->parent != 0 ) echo get_category_parents( $this_cat->parent, TRUE, ' ' . $delimiter . ' ' );
			echo $before . 'Archive by category "' . single_cat_title( '', false ) . '"' . $after;
		} 
		
		// Search
		elseif ( is_search() ) {
			echo $before . 'Search results for "' . get_search_query() . '"' . $after;
		} 
		
		// Day
		elseif ( is_day() ) {
			echo '<a href="' . get_year_link( get_the_time( 'Y' )) . '">' . get_the_time( 'Y' ) . '</a> ' . $delimiter . ' ';
			echo '<a href="' . get_month_link( get_the_time( 'Y' ), get_the_time( 'm' )) . '">' . get_the_time( 'F' ) . '</a> ' . $delimiter . ' ';
			echo $before . get_the_time( 'd' ) . $after;
		} 
		
		// Month
		elseif ( is_month() ) {
			echo '<a href="' . get_year_link(get_the_time( 'Y' )) . '">' . get_the_time( 'Y' ) . '</a> ' . $delimiter . ' ';
			echo $before . get_the_time( 'F' ) . $after;
		} 
		
		// Year
		elseif ( is_year() ) {
			echo $before . get_the_time( 'Y' ) . $after;
		} 
		
		// Single but not attachment
		elseif ( is_single() && ! is_attachment() ) {
			if ( get_post_type() != 'post' ) {
				$post_type = get_post_type_object(get_post_type());
				$slug = $post_type->rewrite;
				echo '<a href="' . $home_link . '/' . $slug['slug'] . '/">' . $post_type->labels->singular_name . '</a>';
				if ( $show_current === true ) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
			} else {
				$cat = get_the_category(); $cat = $cat[ 0 ];
				$cats = get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
				if ( $show_current === false ) $cats = preg_replace( "#^(.+)\s$delimiter\s$#", "$1", $cats );
				echo $cats;
				if ( $show_current === true ) echo $before . get_the_title() . $after;
			}
		} 
		
		// Other
		elseif ( ! is_single() && ! is_page() && get_post_type() != 'post' && ! is_404() ) {
			$post_type = get_post_type_object( get_post_type() );
			echo $before . $post_type->labels->singular_name . $after;
		} 
		
		// Attachment
		elseif ( is_attachment() ) {
			$parent = get_post( $post->post_parent );
			$cat = get_the_category( $parent->ID ); $cat = $cat[ 0 ];
			echo get_category_parents( $cat, TRUE, ' ' . $delimiter . ' ' );
			echo '<a href="' . get_permalink( $parent ) . '">' . $parent->post_title . '</a>';
			if ( $show_current === true ) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
		} 
		
		// Page
		elseif ( is_page() && ! $post->post_parent ) {
			if ( $show_current === true ) echo $before . get_the_title() . $after;
		} 
		
		// Page with parent
		elseif ( is_page() && $post->post_parent ) {
			$parent_id  = $post->post_parent;
			$breadcrumbs = array();
			while ( $parent_id ) {
				$page = get_page( $parent_id );
				$breadcrumbs[] = '<a href="' . get_permalink( $page->ID ) . '">' . get_the_title( $page->ID ) . '</a>';
				$parent_id  = $page->post_parent;
			}
			$breadcrumbs = array_reverse( $breadcrumbs );
			for ( $i = 0; $i < count( $breadcrumbs ); $i++ ) {
				echo $breadcrumbs[ $i ];
				if ( $i != count( $breadcrumbs ) -1 ) echo ' ' . $delimiter . ' ';
			}
			if ( $show_current === true ) echo ' ' . $delimiter . ' ' . $before . get_the_title() . $after;
		} 
		
		// Tag
		elseif ( is_tag() ) {
			echo $before . 'Posts tagged "' . single_tag_title( '', false ) . '"' . $after;
		} 
		
		// Author
		elseif ( is_author() ) {
			global $author;
			$userdata = get_userdata( $author );
			echo $before . 'Articles posted by ' . $userdata->display_name . r;
		} 
		
		// 404
		elseif ( is_404() ) {
			echo $before . 'Error 404' . $after;
		}

		// Pagination
		if ( get_query_var( 'paged' ) ) {
			if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ' (';
			echo __( 'Page' ) . ' ' . get_query_var( 'paged' );
			if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ')';
		}
		echo '</div>';

	}

}

/**
 * get_reading_time
 * 
 * Calculate the reading time based on 
 * the amount of words divided by the
 * average reading speed per word.
 * 
 * @since	1.0
 * @param	WP_Post $post
 * @param	integer $wpm Average words per minute
 * @return	integer
 */
function get_reading_time( $post = null, $wpm = 302 ) {
	$content = get_the_content();
	$words = explode( ' ', $content );
	$length = count( $words );
	$minutes = round( $length / $wpm );
	if ( $minutes < 1 ) $minutes = 1;
	return $minutes;
}

/**
 * the_reading_time
 * 
 * Gets the reading time of the 
 * current post and echoes it.
 * 
 * @since	1.0
 */
function the_reading_time() {
	global $post;
	$reading_time = get_reading_time( $post );
	echo $reading_time;
}
