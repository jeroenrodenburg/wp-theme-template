<?php
/**
 * Theme:
 * Template:			cookie-banner.php
 * Description:			Cookie banner to show
 */

// Cookie active?
$cookie_active 			    = get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name                = get_theme_mod( 'cookie_name' );

// Title and body content
$cookie_title				= get_theme_mod( 'cookie_title' );
$cookie_body				= get_theme_mod( 'cookie_body' );

// Accept, refuse and read more button labels
$cookie_accept_label		= get_theme_mod( 'cookie_accept_label' );
$cookie_refuse_label		= get_theme_mod( 'cookie_refuse_label' );
$cookie_read_more_label	    = get_theme_mod( 'cookie_read_more_label' );

// Output cookie banner if cookie is set to active
if ( $cookie_active ) {
?>

    <div id="cookie" class="cookie" role="banner">
        <div class="cookie__wrapper">
        
            <div class="cookie_container">
                <?php if ( $cookie_title ) { ?>
                    <div class="cookie__header">
                        <h4><?php echo $cookie_title; ?></h4>
                    </div>
                <?php } ?>
                <?php if ( $cookie_body ) { ?>
                    <div class="cookie__body">
                        <?php echo $cookie_body; ?>
                    </div>
                <?php } ?>
                <div class="cookie__buttons">
                    <a href="#" class="button cookie__button cookie__button--accept js-cookie-accept"><?php if ( $cookie_accept_label ) { echo $cookie_accept_label; } else { _e( 'Accepteer', 'text_domain' ); } ?></a>
                    <?php if ( $cookie_refuse_label ) { ?>
                        <a href="#" class="button cookie__button cookie__button--refuse js-cookie-refuse"><?php echo $cookie_refuse_label; ?></a>
                    <?php } ?>
                    <?php if ( $cookie_read_more_label ) { ?>
                        <a href="#" class="button cookie__button cookie__button--read-more js-cookie-read-more"><?php echo $cookie_read_more_label; ?></a>
                    <?php } ?>
                </div>
            </div>
        
        </div>
    </div>

<?php
}
?>