<?php
/**
 *	Theme:
 *  Template:     search-modal.php
 *  Description:	Search modal template
 */
?>

<div id="search-modal">
	<div id="search-area">
		<a id="search-close" class="link" href="#" title="Sluiten">
			<div class="link-icon">
				<span></span>
				<span></span>
			</div>
		</a>

		<div class="search-container">
			<form role="search" method="get" id="search-form" class="searchform" action="<?php echo home_url( '/' ); ?>">
				<div class="search-fields">
					<div class="search-fields-inner">
						<button type="submit" id="searchsubmit"></button>
						<input type="search" value="" name="s" id="s" placeholder="Zoeken..">
					</div>
				</div>
			</form>
			<div id="search-output" class="search-output"></div>
		</div>
	</div>
</div>
