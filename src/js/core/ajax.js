/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file ajax.js
 * @version 1.0
 * @license
 * Copyright (c) 2018 Control.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


// Import convert functions
import { arrayToQueryString } from './convert';

/**
 * getPosts
 * 
 * HTTP GET Request for retrieving
 * posts using the Fetch API.
 * 
 * @function
 * @since	1.0
 * @uses	arrayToQueryString
 * @param	{Object[]} args Arguments for retrieving markers
 * @param	{String} args.name Name of argument
 * @param	{String} args.value Value of argument
 * @returns	{Promise} Returns a promise with response text
 * 
 * @example
 * getPosts([
 * 	  {
 *       name: 'post_type',
 *       value: 'post'
 *    },
 *    {
 *       name: 'posts_per_page',
 *       value: -1
 *    }
 * ]).then(data => console.log(data))
 *   .catch(error => console.log(error));
 */
export const getPosts = (args = []) => {

	// Add action to the data array
	args.unshift({
		name: 'action', 
		value: 'get_posts_ajax'
	});

	// Create URL to get the markers from
	let url = `${wp.ajax}${arrayToQueryString(args)}`;

	// Create new headers
	let headers = new Headers();

	// Set options of request object
	let options = {
		method: 'GET',
		headers: headers,
		mode: 'same-origin',
		cache: 'default',
	};

	// Create a new request object
	let request = new Request(url, options);

	// Fetch the request
	return fetch(request)
		.then(response => response.text());

};

/**
 * getMarkers
 * 
 * HTTP GET Request for retrieving
 * markers using the Fetch API.
 * 
 * @function
 * @since	1.0
 * 
 * @uses	arrayToQueryString
 * @param	{Object[]} data Parameters for retrieving markers
 * @param	{String} data.name Name of parameter
 * @param	{String} data.value Value of parameter
 * @returns	{Promise} Returns a promise with JSON
 * 
 * @example
 * getMarkers()
 *    .then(data => console.log(data))
 *    .catch(error => console.log(error));
 */
export const getMarkers = (data = []) => {

	// Add action to the data array
	data.unshift({
		name: 'action', 
		value: 'get_markers_ajax'
	});

	// Create URL to get the markers from
	let url = `${wp.ajax}${arrayToQueryString(data)}`;

	// Create new headers
	let headers = new Headers();

	// Set options of request object
	let options = {
		method: 'GET',
		headers: headers,
		mode: 'same-origin',
		cache: 'default',
	};

	// Create a new request object
	let request = new Request(url, options);

	// Fetch the request
	return fetch(request)
		.then(response => response.json());

};

/**
 * postJson
 * 
 * HTTP POST Request for sending
 * json using the Fetch API.
 * 
 * @function
 * @since	1.0
 * @param	{Object[]} data Object with data to send
 * @returns	{Promise} Returns a promise with JSON
 */
export const postJson = (data = {}) => {

	// Add nonce security property to data
	data = Object.assign(data, {
		security: wp.security
	});

	// Create URL to get the markers from
	let url = `${wp.ajax}?action=post_json_ajax`;

	// Create new headers
	let headers = new Headers({
		'Content-Type': 'application/json'
	});

	// Set options of request object
	let options = {
		method: 'POST',
		headers: headers,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(data)
	};

	// Create a new request object
	let request = new Request(url, options);

	// Fetch the request
	return fetch(request)
		.then(response => response.json());

};

/**
 * get
 * 
 * HTTP GET Request with XMLHttpRequest.
 * 
 * @function
 * @since 	1.0
 * @param 	{String} url URL to get the data from
 * @param 	{Function} callback Function to fires when a response is received
 */
export const get = (url, callback) => {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (callback && 'function' === typeof callback) {
				callback(xhr.responseText);
			}
		}
	};
	xhr.open('GET', url, true);
	xhr.send();
};

/**
 * post
 * 
 * HTTP POST Request with XMLHttpRequest.
 *
 * @function
 * @since 	1.0
 * @param 	{String} url URL to send the data to
 * @param 	{String} params Data to send
 * @param 	{Function} callback Function to fires when a response is received
 */
export const post = (url, params, callback) => {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (callback) {
				callback(xhr.responseText);
			}
		}
	};
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	xhr.send(params);
};