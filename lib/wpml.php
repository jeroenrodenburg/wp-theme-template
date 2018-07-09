<?php
/**
 * Theme:				
 * Template:			wpml.php
 * Description:			WordPress Multi Language plugin configurations
 */

// Prevent WPML from enqueueing CSS an JS files.
define( 'ICL_DONT_LOAD_NAVIGATION_CSS', true );
define( 'ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true );
define( 'ICL_DONT_LOAD_LANGUAGES_JS', true );

// If WPML is not active
if ( ! function_exists( 'icl_get_languages' ) ) return;

/**
 * the_wpml_lang_switcher
 * 
 * Outputs the a custom WPML language switcher
 * that shows a list of available languages.
 * 
 * @param	string $args The icl_get_languages parameters
 */
function the_wpml_lang_switcher( $args = 'skip_missing=1' ) {
	$langs = icl_get_languages( $args );
	if ( ! empty( $langs ) ) {
		$current_lang = '';
		$other_langs = '';
		foreach( $langs as $lang ) {
			if ( $lang[ 'active' ] == '1' ) {
				$current_lang .= '<span>' . $lang[ 'language_code' ] . '</span>';
			} else {
				$other_langs .= '<li><a href="' . $lang[ 'url'] . '" title="' . $lang[ 'native_name'] . '">' . $lang[ 'language_code'] . '</a></li>';
			}
		}
		echo '<div class="wpml-language-switcher lang js-lang-switcher">' . $current_lang . '<ul>' . $other_langs . '</ul></div>';
		return true;
	}
	return false;
}

/**
 * the_wpml_lang_toggle
 * 
 * Outputs a custom WPML toggle that displays
 * the language that is not currently active.
 * 
 * NOTE: Only works with 2 languages
 * 
 * @param	string $args The icl_get_languages_parameters
 */
function get_the_wpml_lang_toggle( $args = 'skip_missing=0' ) {
	$langs = icl_get_languages( $args );
    if ( ! empty( $langs ) && count( $langs ) < 2 ) {
	    foreach ( $langs as $lang ) {
		    if ( $lang[ 'active' ] == '0' ) {
				echo '<div class="wpml-language-toggle lang js-lang-toggle"><a href="' . $lang[ 'url' ] . '" title="' . $lang[ 'native_name' ] . '">' . $lang[ 'language_code' ] . '</a></div';
				return $lang;
		    }
	    }
	}
	return false;
}