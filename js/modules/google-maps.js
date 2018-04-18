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
 * attachInfoWindow
 * 
 * Adds a InfoWindow to a marker
 *
 * @function
 * @since 	1.0
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
	
}

/**
 * addMarkers
 * 
 * Add markers to the map
 * 
 * @function
 * @since 	1.0
 * @param 	{Array} markers 
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const addMarkers = (markers, map) => {
	return new Promise((resolve, reject) => {
		if (markers && markers.length && map) {

			// Loop over markers
			markers.forEach((m) => {

				// Create coordinates
				let latLng = new google.maps.LatLng(m.lat, m.lng);

				// Create marker
				let marker = new google.maps.Marker({
					position: latLng,
					map: map
				});
				
			});

			// Resolve and return map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('markers and/or map arguments not given'));

		}
	});
};

/**
 * addMarker
 * 
 * Add a marker to the map
 * 
 * @function
 * @since 	1.0
 * @param 	{Object} marker 
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const addMarker = (marker, map) => {
	return new Promise((resolve, reject) => {
		if (marker && map) {

			// Create coordinates
			const latLng = new google.maps.LatLng(marker.lat, marker.lng);

			// Create marker
			const marker = new google.maps.Marker({
				position: latLng,
				map: map
			});
			
			// Add position to bounds
			map.bounds.extend(marker.getPosition());
	
			// Add marker to array
			map.markers.push(marker);

			// Resolve and return map
			resolve(map);

		} else {

			// Reject with an error
			reject(new Error('marker and/or map arguments not given'));

		}
	});
};

/**
 * Remove markers from map
 * 
 * @function
 * @since 	1.0
 * @param 	{<google.maps.Map>} map 
 * @returns {Promise} returns the map object on resolve
 */
const removeMarkers = (map) => {
	return new Promise((resolve, reject) => {
		if (map) {

			// Loop over the markers
			map.markers.forEach((marker) => {
				marker.setMap(null);
			});

			// Remove markers from array
			map.markers = [];

		} else {

			// Reject with an error
			reject(new Error('map argument not given'));

		}
	});
};

/**
 * Create a new map
 * 
 * @function
 * @since 	1.0
 * @param 	{String} mapElement - The map element to select
 * @returns {<google.maps.Map>}
 */
const createMaps = (mapElement) => {

	// Get the map elements
	const element = document.querySelector(mapElement);

	// Arguments for map
	let args = {
		center: {
			lat: 52.3499843,
			lng: 4.9163333
		},
		zoom: 16
	};

	// Create new map
	let map = new google.maps.Map(element, args);

	// Set array for markers
	map.markers = [];

	// Set bounds for map
	map.bounds = new google.maps.LatLngBounds();
	
	// Set infowindow for map
	map.infowindow = null;

	// Close infowindows on map click
	google.maps.event.addListener(map, 'click', () => {
		if (map.infowindow) map.infowindow.close();
	});

	// Return the map
	return map;

};



/**
 * Google Maps API
 * Anonymous IIFE
 * Setup the data needed for the Google Maps API
 * 
 */
(function () {
    'use strict';

    // Please enter your unique API Key
    const key = 'AIzaSyB6DB--1x8xmlR7Sg3kf573ARrlnUBVDms';

    // The function to fire when the script loads
    const callback = 'createMap';

    // Getting the API script
	const src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=${callback}`;
	let script = document.createElement('script');
	script.setAttribute('src', src);
	script.setAttribute('async', '');
    script.setAttribute('defer', '');
	document.body.appendChild(script);

}());