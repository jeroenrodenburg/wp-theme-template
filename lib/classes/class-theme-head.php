<?php
/**
 * Theme:				
 * Template:			class-theme-head.php
 * Description:			
 */

class Theme_Head
{

	public function __construct()
	{
		
	}

	protected function add_hooks()
	{
		add_action( 'init', array( $this, 'cleanup_head' ) );
		add_action( 'init', array( $this, 'disable_wp_emojicons') );
		add_action( 'wp_head', array( $this, 'add_head_tags' ) );
	}

	private function cleanup_wp_head() 
	{
		remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
		remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
		remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
		remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
		remove_action( 'wp_head', 'index_rel_link' ); // index link
		remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
		remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // start link
		remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // Display relational links for the posts adjacent to the current post.
	}

	private function disable_wp_emojicons() 
	{
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		add_filter( 'tiny_mce_plugins', array( $this, 'disable_emojicons_tinymce' ) );
	}

	private function disable_emojicons_tinymce( $plugins ) 
	{
		if ( is_array( $plugins ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
		} else {
			return array();
		}
	}

	/**
	 * add_head_tags
	 * 
	 * @since   1.0
	 * @link    https://codex.wordpress.org/Function_Reference/wp_head
	 * @link    https://codex.wordpress.org/Plugin_API/Action_Reference/wp_head
	 */
	private function add_head_tags()
	{
		?>
			<script>document.documentElement.className = document.documentElement.className.replace('no-js', '');</script>
			<meta charset="<?php bloginfo( 'charset' ); ?>"/>
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
			<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
			<meta http-equiv="cleartype" content="on"/>
			<meta name="apple-mobile-web-app-capable" content="yes"/>
			<meta name="apple-mobile-web-app-status-bar-style" content="black"/>
			<meta name="mobile-web-app-capable" content="yes"/>
			<meta name="theme-color" content="#ffffff"/>
			<link rel="manifest" href="<?php echo get_template_directory_uri() . '/media/favicons/manifest.json'; ?>">
			<meta itemprop="name" content="<?php the_title(); ?>"/>
			<meta itemprop="description" content="<?php echo get_the_excerpt(); ?>"/>
			<meta itemprop="image" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:title" content="<?php the_title(); ?>"/>
			<meta name="twitter:description" content="<?php echo get_the_excerpt(); ?>"/>
			<meta name="twitter:image:src" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
			<meta property="og:title" content="<?php the_title(); ?>"/>
			<meta property="og:type" content="article"/>
			<meta property="og:url" content="<?php the_permalink(); ?>"/>
			<meta property="og:image" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
			<meta property="og:description" content="<?php echo get_the_excerpt(); ?>"/>
			<meta property="og:site_name" content="<?php bloginfo( 'name' ); ?>"/>
			<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri() . '/media/favicons/apple-touch-icon.png'; ?>">
			<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri() . '/media/favicons/favicon-32x32.png'; ?>">
			<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri() . '/media/favicons/favicon-16x16.png'; ?>">
			<link rel="mask-icon" href="<?php echo get_template_directory_uri() . '/media/favicons/safari-pinned-tab.svg'; ?>" color="#333333">
		<?php
	}

   

}