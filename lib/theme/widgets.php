<?php
/**
 * Theme:				
 * Template:			widgets.php
 * Description:			Create custom widgets to use in sidebars
 */


/**
 * unregister_default_widgets
 * 
 * Uncomment a rule to unregister a widget.
 * This includes all default widgets of WordPress.
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/widgets_init/
 */
add_action( 'widgets_init', 'unregister_default_widgets' );
function unregister_default_widgets() {
	// unregister_widget( 'WP_Widget_Pages' );
	// unregister_widget( 'WP_Widget_Calendar' );
	// unregister_widget( 'WP_Widget_Archives' );
	// unregister_widget( 'WP_Widget_Links' );
	// unregister_widget( 'WP_Widget_Meta' );
	// unregister_widget( 'WP_Widget_Search' );
	// unregister_widget( 'WP_Widget_Text' );
	// unregister_widget( 'WP_Widget_Categories' );
	// unregister_widget( 'WP_Widget_Recent_Posts' );
	// unregister_widget( 'WP_Widget_Recent_Comments' );
	// unregister_widget( 'WP_Widget_RSS' );
	// unregister_widget( 'WP_Widget_Tag_Cloud' );
	// unregister_widget( 'WP_Nav_Menu_Widget' );
}

/**
 * register_custom_widgets
 * 
 * Custom widget registration.
 * These widgets are defined later in this file.
 * 
 * Uncomment the widgets to include them
 * 
 * @since	1.0
 * @link	https://developer.wordpress.org/reference/hooks/widgets_init/
 */
add_action( 'widgets_init', 'register_custom_widgets' );
function register_custom_widgets() {
	// register_widget( 'Button_Widget' );
	// register_widget( 'Social_Widget' );
	// register_widget( 'Highlight_Post_Widget' );
}

/**
 * Button_Widget
 * 
 * Custom button widget class.
 * Has a title, link and type of button fields.
 *
 * @since		1.0
 * @package		WP_Widget
 * @subpackage	Button_Widget
 * @link		https://developer.wordpress.org/reference/classes/wp_widget/
 * @link		https://codex.wordpress.org/Widgets_API
 */
class Button_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 * 
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'button-widget',
			'description' 					=> __( 'Button with customizable title and type', 'text_domain' ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'button_widget', __( 'Button', 'text_domain' ), $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
		$title 	= apply_filters( 'widget_title', $instance[ 'title' ] );
		$link 	= isset( $instance[ 'link' ] ) ? esc_attr( $instance[ 'link' ] ) : '';
		$type 	= isset( $instance[ 'type' ] ) ? esc_attr( $instance[ 'type' ] ) : '';

		echo $args['before_widget'];
			echo '<a class="button ' . $type . '" href="' . $link . '" role="button" title="'. $title . '">' . $title . '</a>';
		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 	= ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$link 	= ! empty( $instance[ 'link' ] ) ? $instance[ 'link' ] : ''; 
		$type 	= ! empty ( $instance[ 'type' ] ) ? $instance[ 'type' ] : ''; ?>

		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">Title:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'link' ); ?>">Link</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'link' ); ?>" name="<?php echo $this->get_field_name( 'link' ); ?>" value="<?php echo esc_attr( $link ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'type' ); ?>">Button type</label>
			<select class="widefat" id="<?php echo $this->get_field_id( 'type' ); ?>" name="<?php echo $this->get_field_name( 'type' ); ?>">
				<option value="button--standard" <?php if ($type === 'button--standard') echo 'selected'; ?>>Standaard</option>
				<option value="button--alternate" <?php if ($type === 'button--alternate') echo 'selected'; ?>>Alternatief</option>
				<option value="button--glow" <?php if ($type === 'button--glow') echo 'selected'; ?>>Met gloei</option>
			</select>
		</p>

		<?php
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance = $old_instance;
		$instance[ 'title' ] 	= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'link' ] 	= strip_tags( $new_instance[ 'link' ] );
		$instance[ 'type' ] 	= strip_tags( $new_instance[ 'type' ] );
		return $instance;
	}
}


/**
 * Social_Widget
 * 
 * Custom social media buttons widget class.
 * Outputs a list of buttons with Font Awesome 5
 * icons.
 *
 * @since		1.0
 * @package		WP_Widget
 * @subpackage	Social_Widget
 * @link		https://developer.wordpress.org/reference/classes/wp_widget/
 * @link		https://codex.wordpress.org/Widgets_API
 */
