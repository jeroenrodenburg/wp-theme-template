<?php
/**
 *	Theme:
 *	Template:			  woocommerce.php
 *	Description:	  Woocommerce specific functions
*/

/**
 * WooCommerce Extra Feature
 * --------------------------
 *
 * Change number of related products on product page
 * Set your own value for 'posts_per_page'
 *
 */
function woo_related_products_limit() {
	global $product;
	$args['posts_per_page'] = 3;
	return $args;
}

add_filter( 'woocommerce_output_related_products_args', 'jk_related_products_args' );
function jk_related_products_args( $args ) {

	$args['posts_per_page'] = 3; // 4 related products
	$args['columns'] = 3; // arranged in 2 columns
	return $args;
}

/**
 *	Change number or products per page to 16
 */
add_filter( 'loop_shop_per_page', 'new_loop_shop_per_page', 20 );
function new_loop_shop_per_page( $cols ) {
  // $cols contains the current number of products per page based on the value stored on Options -> Reading
  // Return the number of products you wanna show per page.
  $cols = 15;
  return $cols;
}

/**
 *	Remove tabs
 */
add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );
function woo_remove_product_tabs( $tabs ) {

    unset( $tabs['reviews'] );      		// Remove the description tab
    unset( $tabs['description'] );      		// Remove the description tab
    unset( $tabs['additional_information'] );  	// Remove the additional information tab

    return $tabs;

}

add_theme_support( 'wc-product-gallery-zoom' );
add_theme_support( 'wc-product-gallery-lightbox' );

//* Add select field to the checkout page
add_action('woocommerce_before_order_notes', 'wps_add_select_checkout_field');
function wps_add_select_checkout_field( $checkout ) {

	echo '<h3>'.__('Kies jouw salon').'</h3>';

	woocommerce_form_field( 'klant-salon', array(
	    'type'          => 'select',
	    'class'         => array( 'wps-drop' ),
	    'label'         => __( 'Kies jouw salon' ),
	    'options'       => array(
	    	'blank'		=> __( 'Kies jouw salon', 'wps' ),
	        'amsterdam-bilderdijk'	=> __( 'Bilderdijkstraat Amsterdam', 'wps' ),
	        'amsterdam-van-wou'	=> __( 'Van Woustraat Amsterdam', 'wps' ),
	        'nijmegen-kannenmarkt' 	=> __( 'Kannenmarkt Nijmegen', 'wps' ),
	        'blanco' 	=> __( 'Ik ben nog geen klant', 'wps' )
	    )
 ),

	$checkout->get_value( 'klant-salon' ));

}

//* Process the checkout
add_action('woocommerce_checkout_process', 'wps_select_checkout_field_process');
function wps_select_checkout_field_process() {
	global $woocommerce;
	// Check if set, if its not set add an error.
	if ($_POST['klant-salon'] == "blank") wc_add_notice( '<strong>Selecteer een van de opties</strong>', 'error' );
}


//* Update the order meta with field value
add_action('woocommerce_checkout_update_order_meta', 'wps_select_checkout_field_update_order_meta');
function wps_select_checkout_field_update_order_meta( $order_id ) {
	if ($_POST['klant-salon']) update_post_meta( $order_id, 'klant-salon', esc_attr($_POST['klant-salon']));
}


//* Display field value on the order edition page
add_action( 'woocommerce_admin_order_data_after_billing_address', 'wps_select_checkout_field_display_admin_order_meta', 10, 1 );
function wps_select_checkout_field_display_admin_order_meta($order){
	echo '<p><strong>'.__('Kies jouw salon').':</strong> ' . get_post_meta( $order->id, 'klant-salon', true ) . '</p>';
}


//* Add selection field value to emails
add_filter('woocommerce_email_order_meta_keys', 'wps_select_order_meta_keys');
function wps_select_order_meta_keys( $keys ) {
	$keys['Daypart:'] = 'klant-salon';
	return $keys;
}

/**
 * Hide shipping rates when free shipping is available.
 * Updated to support WooCommerce 2.6 Shipping Zones.
 *
 * @param array $rates Array of rates found for the package.
 * @return array
 */
add_filter( 'woocommerce_package_rates', 'my_hide_shipping_when_free_is_available', 100 );
function my_hide_shipping_when_free_is_available( $rates ) {
	$free = array();
	foreach ( $rates as $rate_id => $rate ) {
		if ( 'free_shipping' === $rate->method_id ) {
			$free[ $rate_id ] = $rate;
			break;
		}
	}
	return ! empty( $free ) ? $free : $rates;
}
