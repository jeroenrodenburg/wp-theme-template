<?php
/**
 * Theme:				Work At Textkernel
 * Template:			customizer.php
 * Description:			Customizer modifications
 */


/**
 * Customizer customizations
 * 
 * Use this hook to create new sections, settings and
 * fields for the customizer section.
 * 
 * @since   1.0
 * 
 * For help check out these links below
 * @link    https://codex.wordpress.org/Theme_Customization_API
 * @link    https://css-tricks.com/getting-started-wordpress-customizer/
 */
add_action( 'customize_register', 'theme_customizer_register' );
function theme_customizer_register( WP_Customize_Manager $wp_customize ) {

    // Cookie active setting
	$wp_customize->add_setting(
		'cookie_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie name setting
	$wp_customize->add_setting(
		'cookie_name',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
			'default'			=> 'wp-cookie-consent'
		)
	);
	
	// Cookie title setting
	$wp_customize->add_setting(
		'cookie_title',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie body setting
	$wp_customize->add_setting(
		'cookie_body',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie expiration date setting
	$wp_customize->add_setting(
		'cookie_expiration_date',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
			'default'			=> 365
		)
	);

    // Cookie accept button setting
	$wp_customize->add_setting(
		'cookie_accept_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie refuse button setting
	$wp_customize->add_setting(
		'cookie_refuse_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

    // Cookie refuse button setting
	$wp_customize->add_setting(
		'cookie_refuse_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie read more label setting
	$wp_customize->add_setting(
		'cookie_read_more_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

    // Cookie read more label setting
	$wp_customize->add_setting(
		'cookie_read_more_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);

	// Cooke read more link setting
	$wp_customize->add_setting(
		'cookie_read_more_page',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
			'default'			=> '0'
		)
	);

	// Cooke read more link setting
	$wp_customize->add_setting(
		'cookie_revoke_active',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);

	// Cooke read more link setting
	$wp_customize->add_setting(
		'cookie_revoke_label',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod',
		)
	);
	
	// Cookie code head setting
	$wp_customize->add_setting(
		'cookie_code_head',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie code head setting
	$wp_customize->add_setting(
		'cookie_code_body',
		array(
			'transport'			=> 'refresh',
			'capability'		=> 'edit_theme_options',
			'type'				=> 'theme_mod'
		)
	);
	
	// Cookie panel
	$wp_customize->add_panel(
		'cookie_panel',
		array(
			'priority'       => 10,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => __( 'Cookies', 'text_domain' ),
			'description'    => __( 'Instellingen van cookies', 'text_domain' ),
		)
	);

	// Cookies general section
	$wp_customize->add_section(
		'cookie_general_section',
		array(
			'title'				=> __( 'Algemeen', 'text_domain' ),
			'priority'			=> 10,
			'panel'				=> 'cookie_panel'
		)
	);

	// Cookies refuse section
	$wp_customize->add_section(
		'cookie_refuse_section',
		array(
			'title'				=> __( 'Wijgeren', 'text_domain' ),
			'priority'			=> 20,
			'panel'				=> 'cookie_panel'
		)
	);

	// Cookies privacy section
	$wp_customize->add_section(
		'cookie_privacy_section',
		array(
			'title'				=> __( 'Privacy beleid', 'text_domain' ),
			'priority'			=> 30,
			'panel'				=> 'cookie_panel'
		)
	);

	// Cookies revoke section
	$wp_customize->add_section(
		'cookie_revoke_section',
		array(
			'title'				=> __( 'Intrekken', 'text_domain' ),
			'priority'			=> 40,
			'panel'				=> 'cookie_panel'
		)
	);
	
	// Cookies script section
	$wp_customize->add_section(
		'cookie_scripts_section',
		array(
			'title'				=> __( 'Scripts', 'text_domain' ),
			'priority'			=> 50,
			'panel'				=> 'cookie_panel'
		)
	);
    
    // Cookie active checkbox control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_active',
		array(
			'label'      		=> __( 'Cookie actief?', 'text_domain' ),
			'description'		=> __( 'Geef aan of de cookie actief is.', 'text_domain' ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );
	
	// Cookie title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_name',
		array(
			'label'      		=> __( 'Naam', 'text_domain' ),
			'description'		=> __( 'De naam van de cookie dat wordt opgeslagen. Verander deze alleen wanneer er conflicten zijn met andere cookies.', 'text_domain' ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_name',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );
	
	// Cookie title text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_title',
		array(
			'label'      		=> __( 'Titel', 'text_domain' ),
			'description'		=> __( 'Vul hier de titel in van het cookie bericht.', 'text_domain' ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_title',
			'type'				=> 'text',
	        'priority'   		=> 30
		)
	) );
	
	// Cookie body textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_body',
		array(
			'label'      		=> __( 'Inhoud', 'text_domain' ),
			'description'		=> __( 'Vul hier de teksten in van het cookie bericht.', 'text_domain' ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_body',
			'type'				=> 'textarea',
	        'priority'   		=> 40
		)
    ) );
    
    // Cookie accept label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_accept_label',
		array(
			'label'      		=> __( 'Accepteer knop', 'text_domain' ),
			'description'		=> __( 'Label van de accepteer knop.', 'text_domain' ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_accept_label',
			'type'				=> 'text',
	        'priority'   		=> 50
		)
	) );

	// Cookie refuse active input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_refuse_active',
		array(
			'label'      		=> __( 'Weiger actief', 'text_domain' ),
			'description'		=> __( 'Geef aan of de gebruiker de cookies kunnen wijgeren.', 'text_domain' ),
			'section'    		=> 'cookie_refuse_section',
			'settings'   		=> 'cookie_refuse_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );
    
    // Cookie refuse label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_refuse_label',
		array(
			'label'      		=> __( 'Weiger knop', 'text_domain' ),
			'description'		=> __( 'Label van de weiger knop.', 'text_domain' ),
			'section'    		=> 'cookie_refuse_section',
			'settings'   		=> 'cookie_refuse_label',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );
	
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_read_more_active',
		array(
			'label'      		=> __( 'Privacy beleid actief', 'text_domain' ),
			'description'		=> __( 'Geef of een link naar het privacy beleid actief is.', 'text_domain' ),
			'section'    		=> 'cookie_privacy_section',
			'settings'   		=> 'cookie_read_more_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );
    
    // Cookie read more label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_read_more_label',
		array(
			'label'      		=> __( 'Cookie beleid knop', 'text_domain' ),
			'description'		=> __( 'Label van de link naar het cookie beleid.', 'text_domain' ),
			'section'    		=> 'cookie_privacy_section',
			'settings'   		=> 'cookie_read_more_label',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );

	// Get all pages for the select control
	// Create a new array with a default option
	$read_more_pages = get_pages();
	$read_more_choices = array(
		'0'			=> __( '-Selecteer-', 'text_domain' )
	);

	// Add all the pages with their ID's and titles to the array
	foreach( $read_more_pages as $page ) {
		$title = '';
		$read_more_choices[ $page->ID ] = $page->post_title;
	}

	// Cookie read more label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_read_more_page',
		array(
			'label'      		=> __( 'Cookie beleid pagina', 'text_domain' ),
			'description'		=> __( 'Selecteer de pagina voor het cookie beleid.', 'text_domain' ),
			'section'    		=> 'cookie_privacy_section',
			'settings'   		=> 'cookie_read_more_page',
			'type'				=> 'select',
			'priority'   		=> 30,
			'choices'			=> $read_more_choices
		)
	) );

	// Cookie expiration select controls
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_expiration_date',
		array(
			'label'      		=> __( 'Houdbaarheid van cookie', 'text_domain' ),
			'description'		=> __( 'Selecteer de periode van houdbaarheid.', 'text_domain' ),
			'section'    		=> 'cookie_general_section',
			'settings'   		=> 'cookie_expiration_date',
			'type'				=> 'select',
			'choices'			=> array(
				1					=> __( '1 dag', 'text_domain' ),
				7					=> __( '1 Week', 'text_domain' ),
				30					=> __( '1 maand', 'text_domain' ),
				91					=> __( '3 maanden', 'text_domain' ),
				182					=> __( '6 maanden', 'text_domain' ),
				365					=> __( '1 jaar', 'text_domain' ),

			),
	        'priority'   		=> 40
		)
	) );

	// Cookie revoke active checkbox control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_revoke_active',
		array(
			'label'      		=> __( 'Intrekken actief?', 'text_domain' ),
			'description'		=> __( 'Geef aan of de gebruiker mogelijkheid heeft om de cookie te wijzigen na het accepteren.', 'text_domain' ),
			'section'    		=> 'cookie_revoke_section',
			'settings'   		=> 'cookie_revoke_active',
			'type'				=> 'checkbox',
	        'priority'   		=> 10
		)
	) );

	// Cookie read more label text input control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_revoke_label',
		array(
			'label'      		=> __( 'Intrekken knop', 'text_domain' ),
			'description'		=> __( 'Label van de knop om de cookies aan te passen.', 'text_domain' ),
			'section'    		=> 'cookie_revoke_section',
			'settings'   		=> 'cookie_revoke_label',
			'type'				=> 'text',
	        'priority'   		=> 20
		)
	) );

	// Cookie code head textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_code_head',
		array(
			'label'      		=> __( 'Head scripts', 'text_domain' ),
			'description'		=> __( 'Plaats hier code dat in de head moet verschijnen wanneer de cookie is geaccepteerd', 'text_domain' ),
			'section'    		=> 'cookie_scripts_section',
			'settings'   		=> 'cookie_code_head',
			'type'				=> 'textarea',
	        'priority'   		=> 10
		)
	) );
	
	// Cookie code body textarea control
	$wp_customize->add_control( new WP_Customize_Control(
		$wp_customize,
		'cookie_code_body',
		array(
			'label'      		=> __( 'Body scripts', 'text_domain' ),
			'description'		=> __( 'Plaats hier code dat aan het begin van de body moet verschijnen wanneer de cookie is geaccepteerd', 'text_domain' ),
			'section'    		=> 'cookie_scripts_section',
			'settings'   		=> 'cookie_code_body',
			'type'				=> 'textarea',
	        'priority'   		=> 20
		)
    ) );
	
}

/**
 * customizer_preview_js
 * 
 * Add JavaScript preview controls
 * for the customizer.
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/customize_preview_init
 * 
 * Tutorial
 * @link	https://code.tutsplus.com/tutorials/customizer-javascript-apis-getting-started--cms-26838
 */
add_action( 'customize_preview_init', 'customizer_preview_scripts' );
function customizer_preview_scripts() {
	wp_register_script( 'customizer-preview', get_template_directory_uri() . '/js/admin/customizer-preview.js', false, false, true );
    wp_enqueue_script( 'customizer-preview' );
}

/**
 * customizer_control_js
 * 
 * Add JavaScript controls for 
 * the customizer
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/customize_controls_enqueue_scripts
 * 
 * Tutorial
 * @link	https://code.tutsplus.com/tutorials/customizer-javascript-apis-getting-started--cms-26838
 */
add_action( 'customize_controls_enqueue_scripts', 'customizer_control_scripts' );
function customizer_control_scripts() {
	wp_register_script( 'customizer-control', get_template_directory_uri() . '/js/admin/customizer-control.js', array( 'jquery' ), false, true );
	wp_enqueue_script( 'customizer-control' );
}