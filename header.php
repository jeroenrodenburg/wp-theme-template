<?php
/**
 *  Theme:
 *  Template:       header.php
 *  Description:    Header template with navigation
 */
?>

<!DOCTYPE html>
<!-- Made by Control || controldigital.nl -->
<html lang="<?php bloginfo( 'language' ); ?>" class="no-js">
	<head>
		<title><?php bloginfo( 'name' ); ?></title>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<meta http-equiv="cleartype" content="on">
		
		<!-- Apple fullscreen mode -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		
		<!-- Android PWA mode -->
		<meta name="mobile-web-app-capable" content="yes" />
		
		<!-- Google+ -->
	    <meta itemprop="name" content="<?php the_title(); ?>"/>
	    <meta itemprop="description" content="<?php echo get_the_excerpt(); ?>"/>
	    <meta itemprop="image" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
	
	    <!-- Twitter -->
	    <meta name="twitter:card" content="summary_large_image"/>
	    <meta name="twitter:title" content="<?php the_title(); ?>"/>
	    <meta name="twitter:description" content="<?php echo get_the_excerpt(); ?>"/>
	    <meta name="twitter:image:src" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
	
	    <!-- Open Graph data -->
	    <meta property="og:title" content="<?php the_title(); ?>"/>
	    <meta property="og:type" content="article"/>
	    <meta property="og:url" content="<?php the_permalink(); ?>"/>
	    <meta property="og:image" content="<?php the_post_thumbnail_url( 'medium' ); ?>"/>
	    <meta property="og:description" content="<?php echo get_the_excerpt(); ?>"/>
	    <meta property="og:site_name" content="<?php bloginfo( 'name' ); ?>"/>
	    
	    <!-- Favicons -->
	    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri() . '/media/favicons/apple-touch-icon.png'; ?>">
	    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri() . '/media/favicons/favicon-32x32.png'; ?>">
	    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri() . '/media/favicons/favicon-16x16.png'; ?>">
	    <link rel="manifest" href="<?php echo get_template_directory_uri() . '/media/favicons/manifest.json'; ?>">
	    <link rel="mask-icon" href="<?php echo get_template_directory_uri() . '/media/favicons/safari-pinned-tab.svg'; ?>" color="#333333">
	    <meta name="theme-color" content="#ffffff">
	    
	    <!-- JS is active -->
	    <script>
		    document.documentElement.classList.remove('no-js');
	    </script>
		
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
