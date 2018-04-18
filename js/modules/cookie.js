/**
 * @author Control <info@controldigital.nl>
 * @file cookie.js
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
 * Create cookie
 *
 * @function
 * @since 	1.0
 * @param 	{String} name - Name of cookie
 * @param 	{String} value - Value of cookie
 * @param 	{Number} expire - When cookie expires in days
 * @param 	{String} path - Path to store cookie
 * @param   {String} domain - The domain to store the cookie
 */
const createCookie = (name, value, expire, path, domain) => {
	let date = new Date();
    date.setTime(date.getTime() + (expire * 24 * 3600 * 1000));
    let expires = date.toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path + '; domain=' + domain;
    return true;
}

/**
 * Gets the cookie
 *
 * @function
 * @since 	1.0
 * @param 	{String} name - Cookie to fetch
 * @returns {(String|Boolean)} - Returns cookie on success, false on fail
 */
const getCookie = (name) => {
    let nameExpression = name + '=',
        cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
        let currentCookie = cookies[i].trim();
        if (currentCookie.indexOf(nameExpression) == 0) {
            return currentCookie.substring(nameExpression, currentCookie.length);
        }
    }
    return false;
}

/**
 * Delete cookie
 *
 * @function
 * @since 	1.0
 * @param 	{String} name - Cookie to delete
 * @returns {Boolean}
 */
const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    return true;
}