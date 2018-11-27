<?php
/**
 * Theme:
 * Template:			admin.php
 * Description:			Custom admin settings
 */


/**
 * admin_style
 * 
 * Add custom CSS to the admin page
 * Enqueues style to admin
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/
 */
add_action( 'admin_enqueue_scripts', 'admin_style' );
function admin_style() {
	wp_enqueue_style( 'admin_style', get_template_directory_uri() . '/css/admin/admin.css' );
}

/**
 * admin_remove_menus
 * 
 * Remove menu items from the dashboard
 * Uncomment the items that have to be removed from the dashboard
 * 
 * @since	1.0
 * @link	https://codex.wordpress.org/Function_Reference/remove_menu_page
 * @link	https://developer.wordpress.org/reference/hooks/admin_menu/
 */
add_action( 'admin_menu', 'admin_remove_menus' );
function admin_remove_menus(){
	// remove_menu_page( 'index.php' );                  //Dashboard
	// remove_menu_page( 'jetpack' );                    //Jetpack* 
	// remove_menu_page( 'edit.php' );                   //Posts
	// remove_menu_page( 'upload.php' );                 //Media
	// remove_menu_page( 'edit.php?post_type=page' );    //Pages
	// remove_menu_page( 'edit-comments.php' );          //Comments
	// remove_menu_page( 'themes.php' );                 //Appearance
	// remove_menu_page( 'plugins.php' );                //Plugins
	// remove_menu_page( 'users.php' );                  //Users
	// remove_menu_page( 'tools.php' );                  //Tools
	// remove_menu_page( 'options-general.php' );        //Settings

}

/**
 * add_theme_pages
 * 
 * Adds a settings to page for
 * setting up the content of a 404
 * error page.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/admin_menu/
 */
add_action( 'admin_menu', 'add_theme_pages' );
function add_theme_pages() {

	// 404
	add_theme_page( 
		__( 'Edit 404 page', 'control' ), 
		__( '404', 'control' ), 
		'edit_theme_options', 
		'theme-404', 
		'theme_page_form' 
	);

	// Archives
	add_theme_page( 
		__( 'Edit archive page', 'control' ), 
		__( 'Archive', 'control' ), 
		'edit_theme_options', 
		'theme-archive', 
		'theme_page_form' 
	);

}

/**
 * theme_page_notice__success
 * 
 * Custom notice of succes and error
 * for the 404 and archives theme 
 * pages.
 * 
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/admin_notices
 * @since	1.0
 */
add_action( 'admin_notices', 'theme_page_notices' );
function theme_page_notices() {

	if ( 
		isset( $_GET[ 'page' ] ) && 
		( 
			$_GET[ 'page' ] === 'theme-404' ||  
			$_GET[ 'page' ] === 'theme-archive' 
		) 
	) {
		if ( isset( $_GET[ 'message' ] ) ) {
			if ( $_GET[ 'message' ] === '1' ) {

				// Set CSS class and message for notice
				$class = 'notice notice-success is-dismissible';
				$message = __( 'Page has been succesfully saved', 'control' );

			} else if ( $_GET[ 'message' ] === '2' ) {

				// Set CSS class and message for notice
				$class = 'notice notice-error is-dismissible';
				$message = __( 'Something went wrong', 'control' );

			}
			printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_html( $message ) );
		}
	}

}

/**
 * theme_page_form
 * 
 * Output the form of the custom
 * theme menu page into the dashboard
 * and gives the user controls to
 * edit and update the custom
 * pages.
 * 
 * @since	1.0
 */
function theme_page_form() {

	// Get data of current page
	$page 		= $_GET[ 'page' ];
	$title 		= get_option( $page . '-title' );
	$content 	= get_option( $page . '-content' );

	// Output the form
	echo 
	'<div class="wrap">
		<h1 class="wp-heading-inline">' . get_admin_page_title() . '</h1>
			<hr class="wp-header-end">
			<div id="poststuff">
				<div id="post-body" class="metabox-holder columns-1">
				
					<div id="post-body-content">
						<form method="POST" id="form-' . $page . '" action="' . admin_url( 'admin-post.php' ) . '">';

						wp_nonce_field( 'save-theme-page', '_wpnonce', true, true );
						echo 
						'<input id="action" name="action" value="save_theme_page" type="hidden">
						<input id="page" name="_wppage" value="' . $page . '" type="hidden">

						<div id="titlediv">
							<div id="titlewrap">
								<label class="screen-reader-text" id="title-prompt-text" for="title">' . __( 'Fill in the title', 'control' ) . '</label>
								<input name="post_title" size="30" value="' . $title . '" id="title" spellcheck="true" autocomplete="off" type="text">
							</div>					
						</div>
						
						<div id="wp-content-wrap" class="wp-core-ui wp-editor-wrap tmce-active has-dfw" style="padding-top:25px;">';
							wp_editor( esc_html( $content ), 'post_content' );
							submit_button( __( 'Save', 'control' ), 'primary' );
						echo 
						'</div>
					</form>
				</div>

			</div>
		</div>
	</div>';

}

/**
 * save_theme_page
 *
 * Logic of updating custom theme pages
 * like 404 or archive.
 * Stores the content in the options of
 * this theme.
 * 
 * @link	https://codex.wordpress.org/Plugin_API/Action_Reference/admin_post_(action)
 * @link	https://developer.wordpress.org/reference/hooks/admin_post_action/
 * 
 * @since	1.0
 */
add_action( 'admin_post_save_theme_page', 'save_theme_page' );
add_action( 'admin_post_nopriv_save_theme_page', 'save_theme_page' );
function save_theme_page() {

	// Check if nonce is set
	if ( isset( $_POST[ '_wpnonce' ] ) && wp_verify_nonce( $_POST[ '_wpnonce' ], 'save-theme-page' ) ) {

		// Get the referrer and the current page
		$wp_referrer	= isset( $_POST[ '_wp_http_referer' ] ) ? $_POST[ '_wp_http_referer' ] : '';
		$wp_page		= isset( $_POST[ '_wppage' ] ) ? $_POST[ '_wppage' ] : '';

		// Get the new title and content values
		$title			= isset( $_POST[ 'post_title' ] ) ? $_POST[ 'post_title' ] : '';
		$content		= isset( $_POST[ 'post_content' ] ) ? $_POST[ 'post_content' ] : '';

		// Update the values
		update_option( $wp_page . '-title', $title );
		update_option( $wp_page . '-content', $content );

		// Redirect back to page with success
		wp_redirect(
			esc_url_raw( 
				add_query_arg( 
					array(
						'page'		=> $wp_page,
						'message' 	=> '1',
					),
					$wp_referrer
				) 
			)
		);

	} else {

		// Redirect back to page with error
		wp_redirect(
			esc_url_raw( 
				add_query_arg( 
					array(
						'page'		=> $wp_page,
						'message' 	=> '2',
					),
					$wp_referrer
				) 
			)
		);

	}

	exit;

}