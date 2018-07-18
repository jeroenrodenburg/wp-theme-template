<?php
/**
 * Theme:
 * Template:			navigation.php
 * Description:			Register navigation locations for theme
 */


/**
 * theme_menus
 * 
 * Register navigation menus. Repeat the 
 * register_nav_menu function to register
 * multiple menu's.
 * 
 * @since	1.0
 */
add_action( 'after_setup_theme', 'theme_menus' );
function theme_menus() {

	// register_nav_menu( '', __( '', 'text_domain' ) );

}

/**
 * add_current_nav_class
 * 
 * Make parent menu item from post type
 * active on single page
 * 
 * @since	1.0   
 */
add_action( 'nav_menu_css_class', 'add_current_nav_class', 10, 2 );
function add_current_nav_class( $classes, $item ) {
    
    // Getting the current post details
	global $post;
	if ( $post === null ) return $classes;
    
    // Getting the post type of the current post
    $current_post_type = get_post_type_object( get_post_type( $post->ID ) );
    $current_post_type_slug = $current_post_type->rewrite[ 'slug' ];
        
    // Getting the URL of the menu item
    $menu_slug = strtolower( trim( $item->url ) );
    
    // If the menu item URL contains the current post types slug add the current-menu-item class
    if ( strpos( $menu_slug, $current_post_type_slug ) !== false ) $classes[] = 'current-menu-item';
    
    // Return the corrected set of classes to be added to the menu item
    return $classes;

}

/**
 * Custom_Walker_Nav_Menu
 * 
 * Extends the default Walker_Nav_Menu class
 * and can be used with the wp_nav_menu function.
 * 
 * Customize the walker to your needs to output the 
 * needed HTML.
 * 
 * @since	1.0
 * @example
 * wp_nav_menu( array(
 * 		'walker'	=> new Custom_Walker_Nav_Menu()
 * ) );
 */
class Custom_Walker_Nav_Menu extends Walker_Nav_Menu {

	public function start_lvl( &$output, $depth = 0, $args = array() ) {
		$output .= '<ul class="menu__submenu">';
	}

	public function end_lvl( &$output, $depth = 0, $args = array() ) {
		$output .= '</ul>';
	}

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		
		// Has sub menu class
		$has_submenu = '';
		if ( $args->walker->has_children ) $has_submenu = ' menu__item--has-sub';
		
		// Is sub or not
		$depth_class = '';
		$depth_link_class = '';
		if ( $depth > 0 ) {
			$depth_class = ' menu__item--sub';
			$depth_link_class = ' menu__link--sub';
		}
		
		$output .= '<li class="menu__item' . $depth_class . $has_submenu . '">';
		$output .= '<a class="menu__link' . $depth_link_class . '" href="' . $item->url . '" title="' . $item->title . '">' . $item->title;
		$output .= '</a>';
	}

	public function end_el( &$output, $item, $depth = 0, $args = array() ) {
		$output .= '</li>';
	}

}