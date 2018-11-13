<?php
/**
 * Theme:			
 * Template:		class-form.php
 * Description:		Form class template for validating forms
 */


/**
 * Form
 * 
 * Creates an instance to handle
 * the input and output of a form.
 * 
 * @since	1.0
 * @author	control
 * @package Form
 */
class Form {

	// IBAN country codes
	const IBAN_COUNTRIES = array(
		'al'=>28,'ad'=>24,'at'=>20,'az'=>28,'bh'=>22,'be'=>16,
		'ba'=>20,'br'=>29,'bg'=>22,'cr'=>21,'hr'=>21,'cy'=>28,
		'cz'=>24,'dk'=>18,'do'=>28,'ee'=>20,'fo'=>18,'fi'=>18,
		'fr'=>27,'ge'=>22,'de'=>22,'gi'=>23,'gr'=>27,'gl'=>18,
		'gt'=>28,'hu'=>28,'is'=>26,'ie'=>22,'il'=>23,'it'=>27,
		'jo'=>30,'kz'=>20,'kw'=>30,'lv'=>21,'lb'=>28,'li'=>21,
		'lt'=>20,'lu'=>20,'mk'=>19,'mt'=>31,'mr'=>27,'mu'=>30,
		'mc'=>27,'md'=>24,'me'=>22,'nl'=>18,'no'=>15,'pk'=>24,
		'ps'=>29,'pl'=>28,'pt'=>25,'qa'=>29,'ro'=>24,'sm'=>27,
		'sa'=>24,'rs'=>22,'sk'=>24,'si'=>19,'es'=>24,'se'=>24,
		'ch'=>21,'tn'=>24,'tr'=>26,'ae'=>23,'gb'=>22,'vg'=>24
	);

	// IBAN character number replacements
	const IBAN_CHARS = array(
		'a'=>10,'b'=>11,'c'=>12,'d'=>13,'e'=>14,'f'=>15,'g'=>16,
		'h'=>17,'i'=>18,'j'=>19,'k'=>20,'l'=>21,'m'=>22,'n'=>23,
		'o'=>24,'p'=>25,'q'=>26,'r'=>27,'s'=>28,'t'=>29,'u'=>30,
		'v'=>31,'w'=>32,'x'=>33,'y'=>34,'z'=>35
	);

	/**
	 * Creates new instance of this
	 * class.
	 * 
	 * @param	string $action Name of action of form.
	 * @param	array $ignore_field Fields to ignore.
	 */
	public function __construct( $action, $register = array( 'post', 'ajax' ), $ignore_fields = array( 'action', 'submit_primary', 'submit_secondary', '_wp_nonce', '_wp_http_referrer', '_wp_redirect' ) ) {
		$this->action = $action;
		$this->register = $register;
		$this->ignore_fields = $ignore_fields;
		$this->google_api_key = '';
		if ( in_array( 'post', $this->register ) ) $this->register_post_actions( $this->action, 'post_response' );
		if ( in_array( 'ajax', $this->register ) ) $this->register_ajax_actions( $this->action, 'ajax_response' );
	}

	/**
	 * register_post_actions
	 * 
	 * Registers the form to admin_post
	 * hook so we can listen to the response.
	 * 
	 * @param	string $action Name of the form action.
	 * @param	string $method Name of response method.
	 */
	private function register_post_actions( $action, $method ) {
		add_action( "admin_post_nopriv_{$action}", array( $this, $method ), 10, 0 );
		add_action( "admin_post_{$action}", array( $this, $method ), 10, 0 );
	}

	/**
	 * register_ajax_actions
	 * 
	 * Registers the form to admin_ajax
	 * hook so we can listen to the response.
	 * 
	 * @param	string $action Name of the form action.
	 * @param	string $method Name of response method.
	 */
	private function register_ajax_actions( $action, $method ) {
		add_action( "wp_ajax_nopriv_{$action}", array( $this, $method ), 10, 0 );
		add_action( "wp_ajax_{$action}", array( $this, $method ), 10, 0 );
	}

	/**
	 * post_response
	 * 
	 * Handle the form post response
	 */
	public function post_response() {
		// Placeholder function
	}

	/**
	 * ajax_response
	 * 
	 * Handle the form post response
	 */
	public function ajax_response() {
		// Placeholder function
	}

	/**
	 * sanitize_fields
	 * 
	 * Sanitize fields 
	 */
	public function sanitize_fields( $fields ) {
		// Placeholder function
	}

	/**
	 * validate_postalcode
	 * 
	 * Check if string is valid postalcode.
	 * 
	 * @param	string $field Field to check.
	 * @return	bool
	 */
	public static function validate_postalcode( $field ) {
		if ( preg_match( '/^[1-9][0-9]{3}\s?([a-zA-Z]{2})?$/', $field ) ) return true;
		return false;
	}

	/**
	 * validate_address
	 * 
	 * Check if string is valid address.
	 * 
	 * @param	string $field Field to check.
	 * @return	bool
	 */
	public static function validate_address( $field ) {
		if ( preg_match( '/[a-zA-Z0-9]/', $field ) ) return true;
		return false;
	}

	/**
	 * validate_email
	 * 
	 * Check if string is valid email.
	 * 
	 * @param	string $field Field to check.
	 * @return	bool
	 */
	public static function validate_email( $field ) {
		if ( preg_match( '/([w-]+@[w-]+.[w-]+)/', $field ) ) return true;
		return false;
	}