class Social_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 * 
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'social-widget',
			'description' 					=> __( 'Social media buttons widget', 'text_domain' ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'social_widget', __( 'Social', 'text_domain' ), $widget_ops );
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
		$title 			= apply_filters( 'widget_title', $instance[ 'title' ] );
		$facebook 		= isset( $instance[ 'facebook' ] ) ? esc_attr( $instance[ 'facebook' ] ) : '';
		$twitter 		= isset( $instance[ 'twitter' ] ) ? esc_attr( $instance[ 'twitter' ] ) : '';
		$instagram 		= isset( $instance[ 'instagram' ] ) ? esc_attr( $instance[ 'instagram' ] ) : '';
		$pinterest 		= isset( $instance[ 'pinterest' ] ) ? esc_attr( $instance[ 'pinterest' ] ) : '';
		$google 		= isset( $instance[ 'google' ] ) ? esc_attr( $instance[ 'google' ] ) : '';
		$linkedin 		= isset( $instance[ 'linkedin' ] ) ? esc_attr( $instance[ 'linkedin' ] ) : '';
		$youtube 		= isset( $instance[ 'youtube' ] ) ? esc_attr( $instance[ 'youtube' ] ) : '';
		$show_labels 	= isset( $instance[ 'show_labels' ] ) ? $instance[ 'show_labels' ] === 'on' ? true : false : false;
		
		echo $args['before_widget'];
		
			if ( !empty( $instance[ 'title' ] ) ) {
				echo $args[ 'before_title' ] . $title . $args[ 'after_title' ];
			}
		
			echo '<div class="socials">';
				echo '<ul class="socials__list">';
					
					if( $facebook ) { echo '<li class="socials__item"><a class="socials__link" href="' . $facebook . '" rel="external" target="_blank" title="Facebook"><div class="socials__icon"><i class="fab fa-facebook"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Facebook</span>' : '' ) . '</a></li>'; }
					if( $twitter ) { echo '<li class="socials__item"><a class="socials__link" href="' . $twitter . '" rel="external" target="_blank" title="Twitter"><div class="socials__icon"><i class="fab fa-twitter"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Twitter</span>' : '' ) . '</a></li>'; }
					if( $instagram ) { echo '<li class="socials__item"><a class="socials__link" href="' . $instagram . '" rel="external" target="_blank" title="Instagram"><div class="socials__icon"><i class="fab fa-instagram"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Instagram</span>' : '' ) . '</a></li>'; }
					if( $pinterest ) { echo '<li class="socials__item"><a class="socials__link" href="' . $pinterest . '" rel="external" target="_blank" title="Pinterest"><div class="socials__icon"><i class="fab fa-pinterest"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Pinterest</span>' : '' ) . '</a></li>'; }
					if( $google ) { echo '<li class="socials__item"><a class="socials__link" href="' . $google . '" rel="external" target="_blank" title="Google+"><div class="socials__icon"><i class="fab fa-google-plus"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Google+</span>' : '' ) . '</a></li>'; }
					if( $linkedin ) { echo '<li class="socials__item"><a class="socials__link" href="' . $linkedin . '" rel="external" target="_blank" title="LinkedIn"><div class="socials__icon"><i class="fab fa-linkedin"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">LinkedIn</span>' : '' ) . '</a></li>'; }
					if( $youtube ) { echo '<li class="socials__item"><a class="socials__link" href="' . $youtube . '" rel="external" target="_blank" title="Youtube"><div class="socials__icon"><i class="fab fa-youtube"></i></div>' . ( ( $show_labels === true ) ? '<span class="socials__name">Youtube</span>' : '' ) . '</a></li>'; }
	
				echo '</ul>';
			echo '</div>';
		echo $args['after_widget'];
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 			= ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$facebook 		= ! empty( $instance[ 'facebook' ] ) ? $instance[ 'facebook' ] : '';
		$twitter 		= ! empty( $instance[ 'twitter' ] ) ? $instance[ 'twitter' ] : '';
		$instagram 		= ! empty( $instance[ 'instagram' ] ) ? $instance[ 'instagram' ] : '';
		$pinterest 		= ! empty( $instance[ 'pinterest' ] ) ? $instance[ 'pinterest' ] : '';
		$google 		= ! empty( $instance[ 'google' ] ) ? $instance[ 'google' ] : '';
		$linkedin 		= ! empty( $instance[ 'linkedin' ] ) ? $instance[ 'linkedin' ] : '';
		$youtube 		= ! empty( $instance[ 'youtube' ] ) ? $instance[ 'youtube' ] : '';
		$show_labels 	= ! empty( $instance[ 'show_labels' ] ) ? 'on' : ''; ?>
		
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">Title:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'facebook' ); ?>">Facebook</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'facebook' ); ?>" name="<?php echo $this->get_field_name( 'facebook' ); ?>" value="<?php echo esc_attr( $facebook ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'twitter' ); ?>">Twitter</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'twitter' ); ?>" name="<?php echo $this->get_field_name( 'twitter' ); ?>" value="<?php echo esc_attr( $twitter ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'instagram' ); ?>">Instagram</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'instagram' ); ?>" name="<?php echo $this->get_field_name( 'instagram' ); ?>" value="<?php echo esc_attr( $instagram ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'pinterest' ); ?>">Pinterest</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'pinterest' ); ?>" name="<?php echo $this->get_field_name( 'pinterest' ); ?>" value="<?php echo esc_attr( $pinterest ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'google' ); ?>">Google+</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'google' ); ?>" name="<?php echo $this->get_field_name( 'google' ); ?>" value="<?php echo esc_attr( $google ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'linkedin' ); ?>">LinkedIn</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'linkedin' ); ?>" name="<?php echo $this->get_field_name( 'linkedin' ); ?>" value="<?php echo esc_attr( $linkedin ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'youtube' ); ?>">Youtube</label>
			<input type="url" class="widefat" id="<?php echo $this->get_field_id( 'youtube' ); ?>" name="<?php echo $this->get_field_name( 'youtube' ); ?>" value="<?php echo esc_attr( $youtube ); ?>" />
		</p>
		<p>
			<label for"<?php echo $this->get_field_id( 'show_labels' ); ?>">Toon labels van social links</label>
			<input type="checkbox" class="checkbox" id="<?php echo $this->get_field_id( 'show_labels' ); ?>" name="<?php echo $this->get_field_name( 'show_labels' ); ?>" <?php checked( esc_attr( $show_labels ), 'on' ); ?> />
		</p>
		
		<?php
			
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance = $old_instance;
		$instance[ 'title' ] 		= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'facebook' ] 	= strip_tags( $new_instance[ 'facebook' ] );
		$instance[ 'twitter' ] 		= strip_tags( $new_instance[ 'twitter' ] );
		$instance[ 'instagram' ] 	= strip_tags( $new_instance[ 'instagram' ] );
		$instance[ 'pinterest' ] 	= strip_tags( $new_instance[ 'pinterest' ] );
		$instance[ 'google' ] 		= strip_tags( $new_instance[ 'google' ] );
		$instance[ 'linkedin' ] 	= strip_tags( $new_instance[ 'linkedin' ] );
		$instance[ 'youtube' ] 		= strip_tags( $new_instance[ 'youtube' ] );
		$instance[ 'show_labels' ] 	= strip_tags( $new_instance[ 'show_labels' ] );
		return $instance;
	}
}


