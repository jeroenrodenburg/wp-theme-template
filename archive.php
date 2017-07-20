<?php
/**
 *  Theme:
 *  Template:       archive.php
 *  Description:
 */

get_header();
?>

<main id="main" role="main">
  <?php if (have_posts()) { while (have_posts()) { the_post(); ?>



  <?php }} ?>
</main>

<?php
get_footer();
?>
