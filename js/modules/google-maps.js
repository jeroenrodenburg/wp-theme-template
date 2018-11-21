/* jshint esversion: 6 */

/**
 *	@author Control <info@controldigital.nl>
 *	@file google-maps.js
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
 * isGoogleMapInstance
 * 
 * Checks if the element is an instance of the
 * google.maps.Map constructor
 * 
 * @function
 * @since	1.0
 * 
 * @param	{HTMLElement} element
 * @returns	{Boolean}
 */
const isGoogleMapInstance = element => element && element instanceof google.maps.Map;

/**
 * createMap
 * 
 * Create a new map with the Google Maps JS API.
 * Takes a string or HTMLElement to select the element with the map.
 * 
 * @function
 * @since 	1.0
 * 
 * @param 	{(String|HTMLElement)} mapElement The map element to select
 * @param	{Object=} options Options for the google.maps.Map class
 * @returns {Promise} Returns google.maps.Map on resolve
 */
const createMap = (mapElement, options = {center: {lat: 52.3935744, lng: 4.8944151}, zoom: 8}) => {
	return new Promise((resolve, reject) => {

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
		let element = validateMapElement(mapElement);
		if (element === null) reject('mapElement argument has not been given or has returned null.');

		/**
		 * Create new map instance
		 * @type	{<google.maps.Map>}
		 */
		let map = new google.maps.Map(element, options);

		/**
		 * Store options
		 * @property
		 * @type	{Object}
		 */
		map.defaults = options;

		/**
		 * Set array for markers
		 * @property
		 * @type	{Array}
		 */
		map.markers = [];

		/**
		 * Set array for polylines
		 * @property
		 * @type	{Array}
		 */
		map.polylines = [];

		/**
		 * Set array for polygons
		 * @property
		 * @type	{Array}
		 */
		map.polygons = [];

		/**
		 * Set bounds for map
		 * @property
		 * @type	{Array}
		 */
		map.bounds = new google.maps.LatLngBounds();
		
		/**
		 * Set infowindow for map
		 * @property
		 * @type	{Null}
		 */
		map.infowindow = null;

		/**
		 * Close infowindows on map click
		 * @event	click
		 */
		google.maps.event.addListener(map, 'click', () => {
			if (map.infowindow) map.infowindow.close();
		});

		/**
		 * Resize event to keep the center in the middle of the map
		 * @event	resize
		 */
		window.addEventListener('resize', () => {
			requestAnimationFrame(() => {
				let center = map.getCenter();
				google.maps.event.trigger(map, 'resize');
				map.setCenter(center);
			});
		}, false);

		// Return the map
		resolve(map);

	});
};

/**
 * centerMap
 * 
 * Centers the map on the given bounds or the 
 * default center lat/lng location.
 * 
 * @function
 * @since	1.0
 * 
 * @uses	isGoogleMapInstance
 * 
 * @param 	{<google.maps.Map>} map Google maps map instance.
 * @returns	{<google.maps.Map>} Returns the map instance.
 */
const centerMap = (map) => {
	if (!isGoogleMapInstance(map)) throw new Error('map argument is not given');
	if (!map.bounds.isEmpty()) {
		map.fitBounds(map.bounds);
	} else {
		map.setCenter(map.defaults.center);
		map.setZoom(map.defaults.zoom);
	}
	return map;
};

/**
 * attachInfoWindow
 * 
 * Adds a InfoWindow to a marker.
 *
 * @function
 * @since 	1.0
 * 
 * @param 	{<google.maps.Marker>} marker
 * @param 	{String} content
 */
const attachInfoWindow = (marker, content, map) => {

	marker.addListener('click', function () {
		if (map.infowindow) map.infowindow.close();
		map.infowindow = new google.maps.InfoWindow({
			content: content
		});
		map.infowindow.open(map, marker);
	});
	
};

/**
 * addMarker
 * 
 * Add a single marker to the map.
 * 
 * @function
 * @since 	1.0
 * 
 * @param 	{(Object|<google.maps.LatLng>)} position Object with lat and lang properties.
 * @param	{(String|Number)} position.lat Latitude of position.
 * @param	{(String|Number)} position.lng Longitude of position.
 * @param 	{<google.maps.Map>} map Google maps map instance.
 * @returns {<google.maps.Map>} Returns the map.
 */
