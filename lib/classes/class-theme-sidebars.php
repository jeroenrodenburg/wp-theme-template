<?php
/**
 * Theme:				
 * Template:			class-theme-sidebars.php
 * Description:			Create locations for widgets
 */

class Theme_Sidebars
{

    public function __construct()
    {
       
    }

    protected function add_hooks()
    {
        add_action( 'widgets_init', array( $this, 'register' ) );
    }

    public function register()
    {

        $args = array(
            'id'            => '',
            'class'         => '',
            'name'          => __( '', 'text_domain' ),
            'description'   => __( '', 'text_domain' ),
            'before_title'  => '',
            'after_title'   => '',
            'before_widget' => '<div id="%1$s>',
            'after_widget'  => '</div>',
        );

        register_sidebar( $args );
    
    }

}