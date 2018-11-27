<?php
/**
 * Theme:				
 * Template:			woocommerce.php
 * Description:			Woocommerce specific functions
 */


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