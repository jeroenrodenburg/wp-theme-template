<?php
/**
 *	Theme:
 *	Template:			  helpers.php
 *	Description:	  Custom functions to use around the theme
*/


/**
 *	Get the logo from theme mods and return it if it is present
 *
 *	@return string Returns an URL if the logo is present
 */
function get_the_logo() {
	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );
	if ( !empty( $image ) ) {
		return $image[0];
	} else {
		return false;
	}
}

/**
 *	Print the logo in the document
 *	Echoes an URL if the logo is present
 *
 *	@uses get_the_logo to get the logo if it is present
 *	@return null
 */
function the_logo() {
	$logo = get_the_logo();
	if ($logo) {
		echo $logo;
	}
	return null;
}


/**
 *	Returns a new array with all the children of a taxonomy
 *
 *	@param string $tax The taxonomy to get all the terms from.
 *	@param string $orderby The order in which the terms are ordered.
 *	@param boolean $hide_empty True: only show terms with posts. False: show all terms.
 *	@returns array().
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
 *	Custom excerpt length.
 *	@return integer
 */
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );
function custom_excerpt_length( $length ) {
	return 18;
}

/**
 *	Custom excerpt more string.
 *	@return string
 */
add_filter('excerpt_more', 'custom_excerpt_more');
function custom_excerpt_more($excerpt) {
	return '...';
}


/**
 *	Get IP from client
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
 *    Outputs the post taxonomy terms, seperated with comma's
 *    @param Object $post
 *    @param String $category
 *		@param Array $args
 *		@param String $delimiter
 */
function the_post_terms( $post, $category, $args = array('orderby' => 'name', 'order' => 'ASC', 'fields' => 'all'), $delimiter = ', ' ) {
    $terms = wp_get_post_terms( $post->ID, $category, $args );
    if ( $terms && ! is_wp_error( $terms )) {
        $subjects_list = array();
        foreach( $terms as $term ) {
            $subjects_list[] = $term->name;
        }
        array_splice($subjects_list, 2);
        $subjects = join($delimiter, $subjects_list);
        echo $subjects;
    }
}


/**
 *	Get Woocommerce excerpt
 *	@param Integer $limit
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
 *	Echo Woocommerce excerpt
 *	@param Integer $limit
 */
function woo_the_excerpt( $limit = 20 ) {
	$excerpt = woo_get_excerpt( $limit );
	if ($excerpt) {
		echo $excerpt;
	}
}

/**
 *	Get Woocommerce content
 *	@param Integer $limit
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
 *	Echo Woocommerce content
 *	@param Integer $limit
 */
function woo_the_content( $limit = 20 ) {
	$content = woo_get_content( $limit );
	if ($content) {
		echo $content;
	}
}
