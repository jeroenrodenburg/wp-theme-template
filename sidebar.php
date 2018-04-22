<?php
/**
 *  Theme:
 *  Template:       sidebar.php
 *  Description:
 */

get_header();
?>

<aside id="aside" role="contentinfo">
	<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>

	<?php } } ?>
</aside>

<?php
get_footer();
?>
