/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file convert.js
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
 * arrayToCSV
 * 
 * Converts an array into a 
 * comma seperated value (CSV) string.
 * 
 * @function
 * @since	1.0
 * 
 * @param	{Array} data Array to convert to CSV string.
 * @returns	{*} Orignal data or CSV string.
 */
export const arrayToCSV = (data = []) => {
	if (!Array.isArray(data)) return data;
	let csvString = data.join(',');
	return csvString;
};

/**
 * objectToCSV
 * 
 * Converts an object into a
 * comma seperated value (CSV) string.
 * 
 * @function
 * @since	1.0
 * 
 * @param 	{Object} data Object to convert to CSV string.
 * @returns	{*}	Orignal data or CSV string.
 */
export const objectToCSV = (data = {}) => {
	if ('object' !== typeof data) return data;
	let keys = Object.keys(data);
	let csvString = keys.map(key => `${key}=${data[key]}`).join(',');
	return csvString;
};

/**
 * arrayToQueryString
 * 
 * Converts an array with objects into
 * a string that can be used in a query
 * 
 * @function
 * @since   1.0
 * 
 * @uses	arrayToCSV()
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
 * let query = arrayToQueryString(data); // = "?action=value&post_type=post,page"
 */
export const arrayToQueryString = (data = []) => {
    if (!Array.isArray(data)) throw new Error('data argument is not given or type of array');
    let query = data.map(item => `${item.name}=${arrayToCSV(item.value)}`).join('&');
    return query.length ? `?${query}` : '';
};

/**
 * objectToQueryString
 * 
 * Converts an object with keys
 * and values into a string that
 * can be used in a query.
 * 
 * @function
 * @since	1.0
 * 
 * @uses	arrayToCSV()
 * @param 	{Object} data Object to convert to string
 * @returns	{String} Queryable string
 * 
 * @example
 * let data = {
 *      action: 'get_posts',
 *      post_type: 'post,page'
 * };
 * 
 * let query = objectToQueryString(data); // = "?action=value&post_type=post,page"
 */
export const objectToQueryString = (data = {}) => {
	if (!data || 'object' !== typeof data) throw new Error('data argument is not given or type of object');
	let keys = Object.keys(data);
	let query = keys.map(item => `${item}=${arrayToCSV(data[item])}`).join('&');
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
 * 
 * @param 	{String} string 
 * @returns	{String}
 */
export const camelToSnake = string => string.replace(/[A-Z\s]+/g, match => `_${match.toLowerCase()}`);

/**
 * snakeToCamel
 * 
 * Converts a snake-cased string
 * to a camel-cased string and
 * returns it.
 * 
 * @function
 * @since	1.0
 * 
 * @param 	{String} string 
 * @returns	{String}
 */
export const snakeToCamel = string => string.replace(/_\w/g, match => match[1].toUpperCase());

/**
 * convertKeysOfObject
 * 
 * Converts the keys of an object
 * to snake-cased format.
 * 
 * @function
 * @since	1.0
 * 
 * @uses	camelToSnake
 * @param 	{Object} object
 * @returns	{Object}
 */
export const convertKeysOfObject = (object) => {
	Object.keys(object).forEach((key) => {
		let snakeKey = camelToSnake(key);
		if (snakeKey !== key) {
			Object.defineProperty(
				object, 
				snakeKey, 
				Object.getOwnPropertyDescriptor(object, key)
			);
			delete object[key];
		}
	});
	return object;
};