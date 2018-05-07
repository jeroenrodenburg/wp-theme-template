<?php
/**
 * Theme:
 * Template:			admin.php
 * Description:			Custom admin settings
 */


/**
 * Add custom CSS to the admin page
 * Enqueues style to admin
 */
add_action('admin_enqueue_scripts', 'admin_style');
function admin_style() {
	wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/css/admin/admin.css' );
}
