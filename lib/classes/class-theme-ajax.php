<?php
/**
 * Theme:				
 * Template:			class-theme-ajax.php
 * Description:			
 */

class Theme_Ajax
{

    public function __construct()
    {
        
    }

    protected function add_hooks()
    {
        add_action( 'wp_ajax_nopriv_response', array( $this, 'response' ) );
        add_action( 'wp_ajax_response', array( $this, 'response' ) );
    }

    public function response()
    {

    }

}