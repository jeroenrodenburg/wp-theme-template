<?php
/**
 * Theme:               
 * Template:			translations.php
 * Description:			Set translation settings
 */

/**
 * theme_translations_setup
 * 
 * Add translations files to the theme
 * 
 * @since   1.0
 * @link    https://developer.wordpress.org/reference/hooks/after_setup_theme/
 */
add_action( 'after_setup_theme', 'theme_translations_setup', 10 );
function theme_translations_setup() {
    load_theme_textdomain( 'control', get_template_directory() . '/languages' );
}
