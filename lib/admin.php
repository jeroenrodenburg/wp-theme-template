<?php
/**
 * Theme:
 * Template:			admin.php
 * Description:			Custom admin settings
 */


/**
 * Add custom CSS to the admin page
 * Enqueues style to admin
 * 
 * @since	1.0
 */
add_action( 'admin_enqueue_scripts', 'admin_style' );
function admin_style() {
	wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/css/admin/admin.css' );
}

/**
 * Remove menu items from the dashboard
 * Uncomment the items that have to be removed from the dashboard
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Function_Reference/remove_menu_page
 */
add_action( 'admin_menu', 'admin_remove_menus' );
function admin_remove_menus(){
	// remove_menu_page( 'index.php' );                  //Dashboard
	// remove_menu_page( 'jetpack' );                    //Jetpack* 
	// remove_menu_page( 'edit.php' );                   //Posts
	// remove_menu_page( 'upload.php' );                 //Media
	// remove_menu_page( 'edit.php?post_type=page' );    //Pages
	// remove_menu_page( 'edit-comments.php' );          //Comments
	// remove_menu_page( 'themes.php' );                 //Appearance
	// remove_menu_page( 'plugins.php' );                //Plugins
	// remove_menu_page( 'users.php' );                  //Users
	// remove_menu_page( 'tools.php' );                  //Tools
	// remove_menu_page( 'options-general.php' );        //Settings

}