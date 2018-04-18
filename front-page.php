<?php
/**
 *
 *	Theme:				
 *	Template:			front-page.php
 *	Template Name:		Frontpage
 *	Description:		Template for front-page of theme
*/

get_header();
?>

<main id="main" role="main">
	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

	<?php } } ?>
</main>

<?php
get_footer();
?>