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
 * HTTP GET Request
 * 
 * @function
 * @since 	1.0
 * @param {String} url - Url which to send the HTTP Request to
 * @param {Function} callback - Function to fire when a response is received
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
 * HTTP POST Request
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
 * Parse string to HTML
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
 * Parse string to HTML the old way
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