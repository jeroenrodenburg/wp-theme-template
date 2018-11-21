/* jshint esversion: 6 */

/**
 *	@author Control <info@controldigital.nl>
 *	@file polymap.js
 *	@version 1.0
 *	@license
 *	Copyright (c) 2018 Control.
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in all
 *	copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *	SOFTWARE.
 */



/**
 * Import the GoogleMap constructor
 */
import { GoogleMap } from './map.js';

/**
 * GooglePolyMap
 * 
 * Create a new map with the Google Maps JS API.
 * Takes a string or HTMLElement to select the element with the map.
 * 
 * @function
 * @module
 * @since 	1.0
 * 
 * @param 	{(String|HTMLElement)} mapElement The map element to select.
 * @param	{Object=} options Options for the google.maps.Map class.
 * @returns {GooglePolyMap}
 */
export function GooglePolyMap(element, options = {center: {lat: 52.3935744, lng: 4.8944151}, zoom: 8}) {
	GoogleMap.apply(this, arguments);
}

/**
 * Inherit the prototype of GoogleMap to the
 * GooglePolyMap object prototype.
 */
GooglePolyMap.prototype = Object.create(GoogleMap.prototype);

/**
 * Rebind the constructor.
 * @constructor
 */
GooglePolyMap.prototype.constructor = GooglePolyMap;

/**
 * addPolygons
 * 
 * Creates a polygon shape on the map.
 * In contrast to the polyline a polygon always closes its shape.
 * The colors and properties of the line can be adjusted with the options argument.
 * 
 * @method
 * @since	1.0
 * 
 * @param 	{Object[]} polygons An array with polygon options objects.
 * @param 	{Object} polygons.position Objects with lat and lng coordinates
 * @param	{(String|Number)} polygons.position.lat Latitude of position
 * @param	{(String|Number)} polygons.position.lng Longitude of position
 * @returns	{GooglePolyMap}
 */
GooglePolyMap.prototype.addPolygons = function(polygons = []) {

	polygons.forEach((polygon) => {

		/**
		 * Create new Polygon
		 * @type	{<google.maps.Polygon>}
		 */
		const pg = new google.maps.Polygon(polygon);

		// Push to polygons array
		this.polygons.push(pg);

		// Set the polygon to the map.
		pg.setMap(this.map);

	});
	
	return this;

};

/**
 * removePolygons
 * 
 * Remove polygons from the map.
 * 
 * @method
 * @since 	1.0
 * 
 * @returns {GooglePolyMap} returns the map object on resolve
 */
GooglePolyMap.prototype.removePolygons = function() {

	// Loop over the polylines
	this.polygons.forEach((polygon) => {
		polygon.setMap(null);
	});

	// Remove markers from array
	this.polygons = [];

	return this;

};

/**
 * addPolylines
 * 
 * Creates a polyline shape on the map.
 * A polyline is a simple line drawn with an array of coordinates.
 * 
 * @method
 * @since	1.0
 * 
 * @param 	{<google.maps.Map>} map Google maps map instance
 * @param 	{Object[]} polylines
 * @param 	{Object} polylines.position Objects with lat and lng coordinates
 * @param	{(String|Number)} polylines.position.lat Latitude of position
 * @param	{(String|Number)} polylines.position.lng Longitude of position
 * @returns	{GooglePolyMap}
 */
GooglePolyMap.prototype.addPolylines = function(polylines = []) {

	polylines.forEach((polyline) => {

		/**
		 * Create new Polyline
		 * @type	{<google.maps.Polyline>}
		 */
		const pl = new google.maps.Polyline(polyline);

		// Push to polylines
		this.polylines.push(pl);

		// Set the polyline to the map
		pl.setMap(map);

	});

	return this;

};

/**
 * removePolyLines
 * 
 * Remove polylines from map
 * 
 * @method
 * @since 	1.0
 * 
 * @returns {GooglePolyMap} returns the map object on resolve
 */
GooglePolyMap.prototype.removePolylines = function() {

	// Loop over the polylines
	this.polylines.forEach((polyline) => {
		polyline.setMap(null);
	});

	// Remove markers from array
	this.polylines = [];

	return this;

};