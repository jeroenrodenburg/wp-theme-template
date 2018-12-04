<?php
/**
 * Theme:			    
 * Template:			head.php
 * Description:			Scripts and tags for in the head
 */


/**
 * head_javascript_active
 * 
 * Places javascript in the head which checks if 
 * js is active. If it is, it removes the 'no-js' class
 * from the <html> element.
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_javascript_active', 10 );
function head_javascript_active() {
	?>
		<script>document.documentElement.className = document.documentElement.className.replace('no-js', '');</script>
	<?php
}

/**
 * head_main_meta
 * 
 * Main meta tags used in every project with 
 * tags for charset, Edge, viewport and cleartype
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_main_meta', 10 );
function head_main_meta() { 
    ?>
        <meta charset="<?php bloginfo( 'charset' ); ?>"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
		<meta http-equiv="cleartype" content="on"/>
    <?php
}

/**
 * head_pwa_meta
 * 
 * Meta tags for saving the website
 * to the homescreen of a device.
 * With manifest and color settings
 * for Android devices.
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_pwa_meta', 10 );
function head_pwa_meta() { 
    ?>
		<meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="theme-color" content="#ffffff"/>
        <link rel="manifest" href="<?php echo get_template_directory_uri() . '/media/favicons/manifest.json'; ?>">
    <?php
}

/**
 * head_google_plus_meta
 * 
 * Meta tags for social sharing
 * on Google+
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_google_plus_meta', 10 );
function head_google_plus_meta() { 
    ?>
	    <meta itemprop="name" content="<?php the_title(); ?>"/>
	    <meta itemprop="description" content="<?php echo get_the_excerpt(); ?>"/>
        <meta itemprop="image" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
    <?php
}

/**
 * head_twitter_meta
 * 
 * Twitter meta tags for sharing
 * on Twitter.
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_twitter_meta', 10 );
function head_twitter_meta() { 
    ?>
	    <meta name="twitter:card" content="summary_large_image"/>
	    <meta name="twitter:title" content="<?php the_title(); ?>"/>
	    <meta name="twitter:description" content="<?php echo get_the_excerpt(); ?>"/>
	    <meta name="twitter:image:src" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
    <?php
}

/**
 * head_opengraph_meta
 * 
 * Opengraph meta tags for sharing
 * on Facebook and all Facebook related
 * websites.
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_opengraph_meta', 10 );
function head_opengraph_meta() { 
    ?>
	    <meta property="og:title" content="<?php the_title(); ?>"/>
	    <meta property="og:type" content="article"/>
	    <meta property="og:url" content="<?php the_permalink(); ?>"/>
	    <meta property="og:image" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
	    <meta property="og:description" content="<?php echo get_the_excerpt(); ?>"/>
	    <meta property="og:site_name" content="<?php bloginfo( 'name' ); ?>"/>
    <?php
}

/**
 * head_favicon_links
 * 
 * Link tags for referencing to favicons
 * and icons for devices.
 * 
 * @since   1.0
 * @link    https://codex.wordpress.org/Function_Reference/wp_head
 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
 */
add_action( 'wp_head', 'head_favicon_links', 10 );
function head_favicon_links() { 
    ?>
	    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri() . '/media/favicons/apple-touch-icon.png'; ?>">
	    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri() . '/media/favicons/favicon-32x32.png'; ?>">
	    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri() . '/media/favicons/favicon-16x16.png'; ?>">
	    <link rel="mask-icon" href="<?php echo get_template_directory_uri() . '/media/favicons/safari-pinned-tab.svg'; ?>" color="#333333">
    <?php
}