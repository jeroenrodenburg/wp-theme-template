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



/**
 * createQueryStringFromArray
 * 
 * Converts an array with objects into
 * a string that can be used in a query
 * 
 * @function
 * @since   1.0
 * @param   {Object[]} [data=[]] Array with object with name and value for the string
 * @param   {String} data.name Name of field
 * @param   {String} data.value Value of field
 * @returns {String} Queryable string
 * 
 * @example
 * let data = [
 *    {
 *       name: 'action',
 *       value: 'get_posts'
 *    },
 *    {
 *       name: 'post_type',
 *       value: 'post,page'
 *    }
 * ];
 * 
 * let query = createQueryStringFromArray(data); // = "?action=value&post_type=post,page"
 */
const createQueryStringFromArray = (data = []) => {
    if (!data || !Array.isArray(data)) throw new Error('data argument is not given or type of array');
    let query = data.map(item => `${item.name}=${item.value}`).join('&');
    return query.length ? `?${query}` : '';
};

/**
 * createQueryStringFromObject
 * 
 * Converts an object with keys
 * and values into a string that
 * can be used in a query.
 * 
 * @function
 * @since	1.0
 * @param 	{Object} data Object to convert to string
 * @returns	{String} Queryable string
 * 
 * @example
 * let data = {
 *      action: 'get_posts',
 *      post_type: 'post,page'
 * };
 * 
 * let query = createQueryStringFromObject(data); // = "?action=value&post_type=post,page"
 */
const createQueryStringFromObject = (data = {}) => {
	if (!data || 'object' !== typeof data) throw new Error('data argument is not given or type of object');
	let keys = Object.keys(data);
	let query = keys.map(item => `${item}=${data[item]}`).join('&');
    return query.length ? `?${query}` : '';
};

/**
 * camelToSnake
 * 
 * Converts a camel-cased string 
 * to a snake-cased string and 
 * returns it.
 * 
 * @function
 * @since	1.0
 * @param 	{String} string 
 * @returns	{String}
 */
const camelToSnake = string => string.replace(/[A-Z\s]+/g, match => `_${match.toLowerCase()}` );

/**
 * snakeToCamel
 * 
 * Converts a snake-cased string
 * to a camel-cased string and
 * returns it.
 * 
 * @function
 * @since	1.0
 * @param 	{String} string 
 * @returns	{String}
 */
// const snakeToCamel = (string) => {
// 	return string.replace(/_(?=.)/g, (match, p1) => {
// 		return string.substring(0, p1) + string.substring(p1 + 1, string.length).toUpperCase();
// 	});
// };

/**
 * convertKeysOfObject
 * 
 * Converts the keys of an object
 * to snake-cased format.
 * 
 * @function
 * @since	1.0
 * @uses	camelToSnake
 * @param 	{Object} object
 * @returns	{Object}
 */
const convertKeysOfObject = (object) => {
	Object.keys(object).forEach((key) => {
		let snakeKey = camelToSnake(key);
		Object.defineProperty(
			object, 
			snakeKey, 
			Object.getOwnPropertyDescriptor(object, key)
		);
		delete object[key];
	});
	return object;
};

/**
 * getPosts
 * 
 * HTTP GET Request for retrieving
 * posts using the Fetch API.
 * 
 * @function
 * @since	1.0
 * @uses	createQueryStringFromArray
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
const getPosts = (args = []) => {

	// Add action to the data array
	args.unshift({
		name: 'action', 
		value: 'get_posts_ajax'
	});

	// Create URL to get the markers from
	let url = `${wp.ajax}${createQueryStringFromArray(args)}`;

	// Create new headers
	let headers = new Headers();

	// Set options of request object
	let options = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
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
 * @uses	createQueryStringFromArray
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
const getMarkers = (data = []) => {

	// Add action to the data array
	data.unshift({
		name: 'action', 
		value: 'get_markers_ajax'
	});

	// Create URL to get the markers from
	let url = `${wp.ajax}${createQueryStringFromArray(data)}`;

	// Create new headers
	let headers = new Headers();

	// Set options of request object
	let options = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
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
const postJson = (data = {}) => {

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
const get = (url, callback) => {
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
const post = (url, params, callback) => {
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