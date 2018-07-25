<?php
/**
 * Theme:				
 * Template:			search.php
 * Description:			
 */

get_header();
?>

<?php if ( have_posts() ) { while ( have_posts() ) { the_post(); ?>


<?php } } else { ?>


<?php } ?>

<?php
get_footer();
?>