const addMarker = (position, map) => {
	if (!position || !isGoogleMapInstance(map)) throw new Error('position and/or map arguments not given');

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
		map: map
	});
	
	// Add position to bounds
	map.bounds.extend(marker.getPosition());

	// Add marker to array
	map.markers.push(marker);

	// Resolve and return map
	return map;

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
 * @param 	{<google.maps.Map>} map Google maps map instance.
 * @returns {<google.maps.Map>} Returns the map instance.
 */
const addMarkers = (positions, map) => {
	// Loop over positions and return the promise from addMarker
	positions.forEach(position => addMarker(position, map));

	// Return the map
	return map;
};

/**
 * Remove markers from map
 * 
 * @function
 * @since 	1.0
 * 
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removeMarkers = (map) => {
	if (!isGoogleMapInstance(map)) throw new Error('map argument not given');

	// Loop over the markers
	map.markers.forEach((marker) => {
		marker.setMap(null);
	});

	// Remove markers from array
	map.markers = [];

	// Return the map
	return map;
};

/**
 * addPolyline
 * 
 * Creates a polyline shape on the map.
 * A polyline is a simple line drawn with an array of coordinates.
 * 
 * @example
 * let pos = [
 * 	{lat: 37.772, lng: -122.214},
 * 	{lat: 21.291, lng: -157.821},
 * 	{lat: -18.142, lng: 178.431}
 * ];
 * 
 * addPolyline(pos, map);
 * 
 * @function
 * @since	1.0
 * 
 * @param 	{Object} position Objects with lat and lng coordinates
 * @param	{(String|Number)} position.lat Latitude of position
 * @param	{(String|Number)} position.lng Longitude of position
 * @param 	{<google.maps.Map>} map Google maps map instance
 * @param 	{Object=} options 
 * @returns	{Promise}
 */
const addPolyline = (position, map, options = {geodesic: true, strokeColor: '#ff0000', strokeOpacity: 1.0, strokeWeight: 2}) => {
	return new Promise((resolve, reject) => {
		if (position && map && map instanceof google.maps.Map) {

			// Add position to options
			options.path = position;

			// Create new Polyline
			const polyline = new google.maps.Polyline(options);

			// Push to polylines
			map.polylines.push(polyline);

			// Set the polyline to the map
			polyline.setMap(map);

			// Return the map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('coordinates and/or map arguments not given'));

		}
	});
};

/**
 * Remove polylines from map
 * 
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removePolylines = (map) => {
	return new Promise((resolve, reject) => {
		if (map && map instanceof google.maps.Map) {

			// Loop over the polylines
			map.polylines.forEach((polyline) => {
				polyline.setMap(null);
			});

			// Remove markers from array
			map.polylines = [];

			// Resolve with map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('map argument not given'));

		}
	});
};

/**
 * addPolygon
 * 
 * Creates a polygon shape on the map.
 * In contrast to the polyline a polygon always closes its shape.
 * The colors and properties of the line can be adjusted with the options argument.
 * 
 * @example
 * let pos = [
 * 	{lat: 37.772, lng: -122.214},
 * 	{lat: 21.291, lng: -157.821},
 * 	{lat: -18.142, lng: 178.431},
 * 	{lat: 37.772, lng: -122.214}
 * ];
 * 
 * addPolygone(pos, map);
 * 
 * @function
 * @since	1.0
 * @param 	{Object} position Objects with lat and lng coordinates
 * @param	{(String|Number)} position.lat Latitude of position
 * @param	{(String|Number)} position.lng Longitude of position
 * @param 	{<google.maps.Map>} map Google maps map instance
 * @param 	{Object=} options 
 * @returns	{Promise}
 */
const addPolygon = (position, map, options = {strokeColor: '#ff0000', strokeOpacity: 0.8, strokeWeight: 2, fillColor: '#ff000', fillOpacity: 0.35}) => {
	return new Promise((resolve, reject) => {
		if (position && map && map instanceof google.maps.Map) {

			// Add coordinates to options
			options.path = position;

			// Create new Polyline
			const polygon = new google.maps.Polygon(options);

			// Push to polylines
			map.polygons.push(polygon);

			// Set the polyline to the map
			polygon.setMap(map);

			// Return the map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('coordinates and/or map arguments not given'));

		}
	});
};

/**
 * Remove polygons from map
 * 
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removePolygons = (map) => {
	return new Promise((resolve, reject) => {
		if (map && map instanceof google.maps.Map) {

			// Loop over the polylines
			map.polygons.forEach((polygon) => {
				polygon.setMap(null);
			});

			// Remove markers from array
			map.polygons = [];

			// Resolve with map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('map argument not given'));

		}
	});
};