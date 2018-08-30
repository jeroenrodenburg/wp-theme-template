<?php
/**
 * Theme:
 * Template:			Reservation.php
 * Description:			A class which can instantiate a new reservation module
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Get the WP_List_Table class
if ( ! class_exists( 'WP_List_Table' ) ) {
    require_once( ABSPATH . 'wp-admin/includes/class-wp-screen.php' );
    require_once( ABSPATH . 'wp-admin/includes/screen.php' );
    require_once( ABSPATH . 'wp-admin/includes/class-wp-list-table.php' );
    require_once( ABSPATH . 'wp-admin/includes/template.php' );
}

/**
 * Reservations
 * 
 * A reservation module constructor
 * 
 * @package Reservations
 * @author  control <emiel@controldigital.nl>
 * @version 1.0
 */
class Reservations {



    /**
     * __construct
     * 
     * Creates a new instance of the Reservations class.
     * This will setup a post type and a admin menu item
     * in which the reservations will be displayed.
     * 
     * @type    function
     * @param   string $post_type The post type name for a single reservation.
     * @param   string $domain Text domain for l10n.
     */
    public function __construct( $post_type = 'reservation', $domain = 'text_domain' ) {

        /**
         * Store the post type so that all the 
         * calls and functions will use the
         * same post type.
         * @property    $post_type
         */
        $this->post_type    = $post_type;

        /**
         * Use the theme name as the text_domain or fallback to 
         * the 'text_domain' string if THEME_NAME is not defined.
         * @property    $domain
         */
        $this->domain       = $domain;

        // Setup the post type
        add_action( 'init', array( $this, 'setup_post_type' ), 10 );
    }



    /**
     * setup_post_type
     * 
     * Creates a new post type that will be used as the
     * post type for the reservations.
     * 
     * @since   1.0
     * @access  private
     */
    private function setup_post_type() {

        $labels = array(
            'name'                  => _x( 'Reservations', 'Post Type General Name', $this->domain ),
            'singular_name'         => _x( 'Reservation', 'Post Type Singular Name', $this->domain ),
            'menu_name'             => __( 'Reservations', $this->domain ),
            'name_admin_bar'        => __( 'Reservation', $this->domain ),
            'archives'              => __( 'Reservation Archive', $this->domain ),
            'attributes'            => __( 'Reservation Attributes', $this->domain ),
            'parent_item_colon'     => __( 'Parent Reservation:', $this->domain ),
            'all_items'             => __( 'All Reservations', $this->domain ),
            'add_new_item'          => __( 'Add New Reservation', $this->domain ),
            'add_new'               => __( 'Add New', $this->domain ),
            'new_item'              => __( 'New Reservation', $this->domain ),
            'edit_item'             => __( 'Edit Reservation', $this->domain ),
            'update_item'           => __( 'Update Reservation', $this->domain ),
            'view_item'             => __( 'View Reservation', $this->domain ),
            'view_items'            => __( 'View Reservations', $this->domain ),
            'search_items'          => __( 'Search Reservations', $this->domain ),
            'not_found'             => __( 'Not found', $this->domain ),
            'not_found_in_trash'    => __( 'Not found in trash', $this->domain ),
            'featured_image'        => __( 'Reservation image', $this->domain ),
            'set_featured_image'    => __( 'Set reservation image', $this->domain ),
            'remove_featured_image' => __( 'Remove reservation image', $this->domain ),
            'use_featured_image'    => __( 'Use image for reservation', $this->domain ),
            'insert_into_item'      => __( 'Insert into reservation', $this->domain ),
            'uploaded_to_this_item' => __( 'Uploaded to this reservation', $this->domain ),
            'items_list'            => __( 'Reservations list', $this->domain ),
            'items_list_navigation' => __( 'Reservations list navigation', $this->domain ),
            'filter_items_list'     => __( 'Filter reservations list', $this->domain ),
        );

        $args = array(
            'label'                 => __( 'Reservations', $this->domain ),
            'description'           => __( 'Reservation post type to track bookings', $this->domain ),
            'labels'                => $labels,
            'supports'              => array( 'title' ),
            'taxonomies'            => array( ),
            'hierarchical'          => true,
            'public'                => true,
            'show_ui'               => false,
            'show_in_menu'          => false,
            'menu_position'         => 5,
            'show_in_admin_bar'     => true,
            'show_in_nav_menus'     => true,
            'can_export'            => true,
            'has_archive'           => false,
            'exclude_from_search'   => false,
            'publicly_queryable'    => true,
            'capability_type'       => 'page',
        );

        register_post_type( $this->post_type, $args );

    }