/**
 * Highlight_Post_Widget
 * 
 * Custom spotlight widget for selecting a single 
 * post to highlight.
 *
 * @since		1.0
 * @package		WP_Widget
 * @subpackage	Highlight_Post_Widget
 * @link		https://developer.wordpress.org/reference/classes/wp_widget/
 * @link		https://codex.wordpress.org/Widgets_API
 */
class Highlight_Post_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 * 
	 */
	public function __construct() {
		$widget_ops = array(
			'classname' 					=> 'highlight-post-widget',
			'description' 					=> __( 'Pick a highlighted post', 'text_domain' ),
			'customize_selective_refresh' 	=> true,
		);
		parent::__construct( 'highlight_post_widget', __( 'Highlight Post', 'text_domain' ), $widget_ops );
	}
	
	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		
		// outputs the content of the widget
		$title 		= apply_filters( 'widget_title', $instance[ 'title' ] );
		$highlight 	= isset( $instance[ 'highlight' ] ) ? esc_attr( $instance[ 'highlight' ] ) : '';
		
		echo $args[ 'before_widget' ];
		
			// Only output the title if it is set
			if ( ! empty( $instance[ 'title' ] ) ) {
				echo $args[ 'before_title' ] . $title . $args[ 'after_title' ];
			}
			
			// If a highlight is selected
			if ( $highlight !== '') {
				
				// Arguments for query
				$query_args = array(
					'post_type'			=> 'post',
					'post__in'			=> $highlight,
					'post_status'		=> 'publish'
				);
				
				// Create a new query
				$query = new WP_Query( $query_args );

				// Loop through the results
				if ( $query->have_posts() ) { 
					while ( $query->have_posts() ) { 
						$query->the_post(); 
					
						// Customize the output here
					
					} wp_reset_postdata(); 
				}
				
			}
			
		echo $args[ 'after_widget' ];
		
	}
	
	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
		$title 		= ! empty( $instance[ 'title' ] ) ? $instance[ 'title' ] : '';
		$highlight 	= ! empty( $instance[ 'highlight' ] ) ? $instance[ 'highlight' ] : false; 

		// Set arguments for query
		$args = array(
			'post_type'			=> 'post',
			'post_status'		=> 'publish',
			'posts_per_page'	=> '-1'
		);

		// Create a new query
		$query = new WP_Query( $args );
		?>
		
		<p>
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">Title:</label>
			<input type="text" class="widefat" id="<?php echo $this->get_field_id( 'title' ); ?>" name="<?php echo $this->get_field_name( 'title' ); ?>" value="<?php echo esc_attr( $title ); ?>" />
		</p>
		<p>
			<label for="<?php echo $this->get_field_id( 'highlight' ); ?>">Post to highlight:</label>
			<select class="widefat" id="<?php echo $this->get_field_id( 'highlight' ); ?>" name="<?php echo $this->get_field_name( 'highlight' ); ?>">
				<option value="">Pick a post</option>
				<?php if ( $query->have_posts() ) { while ( $query->have_posts() ) { $query->the_post(); ?>
					<option value="<?php the_id(); ?>" <?php selected( $highlight, get_the_id() ); ?>><?php the_title(); ?></option>
				<?php } wp_reset_postdata(); } ?>
			</select>
		</p>
		
		<?php
		
	}
	
	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
		$instance 					= $old_instance;
		$instance[ 'title' ] 		= strip_tags( $new_instance[ 'title' ] );
		$instance[ 'highlight' ] 	= strip_tags( $new_instance[ 'highlight' ] );
		return $instance;
	}
	
}