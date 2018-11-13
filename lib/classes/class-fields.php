<?php
/**
 * Theme:			
 * Template:		class-fields.php
 * Description:		Form class template for validating forms
 */


/**
 * Fields
 * 
 * An object for holding field
 * keys and values of a form submission.
 * 
 * @since	1.0
 * @author	control
 * @package OM_Signup_Fields
 */
class Fields {

    /**
     * Create new instance with an
     * entries array.
     */
    public function __construct() {
        $this->entries = array();
    }

    /**
     * Returns the selected field
     * 
     * @param   string $field
     * @return  any
     */
    public function get( $field ) {
        if ( isset( $this->entries[ $field ] ) )
            return $this->entries[ $field ];
    }

    /**
     * Add key and value 
     * to instance.
     * 
     * @param   string $field
     * @param   any $value
     * @return  this
     */
    public function add( $field, $value ) {
        $this->entries[ $field ] = $value ;
        return $this;
    }

    /**
     * Remove key and value 
     * from instance.
     * 
     * @param   string $field
     * @return  this
     */
    public function remove( $field ) {
        foreach ( $this->entries as $key => $value ) {
            if ( $key === $field ) unset( $this->entries[ $key ] );
        }
        return $this;
    }

    /**
     * Returns an array with only 
     * the keys.
     * 
     * @return  array
     */
    public function keys() {
        $keys = array();
        foreach ( $this->entries as $key => $value ) {
            array_push( $keys, $key );
        }
        return $keys;
    }

    /**
     * Returns an array with only 
     * the values.
     * 
     * @return  array
     */
    public function values() {
        $values = array();
        foreach ( $this->entries as $key => $value ) {
            array_push( $values, $value );
        }
        return $values;
    }

    /**
     * Magic function to check
     * if a property isset
     * 
     * @param   string $name
     * @return  boolean
     */
    public function __isset( $name ) {
        return isset( $this->entries[ $name ] );
    }

    /**
     * Converts the entries to
     * a queryiable string
     * 
     * @return  string
     */
    public function __toString() {
        $query = array();
        foreach ( $this->entries as $key => $value ) {
            array_push( $query, "{$key}={$value}" );
        }
        return '?' + implode( '&', $query );
    }

}