    /**
     * setup_admin_menu
     * 
     * Sets up the arguments for creating a
     * new menu item in the WP Dashboard.
     * 
     * Titles, slug and icon can be modified if necessary.
     * 
     * @since   1.0
     * @access  private
     */
    private function setup_admin_menu() {

        /**
         * Arguments needed for the add_menu_page
         * function which creates a new menu page item.
         */
        $page_title     = __( 'Reservations', $this->domain );
        $menu_title     = __( 'Reservations', $this->domain );
        $capability     = 'manage_options';
        $menu_slug      = '/reservations.php';
        $function       = array( $this, 'setup_admin_page' );
        $icon_url       = 'dashicons-cart';
        $position       = 7;

        /**
         * Insert arguments into function
         * to create new menu page.
         */
        add_menu_page( 
            $page_title, 
            $menu_title, 
            $capability, 
            $menu_slug, 
            $function, 
            $icon_url, 
            $position 
        );

        /**
         * Add custom CSS and JS to the admin
         */
        add_action( 'admin_enqueue_scripts', array( $this, 'setup_admin_scripts' ), 10 );

    }



    /**
     * setup_admin_page
     * 
     * @since   1.0
     * @access  private
     * 
     * @return  string
     */
    private function setup_admin_page() {

        $html = '
        <div class="wrap">
            <h1>'. __( 'Reservations', $this->domain ) . '</h1>
            <p>' . __( 'All reservations are shown here', $this->domain ) . '</p>
            <hr class="wp-header-end">
            <form id="reservations-form" method="post">';

        
        $html .= '
            </form>
        </div>
        ';

        return $html;

    }



    /**
     * setup_admin_scripts
     * 
     * @since   1.0
     * @access  private
     */
    private function setup_admin_scripts() {

        // wp_register_style( 'handle', get_template_directory_uri() . '/css/admin/', false, false );
        // wp_enqueue_style( 'handle' );

        // wp_register_script( 'handle', get_template_directory_uri() . '/js/admin/', false, false, true );
        // wp_enqueue_script( 'handle' );

    }




    /**
     * get_booking
     * 
     * @since   1.0
     * @access  public
     * 
     * @param   int $id
     * @return  WP_Post
     */
    public function get_booking( $id ) {

        $post = get_post( $id );
        return $post;

    }



    /**
     * get_bookings
     * 
     * @since   1.0
     * @access  public
     * 
     * @param   DateTime $from
     * @param   DateTime $to
     * @return  array
     */
    public function get_bookings( $from = null, $to = null ) {

        $posts = array();

        $args = array(
            'post_type'         => $this->post_type,
            'post_status'       => 'publish',
            'posts_per_page'    => -1
        );

        $query = new WP_Query( $args );
        if ( $query->have_posts() ) {
            while ( $query->have_posts() ) {
                $query->the_post();

                array_push( $posts, $query->post );

            }
        }

        return $posts;

    }



    /**
     * add_booking
     * 
     * @since   1.0
     * @access  public
     * 
     * @param   array $data
     * @return  WP_Post
     */
    public function add_booking( $data = array() ) {

        $reservation = array(
            'post_title'		=> uniqid(),
            'post_content'		=> '',
            'post_status'		=> 'publish',
            'post_type'			=> $this->post_type,
            'meta_input'		=> $data,
        );
        
        return wp_insert_post( $reservation );

    }



    /**
     * remove_booking
     * 
     * @since   1.0
     * @access  public
     * 
     * @param   int $id
     * @return  boolean
     */
    public function remove_booking( $id ) {

        return wp_delete_post( $id, true );

    }



}