<?php
/**
 * Theme:
 * Template:			cookies-notice.php
 * Description:			Cookies notice to give user controls over cookies
 */

// Get URL of current page
global $wp;

// Cookie active?
$cookie_active 			    = get_theme_mod( 'cookie_active' );

// Name of cookie variable
$cookie_name                = get_theme_mod( 'cookie_name' );

// Title and body content
$cookie_title				= get_theme_mod( 'cookie_title' );
$cookie_body				= get_theme_mod( 'cookie_body' );
$cookie_accept_label		= get_theme_mod( 'cookie_accept_label' );

// Refuse button
$cookie_refuse_active       = get_theme_mod( 'cookie_refuse_active' );
$cookie_refuse_label		= get_theme_mod( 'cookie_refuse_label' );

// Read more button
$cookie_read_more_active    = get_theme_mod( 'cookie_read_more_active' );
$cookie_read_more_label	    = get_theme_mod( 'cookie_read_more_label' );
$cookie_read_more_page      = get_theme_mod( 'cookie_read_more_page' );

// Revoke button
$cookie_revoke_active       = get_theme_mod( 'cookie_revoke_active' );
$cookie_revoke_label        = get_theme_mod( 'cookie_revoke_label' );

// Output cookie banner if cookie is set to active
if ( $cookie_active && ! isset( $_COOKIE[ $cookie_name ] ) ) {
?>

    <div id="cookie" class="cookie" role="dialog" aria-hidden="true" aria-label="cookieconsent">
        <div class="cookie__wrapper">
        
            <form id="cookie-form" class="cookie__container" method="POST" action="<?php echo admin_url( 'admin-post.php' ); ?>">
                <input type="hidden" name="action" value="set_cookie">
                <input type="hidden" name="cookie_name" value="<?php echo $cookie_name; ?>">
                <input type="hidden" name="_wp_nonce" value="<?php echo wp_create_nonce( 'cookie' ); ?>">
                <input type="hidden" name="_wp_referrer" value="<?php echo home_url( $wp->request ); ?>">

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

                    <button type="submit" name="accept" class="button cookie__button cookie__button--accept js-cookie-accept"><?php if ( $cookie_accept_label ) { echo $cookie_accept_label; } else { _e( 'Accepteer', 'text_domain' ); } ?></button>
                    
                    <?php if ( $cookie_refuse_active ) { ?>
                        <button type="submit" name="refuse" class="button cookie__button cookie__button--refuse js-cookie-refuse"><?php if ( $cookie_refuse_label ) { echo $cookie_refuse_label; } else { _e( 'Weiger', 'text_domain' ); } ?></button>
                    <?php } ?>

                    <?php if ( $cookie_read_more_active ) { ?>
                        <a href="<?php if ( $cookie_read_more_page ) { the_permalink( $cookie_read_more_page ); } else { echo '#'; } ?>" class="button cookie__button cookie__button--read-more js-cookie-read-more" target="_self"><?php if ( $cookie_read_more_label ) { echo $cookie_read_more_label; } else { _e( 'Cookie beleid', 'text_domain' ); } ?></a>
                    <?php } ?>

                </div>

            </form>
        
        </div>
    </div>

    <?php if ( $cookie_revoke_active ) { ?>
        <div id="cookie-revoke">
            
        </div>
    <?php } ?>

<?php
}
?>