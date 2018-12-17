<?php
/**
 * Theme:				
 * Template:			class-theme-taxonomies.php
 * Description:			
 */

class Theme_Translations
{

    public function __construct()
    {
        
    }

    protected function add_hooks()
    {
        add_action( 'after_setup_theme', array( $this, 'register' ), 10 );
    }

    public function register()
    {
        load_theme_textdomain( 'control', get_template_directory() . '/languages' );
    }

}
