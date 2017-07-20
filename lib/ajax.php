<?php
/**
 *  Theme:
 *  Template:       ajax.php
 *  Description:    Ajax related functions
 */


/**
 *  Load more function
 */
add_action('wp_ajax_nopriv_load_ajax', 'load_ajax');
add_action('wp_ajax_load_ajax', 'load_ajax');
function load_ajax() {

  header("Content-Type: text/html");
	global $post;

  exit();

}
