<?php
/**
 *  Theme:
 *  Template:       search.php
 *  Description:
 */

get_header();
?>

<ul id="search-results">
	<?php $delay = 0; ?>
	<?php if (have_posts()) { while (have_posts()) { the_post(); ?>

		<li style="animation: flyIn 1s <?php echo $delay; ?>s 1 normal forwards;">
			<a href="<?php the_permalink(); ?>" title="Lees verder" class="search-content">
				<?php if ( has_post_thumbnail('thumb')) : ?>
					<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" >
						<?php the_post_thumbnail(); ?>
					</a>
				<?php endif; ?>
				<p class="subtitle"><?php the_time('j F Y'); ?>, <?php the_post_terms($post, 'category'); ?></p>
			 	<h2><?php the_title(); ?></h2>
			</a>
		</li>

		<?php $delay += 0.1; ?>

	<?php }} else { ?>

		<li style="animation: flyIn 1s 0s 1 normal forwards;" class="search-error">Geen resultaten gevonden</li>

	<?php } ?>
</ul>

<?php
get_footer();
?>
