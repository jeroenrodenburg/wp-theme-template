<?php
/**
 * Theme:				
 * Template:			404.php
 * Description:			
 */

$title 		= get_option( 'theme-404-title' );
$content 	= get_option( 'theme-404-content' );

get_header();
?>

<main id="main" role="main">
	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

	<?php } } ?>
</main>

<?php
get_footer();
?>