	/**
	 * validate_iban
	 * 
	 * Check if string is valid IBAN.
	 * 
	 * @param	string $field Field to check.
	 * @return	bool
	 */
	public static function validate_iban( $field ) {
		$iban = strtolower( str_replace( ' ', '', $field ) );
		if ( strlen( $iban ) !== self::IBAN_COUNTRIES[ substr( $iban, 0, 2 ) ] ) return false;
		$movedChar = substr( $iban, 4 ).substr( $iban, 0, 4 );
		$movedCharArray = str_split( $movedChar );
		$newString = '';
		foreach ( $movedCharArray as $key => $value ) {
			if ( ! is_numeric( $movedCharArray[ $key ] ) ){
				$movedCharArray[ $key ] = self::IBAN_CHARS[ $movedCharArray[ $key ] ];
			}
			$newString .= $movedCharArray[ $key ];
		}
		if( bcmod( $newString, '97' ) == 1 ) return true;
		return false;
	}

	/**
	 * validate_phone
	 * 
	 * Check if string is valid phone number.
	 * 
	 * @param	string $field Field to check.
	 * @return	bool
	 */
	public static function validate_phone( $field ) {
		if ( preg_match( '/^(\+|00|0)(31\s?)?(6[\s-]?[1-9][0-9]{7}|[1-9][0-9][\s-]?[1-9][0-9]{6}|[1-9][0-9]{2}[\s-]?[1-9][0-9]{5})$/', $field ) ) return true;
		return false;
	}

	/**
	 * calculate_distance_between
	 * 
	 * Calculates the distance 
	 * between two points
	 * 
	 * @since	1.0
	 * 
	 * @param	array $location_1
	 * @param	array $location_2
	 * @return	integer
	 */
	public function calculate_distance_between( array $location_1, array $location_2 ) {
		$theta = $location_1[ 'lng' ] - $location_2[ 'lng' ];
		$distance = ( sin( deg2rad( $location_1[ 'lat' ] ) ) * 
			sin( deg2rad( $location_2[ 'lat' ] ) ) ) + 
			( cos( deg2rad( $location_1[ 'lat' ] ) ) * 
			cos( deg2rad( $location_2[ 'lat' ] ) ) * 
			cos( deg2rad( $theta ) ) );
		$distance = acos( $distance );
		$distance = rad2deg( $distance );
		$distance = $distance * 60 * 1.1515; 
		$distance = $distance * 1.609344;
		return ( round( $distance ) );
	}

	/**
	 * get
	 * 
	 * HTTP Request with GET
	 * 
	 * @param	string $url URL tot get response from.
	 * @param	array $args Arguments for wp_remote_get.
	 * @return	array
	 */
	public function get( string $url, array $args = array() ) {

		$response = wp_remote_get( $url, $args );
		return $response;
	}

	/**
	 * post
	 * 
	 * HTTP Request with POST
	 * 
	 * @param	string $url URL tot get response from.
	 * @param	array $args Arguments for wp_remote_post.
	 * @return	array
	 */
	public function post( string $url, array $args = array() ) {

		$response = wp_remote_post( $url, $args );
		return $response;
	} 

	/**
     * format_xml
     * 
     * Create a usable and
     * readable object structure
     * out of XML
     * 
     * @param   string $str
     * @return  array
     */
    public function format_xml( string $str ) {

        // Make the XML Response readeable.
        $clean_xml = str_ireplace( [ 'SOAP-ENV:', 'SOAP:' ], '', $str );
        $xml = simplexml_load_string( $clean_xml );

        return (array)json_decode( json_encode( $xml ), true );

    }

	/**
	 * email
	 * 
	 * Send email from this form.
	 * 
	 * @param	string $to Email addressee.
	 * @param	string $from Email from.
	 * @param	string $subject Subject of email.
	 * @param	string $message Message of email.
	 * @return	bool If message has been succesfully sent
	 */
	public function email( string $to, string $from, string $subject, string $message ) {

		// Set headers for mail to support HTML format.
		$email_headers = array(
			"From: {$from}",
			"Reply-To: {$from}",
			'MIME-Version: 1.0',
			'Content-type: text/html; charset=utf-8'
		);

		// Send email
		$email_sent = wp_mail( $to, $subject, $message, $email_headers );

		return $email_sent;

	}

	/**
	 * error
	 * 
	 * Create an error and
	 * redirect the user
	 * 
	 * @param	string $message
	 * @param	array $args
	 */
	public function error( $message, $args ) {

	}

	/**
	 * redirect
	 * 
	 * Redirect the user to a new destination.
	 * Exits the form.
	 * 
	 * @param	string $url URL to send the user to.
	 * @param	array $args Optional query variables.
	 */
	public function redirect( string $url, array $args = array() ) {
		wp_redirect(
			esc_url_raw( 
				add_query_arg( 
					$args,
					$url
				) 
			)
		);
		exit;
	}

	/**
	 * die
	 * 
	 * Redirect the user to an error page
	 * 
	 * @param	string $message Error message
	 * @param	string $title Error title
	 * @param	array $args Optional query variables
	 */
	public function die( string $message, string $title, array $args = array() ) {
		wp_die( $message, $title, $args );
	}

}