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
 * get
 * 
 * HTTP Get Request using the Fetch API.
 * 
 * @function
 * @since	1.0
 * @param	{String} url
 * @returns	{Promise} Returns the blob
 */
const get = (url) => {

	// Create new headers
	let headers = new Headers();

	// Set options of request object
	let options = {
		method: 'GET',
		headers: headers,
		mode: 'cors',
		cache: 'default'
	};

	// Create a new request object
	let request = new Request(url, options);

	// Fetch the request
	return fetch(request).then(response => response.blob());
};

/**
 * getXhr
 * 
 * HTTP GET Request with XMLHttpRequest.
 * 
 * @function
 * @since 	1.0
 * @param 	{String} url - Url which to send the HTTP Request to
 * @param 	{Function} callback - Function to fire when a response is received
 */
const getXhr = (url, callback) => {
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
 * @param 	{String} url
 * @param 	{String} params
 * @param 	{Function} callback
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

/**
 * parseHTML
 * 
 * Parse string to HTML with a DOMParser
 * function.
 * 
 * @function
 * @since 	1.0
 * @param 	{String} data - String to convert to workable HTML
 * @returns {HTMLElement}
 */
const parseHTML = (data) => {
	if (data && 'string' === typeof data) {
    	if ('DOMParser' in window) {
			let parser = new DOMParser();
			return parser.parseFromString(data, 'text/html');
    	} else {
			throw new Error('DOMParser not supported. Use stringToHTML() function instead');
		}
	}
};

/**
 * stringToHTML
 * 
 * Parse string to HTML by adding a string
 * to the innerHTML of a div element
 * 
 * @function
 * @since 	1.0
 * @param 	{String} data - String to convert to workable HTML
 * @returns {HTMLElement}
 */
const stringToHTML = (data) => {
	if (data && 'string' === typeof data) {
		let container = document.createElement('div');
		container.innerHTML = data;
		return container;
	} else {
		throw new Error('data argument is not present or not a string');
	}
};

/**
 * DONT USE THIS ONE YET
 * 
 * Async GET request with optional data
 * 
 * @example 
 * fetchData([action=load_more, amount=3]);
 * 
 * @function
 * @since 	1.0
 * @uses 	get()
 * @param 	{Array} data 
 * @return	{String}
 * 
 */
const fetchData = (data = []) => {
	let result = '';
	if (data && data instanceof Array) {
		let query = data.join('&'),
			url = query.length ? `${wp.ajaxurl}?${query}` : wp.ajaxurl;
		get(url, (response) => {
			result = response;
			return result;
		});
	} else {
		throw new Error('data argument is not an Array');
	}
};