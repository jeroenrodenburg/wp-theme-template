<?php
/**
 * Theme:				
 * Template:			archive.php
 * Description:			
 */

$title 		= get_option( 'theme-archives-title' );
$content 	= get_option( 'theme-archives-content' );

get_header();
?>

<main id="main" role="main">
	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

	<?php } } ?>
</main>

<?php
get_footer();
?>
