<?php
/**
 * Theme:
 * Template:			class-theme-navigation.php
 * Description:			Register navigation locations for theme
 */

class Theme_Navigation
{

    public function __construct()
    {
       
    }

    protected function add_hooks()
    {
        add_action( 'after_setup_theme', array( $this, 'register' ), 0 );
    }

    public function register()
    {
        register_nav_menu( '', __( '', 'text_domain' ) );
    }

}