<?php
/**
 * Theme:				
 * Template:			class-theme-customizer.php
 * Description:			Customizer modifications
 */

class Theme_Customizer
{

    public function __construct()
    {
        
    }

    protected function add_hooks()
    {
        add_action( 'customize_register', array( $this, 'register' ) );
        add_action( 'customize_preview_init', array( $this, 'preview_scripts' ) );
        add_action( 'customize_controls_enqueue_scripts', array( $this, 'customizer_control_scripts' ) );
    }

    public function register()
    {

    }

    public function preview_scripts()
    {

    }

    public function control_scripts()
    {

    }

}
