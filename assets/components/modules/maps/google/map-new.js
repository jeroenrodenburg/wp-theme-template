/* jshint esversion: 6 */

/**
 *	@author Control <info@controldigital.nl>
 *	@file map.js
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
 * GoogleMap
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
 * @returns {GoogleMap}
 */
export function GoogleMap(element, options = {center: {lat: 52.3935744, lng: 4.8944151}, zoom: 8}) {

	/**
	 * Refer to own context
	 * @this	GoogleMap
	 */
	const self = this;

	/**
	 * validateMapElement
	 * 
	 * Checks if the given map element is valid
	 * and found or returns a null value.
	 * 
	 * @function
	 * @since	1.0
	 * 
	 * @param 	{(String|HTMLElement)} element The map element
	 * @returns	{(HTMLElement|Null)}
	 */
	const validateMapElement = (element) => {
		if (!element) return null;
		if ('string' === typeof element) {
			return document.querySelector(element);
		} else if (element instanceof HTMLElement) {
			return element;
		}
	};

	/**
	 * Get the map elements
	 * @type	{HTMLElement|Null}
	 */
	let mapElement = validateMapElement(element);
	if (mapElement === null) throw new Error('element argument has not been given or has returned null.');

	/**
	 * Create new map instance
	 * @type	{<google.maps.Map>}
	 */
	this.map = new google.maps.Map(mapElement, options);

	/**
	 * Store options
	 * @property
	 * @type	{Object}
	 */
	this.defaults = options;

	/**
	 * Set array for markers
	 * @property
	 * @type	{Array}
	 */
	this.markers = [];

	/**
	 * Set array for polylines
	 * @property
	 * @type	{Array}
	 */
	this.polylines = [];

	/**
	 * Set array for polygons
	 * @property
	 * @type	{Array}
	 */
	this.polygons = [];

	/**
	 * Set bounds for map
	 * @property
	 * @type	{Array}
	 */
	this.bounds = new google.maps.LatLngBounds();
	
	/**
	 * Set infowindow for map
	 * @property
	 * @type	{Null}
	 */
	this.infowindow = null;

	/**
	 * Close infowindows on map click
	 * @event	click
	 */
	google.maps.event.addListener(self.map, 'click', () => {
		if (self.infowindow) self.infowindow.close();
	});

	/**
	 * Resize event to keep the center in the middle of the map
	 * @event	resize
	 */
	window.addEventListener('resize', () => {
		requestAnimationFrame(() => {
			let center = self.map.getCenter();
			google.maps.event.trigger(self.map, 'resize');
			self.map.setCenter(center);
		});
	}, false);

}

/**
 * center
 * 
 * Centers the map on the given bounds or the 
 * default center lat/lng location.
 * 
 * @method
 * @since	1.0
 * 
 * @returns	{<google.maps.Map>} Returns the map instance.
 */
GoogleMap.prototype.center = function() {

	if (!this.bounds.isEmpty()) {
		this.map.fitBounds(this.bounds);
	} else {
		this.map.setCenter(this.defaults.center);
		this.map.setZoom(this.defaults.zoom);
	}

	return this;

};

/**
 * addMarkers
 * 
 * Add multiple markers to the map.
 * 
 * @function
 * @since 	1.0
 * 
 * @uses	addMarker()
 * 
 * @param 	{(Object[]|<google.maps.LatLng>[])} positions Objects with lat and lng properties.
 * @param	{(String|Number)} markers[].lat Latitude of position.
 * @param	{(String|Number)} markers[].lng Longitude of position.
 * @returns {GoogleMap}
 */
GoogleMap.prototype.addMarkers = function(positions) {

	// Loop over each given marker
	positions.forEach((position) => {

		/**
		 * Create coordinates
		 * @type	{<google.maps.LatLng>}
		 */
		const latLng = position instanceof google.maps.LatLng ? 
		position : 
		new google.maps.LatLng(position.lat, position.lng);

		/**
		 * Create marker
		 * @type	{<google.maps.Marker>}
		 */
		const marker = new google.maps.Marker({
			position: latLng,
			map: this.map
		});
		
		// Add position to bounds
		this.bounds.extend(marker.getPosition());

		// Add marker to array
		this.markers.push(marker);

	});

	return this;
	
};

/**
 * removeMarkers
 * 
 * Remove markers from map
 * 
 * @function
 * @since 	1.0
 * 
 * @param 	{<google.maps.Map>} map 
 * @returns {GoogleMap} returns the map object on resolve
 */
GoogleMap.prototype.removeMarkers = function() {

	// Loop over the markers
	this.markers.forEach((marker) => {
		marker.setMap(null);
	});

	// Remove markers from array
	this.markers = [];

	// Return GoogleMap object
	return this;

};