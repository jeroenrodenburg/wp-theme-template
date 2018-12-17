<?php
/**
 * Theme:				
 * Template:			class-theme-admin.php
 * Description:			
 */

class Theme_Admin
{

    public function __construct()
    {
        
    }

    protected function add_hooks()
    {
        add_action( 'admin_menu', array( $this, 'remove_menu_items' ) );
        add_action( 'admin_menu', array( $this, 'add_dashboard_pages' ) );
        add_action( 'admin_menu', array( $this, 'add_theme_pages' ) );
        add_action( 'admin_menu', array( $this, 'add_posts_pages' ) );
        add_action( 'admin_menu', array( $this, 'add_media_pages' ) );
        add_action( 'admin_menu', array( $this, 'add_option_pages' ) );
    }

    private function remove_menu_items()
    {

    }

    private function add_dashboard_pages()
    {

    }

    private function add_theme_pages()
    {

    }

    private function add_posts_pages()
    {

    }

    private function add_media_pages()
    {

    }

    private function add_option_pages()
    {

    }


}