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
const arrayToCSV = (data = []) => {
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
const objectToCSV = (data = {}) => {
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
const arrayToQueryString = (data = []) => {
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
const objectToQueryString = (data = {}) => {
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
const camelToSnake = string => string.replace(/[A-Z\s]+/g, match => `_${match.toLowerCase()}`);

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
const snakeToCamel = string => string.replace(/_\w/g, match => match[1].toUpperCase());

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
const convertKeysOfObject = (object) => {
	let keys = Object.keys(object);
	keys.forEach((key) => {
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

/**
 * getRestData()
 * 
 * Fetches the posts of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the posts.
 * 
 * @function
 * @since	1.0
 * 
 * @param	{Object} args Arguments to limit results to the specificity of the query.
 * @param	{String} [route='/wp/v2/posts'] The default route of getting results.
 * @param	{String} [rest=wp.rest] Url of REST API.
 * @returns	{Promise}
 */
export const getRestData = async (args = {}, route = '/wp/v2/posts', rest = wp.rest) => {

	// Check if args parameter is set and if it is an object.
	if (!args || 'object' !== typeof args) throw new Error('Args not set or not an object');

	// Create endpoint with arguments for request
	let snakeArgs = convertKeysOfObject(args);
	let query = objectToQueryString(snakeArgs);
	let url = `${rest}${route}${query}`;
	
	// Create new headers
	let headers = new Headers({
		'X-WP-Nonce': wp.nonce
	});

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
	let response = await fetch(request);

	// If response succeeds return the json
	if (response.status === 200) {
		let json = await response.json();
		return json;
	}

	// Output error
	throw new Error(response.status);

};

/**
 * getPosts()
 * 
 * Fetches the posts of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the posts.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	{String} args.author Limit result set to posts assigned to specific authors.
 * @param	{String} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	{String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{String} args.slug Limit result set to posts with one or more specific slugs.
 * @param	{String} [args.status='publish'] Limit result set to posts assigned one or more statuses.
 * @param	{String} args.categories Limit result set to all items that have the specified term assigned in the categories taxonomy.
 * @param	{String} args.categoriesExclude Limit result set to all items except those that have the specified term assigned in the categories taxonomy.
 * @param	{String} args.tags Limit result set to all items that have the specified term assigned in the tags taxonomy.
 * @param	{String} args.tagsExclude Limit result set to all items except those that have the specified term assigned in the tags taxonomy.
 * @param	{String} args.sticky Limit result set to items that are sticky.
 * @returns	{Promise} 
 * 
 * @example
 * getPosts({
 * 	perPage: 4,
 * 	offset: 1,
 * 	orderby: 'menu_order',
 * 	order: 'desc'
 * }).then(posts);
 */
export const getPosts = async (args = {}) => {
	const route = 'wp/v2/posts/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * getCategories()
 * 
 * Fetches the categories of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the categories.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{(Boolean|Number)} args.hideEmpty Whether to hide terms not assigned to any posts.
 * @param	{(String|Number)} args.parent Limit result set to terms assigned to a specific parent.
 * @param	{(String|Number)} args.post Limit result set to terms assigned to a specific post.
 * @param	{String} args.slug Limit result set to posts with one or more specific slugs.
 * @returns	{Promise} 
 * 
 * @example
 * getCategories().then(categories);
 */
export const getCategories = async (args = {}) => {
	const route = 'wp/v2/categories/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * getTags()
 * 
 * Fetches the tags of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the tags.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{Boolean} args.hideEmpty Whether to hide terms not assigned to any posts.
 * @param	{String} args.parent Limit result set to terms assigned to a specific parent.
 * @param	{String} args.post Limit result set to terms assigned to a specific post.
 * @param	{String} args.slug Limit result set to posts with one or more specific slugs.
 * @returns	{Promise} 
 * 
 * @example
 * getTags().then(tags);
 */
export const getTags = async (args = {}) => {
	const route = 'wp/v2/tags/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * getPages()
 * 
 * Fetches the pages of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the pages.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.after Limit response to pages published after a given ISO8601 compliant date.
 * @param	{String} args.author Limit result set to pages assigned to specific authors.
 * @param	{String} args.authorExclude Ensure result set excludes pages assigned to specific authors.
 * @param	{String} args.before Limit response to pages published before a given ISO8601 compliant date.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{String} args.menuOrder Limit result set to pages with a specific menu_order value.
 * @param	{(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{String} args.parent Limit result set to items with particular parent IDs.
 * @param	{String} args.parent_exclude Limit result set to all items except those of a particular parent ID.
 * @param	{String} args.slug Limit result set to pages with one or more specific slugs.
 * @param	{String} [args.status='publish'] Limit result set to pages assigned one or more statuses.
 * @returns	{Promise} 
 * 
 * @example
 * getPages().then(pages);
 */
export const getPages = async (args = {}) => {
	const route = 'wp/v2/pages/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * getComments()
 * 
 * Fetches the pages of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the pages.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	{String} args.author Limit result set to posts assigned to specific authors.
 * @param	{String} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	{String} args.authorEmail Limit result set to that from a specific author email. Requires authorization.
 * @param	{String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{String} args.menuOrder Limit result set to posts with a specific menu_order value.
 * @param	{(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{String} args.parent Limit result set to items with particular parent IDs.
 * @param	{String} args.parent_exclude Limit result set to all items except those of a particular parent ID.
 * @param	{String} args.post Limit result set to comments assigned to specific post IDs.
 * @param	{String} [args.status='publish'] Limit result set to comments assigned a specific status. Requires authorization.
 * @param	{String} [args.type='comment'] Limit result set to comments assigned a specific type. Requires authorization.
 * @param	{String} args.password The password for the post if it is password protected.
 * @returns	{Promise} 
 * 
 * @example
 * getComments().then(comments);
 */
export const getComments = async (args = {}, route = 'wp/v2/comments/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * getTaxonomies()
 * 
 * Fetches the taxonomies of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the pages.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{String} args.type Limit results to taxonomies associated with a specific post type.
 * @returns	{Promise} 
 * 
 * @example
 * getTaxonomies().then(taxonomies);
 */
export const getTaxonomies = async (args = {}) => {
	const route = 'wp/v2/taxonomies/';
	let response = await getRestData(args, route);
	return response;
};

/**
 * getMedia()
 * 
 * Fetches the media of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the posts.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.after Limit response to posts published after a given ISO8601 compliant date.
 * @param	{String} args.author Limit result set to posts assigned to specific authors.
 * @param	{String} args.authorExclude Ensure result set excludes posts assigned to specific authors.
 * @param	{String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{String} args.slug Limit result set to posts with one or more specific slugs.
 * @param	{String} [args.status='publish'] Limit result set to posts assigned one or more statuses.
 * @param	{String} args.mediaType Limit result set to attachments of a particular media type. One of: image, video, audio, application
 * @param	{String} args.mimeType Limit result set to attachments of a particular MIME type.
 * @param 	{String} [route='/wp/v2/media/'] Path to the media endpoint.
 * @returns	{Promise} 
 * 
 * @example
 * getMedia().then(media);
 */
export const getMedia = async (args = {}, route = 'wp/v2/media/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * getUsers()
 * 
 * Fetches the users of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the posts.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{Object} [args={}] 
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param	{(String|Number)} [args.page=1] Current page of the collection.
 * @param	{(String|Number)} [args.perPage=10] Maximum number of items to be returned in result set.
 * @param	{String} args.search Limit results to those matching a string.
 * @param	{String} args.before Limit response to posts published before a given ISO8601 compliant date.
 * @param	{String} args.exclude Ensure result set excludes specific IDs.
 * @param	{String} args.include Limit result set to specific IDs.
 * @param	{(String|Number)} args.offset Offset the result set by a specific number of items.
 * @param	{String} [args.order='asc'] Order sort attribute ascending or descending.
 * @param	{String} [args.orderby='date'] Sort collection by object attribute.
 * @param	{String} args.slug Limit result set to posts with one or more specific slugs.
 * @param	{String} args.roles Limit result set to users matching at least one specific role provided. Accepts csv list or single role.
 * @param 	{String} [route='/wp/v2/users/'] Path to the users endpoint.
 * @returns	{Promise} 
 * 
 * @example
 * getUsers().then(users);
 */
export const getUsers = async (args = {}, route = 'wp/v2/users/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * getPostTypes()
 * 
 * Fetches the Post Types of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the posts.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param	{Object} args
 * @param	{String} [args.context='view'] Scope under which the request is made; determines fields present in response.
 * @param 	{String} [route='/wp/v2/types/'] Path to the pages endpoint.
 * @returns {Promise}
 * 
 * @example
 * getPostTypes().then(postTypes);
 */
export const getPostTypes = async (args = {}, route = 'wp/v2/types/') => {
	let response = await getRestData(args, route);
	return response;
};

/**
 * getSettings()
 * 
 * Fetches the settings of this WordPress site
 * through the REST API. The function is an async
 * function which will return a Promise containing
 * either an error or the posts.
 * 
 * @function
 * @since	1.0
 * @uses	getRestData
 * 
 * @param 	{String} [route='/wp/v2/settings/'] Path to the pages endpoint.
 * @returns {Promise}
 * 
 * @example
 * getSettings().then(settings);
 */
export const getSettings = async (route = 'wp/v2/settings/') => {
	let args = {};
	let response = await getRestData(args, route);
	return response;
};