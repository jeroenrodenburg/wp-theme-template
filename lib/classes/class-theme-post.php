<?php
/**
 * Theme:				
 * Template:			class-theme-post.php
 * Description:			
 */

class Theme_Post
{

    public function __construct()
    {
        
    }

    protected function add_hooks()
    {
        add_action( 'admin_post_nopriv_response', array( $this, 'response' ) );
        add_action( 'admin_post_response', array( $this, 'response' ) );
    }

    public function response()
    {

    }

}