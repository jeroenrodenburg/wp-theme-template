<?php
/**
 * Theme:				
 * Template:			header.php
 * Description:			
 */
?>
<!DOCTYPE html>
<!-- Made by Control || controldigital.nl -->
<html lang="<?php bloginfo( 'language' ); ?>" class="no-js">
	<head>
		<?php wp_head(); ?>
		<?php get_template_part( './inc/cookies/cookies', 'head' ); ?>
	</head>
	<body <?php body_class(); ?>>
		<?php get_template_part( './inc/cookies/cookies', 'body' ); ?>

		<!-- Splash -->
		<?php get_template_part( './inc/loader/splash' ); ?>

		<!-- Navigation Default -->
		<?php get_template_part( './inc/navigation/navigation', 'default' ); ?>

		<!-- Hero Default -->
		<?php get_template_part( './inc/hero/hero', 'default' ); ?>
