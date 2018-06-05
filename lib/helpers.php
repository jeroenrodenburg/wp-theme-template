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
 * Outputs the post taxonomy terms, seperated with comma's
 *
 * @param 	object $post
 * @param 	string $category
 * @param 	array $args
 * @param 	string $delimiter
 */
function the_post_terms( $post, $category, $args = array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all'), $delimiter = ', ' ) {
    $terms = wp_get_post_terms( $post->ID, $category, $args );
    if ( $terms && ! is_wp_error( $terms )) {
        $subjects_list = array();
        foreach( $terms as $term ) {
            $subjects_list[] = $term->name;
        }
        $subjects = join($delimiter, $subjects_list);
        echo $subjects;
    }
}

/**
 * Output a taxonomy inside <option> elements
 *
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
 * Returns a new array with all the children of a taxonomy
 *
 * @param 	string $tax - The taxonomy to get all the terms from
 * @param 	string $orderby - The order in which the terms are ordered
 * @param 	boolean $hide_empty - True: only show terms with posts. False: show all terms
 * @return  (array|boolean)
 */
function get_children_terms( $tax, $orderby = 'menu_order', $hide_empty = false ) {
	$result = array();
	$parents = get_terms( array (
			'taxonomy'		=>	$tax,
			'orderby'		=>	$orderby,
			'hide_empty'	=>	$hide_empty,
			'parent'		=>	0
		)
	);
	if ( $parents && !is_wp_error( $parents ) ) {
		foreach ( $parents as $parent ) {
			$children = get_terms( array (
				'taxonomy'		=> $tax,
				'orderby'		=> $orderby,
				'hide_empty'	=> $hide_empty,
				'parent'		=> $parent->term_id
				)
			);
			if ( $children && !is_wp_error( $children) ) {
				foreach ( $children as $child ) {
					array_push( $result, $child );
				}
			}
		}
		return $result;
	} else {
		return false;
	}
}

/**
 * Echoes custom output based on the post type
 *
 * @param	string $post
 */
function the_post_type( $post = null ) {
	$p = get_post_type( $post );
	if ( $p === 'page' ) {
		echo 'pagina';
	} else if ( $p === 'post' ) {
		echo 'nieuws';
	} else {
		echo $p;
	}
}

/**
 * Get IP from client
 *
 * @return	string $ip;
 */
function get_the_user_ip() {
	if (!empty( $_SERVER['HTTP_CLIENT_IP'])) {
		$ip = $_SERVER['HTTP_CLIENT_IP'];
	} elseif (!empty( $_SERVER['HTTP_X_FORWARDED_FOR'])) {
		$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	} else {
		$ip = $_SERVER['REMOTE_ADDR'];
	}
	return $ip;
}

/**
 * Get Woocommerce excerpt
 *
 * @param 	number $limit
 * @return	string
 */
function woo_get_excerpt( $limit = 20 ) {
	$excerpt = explode(' ', get_the_excerpt(), $limit);
	if (count($excerpt) >= $limit) {
		array_pop($excerpt);
		$excerpt = implode(" ", $excerpt) . '...';
	} else {
		$excerpt = implode(" ", $excerpt);
	}
	$excerpt = preg_replace('`\[[^\]]*\]`', '', $excerpt);
	return $excerpt;
}

/**
 * Echo Woocommerce excerpt
 *
 * @param 	number $limit
 */
function woo_the_excerpt( $limit = 20 ) {
	$excerpt = woo_get_excerpt( $limit );
	if ($excerpt) echo $excerpt;
}

/**
 * Get Woocommerce content
 *
 * @param 	number $limit
 * @return	string
 */
function woo_get_content( $limit = 20 ) {
    $content = explode(' ', get_the_content(), $limit);
    if (count($content) >= $limit) {
        array_pop($content);
        $content = implode(" ", $content) . '...';
    } else {
        $content = implode(" ", $content);
    }
    $content = preg_replace('/\[.+\]/','', $content);
    $content = apply_filters('the_content', $content);
    $content = str_replace(']]>', ']]&gt;', $content);
    return $content;
}

/**
 * Echo Woocommerce content
 *
 * @param 	number $limit
 */
function woo_the_content( $limit = 20 ) {
	$content = woo_get_content( $limit );
	if ($content) echo $content;
}
