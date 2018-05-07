<?php
/**
 * Theme:				
 * Template:			wpml.php
 * Description:		WordPress Multi Language plugin configurations
 */

define('ICL_DONT_LOAD_NAVIGATION_CSS', true);
define('ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true);
define('ICL_DONT_LOAD_LANGUAGES_JS', true);

/**
 * Outputs the a custom WPML language switcher
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
				$current_lang .= '<span class="lang__current">' . $lang[ 'language_code' ] . '</span>';
			} else {
				$other_langs .= '<li class="lang__item"><a href="' . $lang[ 'url'] . '" title="' . $lang[ 'native_name'] . '">' . $lang[ 'language_code'] . '</a></li>';
			}
		}
		echo '<ul class="lang" wpml-language-switcher js-lang-switcher><li class="lang__item lang__item--current">' . $current_lang . '<ul class="lang__sub">' . $other_langs . '</ul></li></ul>';
	}
}