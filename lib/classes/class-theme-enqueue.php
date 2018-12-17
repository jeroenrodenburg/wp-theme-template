<?php
/**
 * Theme:
 * Template:			class-theme-navigation.php
 * Description:			Register navigation locations for theme
 */

class Theme_Enqueue
{

    public function __construct()
    {
        
    }

    protected function add_hooks()
    {
        add_action( 'wp_enqueue_scripts', array( $this, 'styles' ) );
        add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
        add_filter( 'style_loader_tag', array( $this, 'style_attributes' ), 10, 4 );
        add_filter( 'script_loader_tag', array( $this, 'script_attributes' ), 10, 3 );
    }

    private function styles()
    {

    }

    private function scripts()
    {
        
    }

    private function style_attributes( $html, $handle, $href, $media )
    {

    }

    private function script_attributes( $tag, $handle, $src )
    {

    }

}