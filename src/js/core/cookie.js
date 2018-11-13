/* jshint esversion: 6 */

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
 * setCookie
 * 
 * Creates cookie with a name, value, expire date, path and a domain.
 * Returns the cookie of the document.
 *
 * @function
 * @since 	1.0
 * @param 	{String} name Name of cookie
 * @param 	{String} value Value of cookie
 * @param 	{Number} expire When cookie expires in days
 * @param 	{String} path Path to store cookie
 * @param   {String} domain The domain to store the cookie
 * @returns {String} Returns the cookie string
 */
export const setCookie = (name, value, expire, path = '/', domain = location.hostname.replace(/^www\./i, "")) => {
    let date = new Date(),
        expires;
    date.setTime(date.getTime() + (expire * 24 * 3600 * 1000));
    expires = date.toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path + '; domain=' + domain;
    return document.cookie;
};

/**
 * getCookie
 * 
 * Retrieves a cookie from the document.
 * Returns a string if the cookie is found or false when it is not.
 *
 * @function
 * @since 	1.0
 * @param 	{String} name Cookie to fetch
 * @returns {(String|Boolean)} Returns cookie on success, false on fail
 */
export const getCookie = (name) => {
    let nameExpression = name + '=',
        cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
        let currentCookie = cookies[i].trim();
        if (currentCookie.indexOf(nameExpression) == 0) {
            return currentCookie.substring(nameExpression.length, currentCookie.length);
        }
    }
    return false;
};

/**
 * deleteCookie
 * 
 * Deletes cookie from the document.
 *
 * @function
 * @since 	1.0
 * @param 	{String} name Cookie to delete
 * @returns {String} Returns the cookie
 */
export const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    return document.cookie;
};

/**
 * insertNonFuncScripts
 *
 * Add a script to the part of the document. Inserts the element at the
 * start of the location.
 * 
 * Can be used to load a script or noscript with for Google Tagmanager
 * or other non functional scripts that can only be loaded when consent
 * is given
 * 
 * @example
 * let script = '(function(){var foo="bar";}())';
 * let type = 'script';
 * let location = document.head;
 * insertInlineScript(script, type, location);
 * 
 * @function
 * @since   1.0
 * @param 	{String} script Code of the script to append
 * @param   {String} [src] Source of external script
 * @param	{String} [type] of element (script|noscript)
 * @param	{HTMLElement} [location] to append
 * @returns	{(HTMLScriptElement|HTMLElement)} Returns the appended script
 */
export const insertNonFuncScripts = (entry) => {
    if (!entry || 'object' !== typeof entry) return;
    let code = entry.hasOwnProperty('script') ? entry.script : false,
        source = entry.hasOwnProperty('src') ? entry.src : false,  
        el = entry.hasOwnProperty('type') ? document.createElement(entry.type) : document.createElement('script'),
        location = entry.hasOwnProperty('location') ? entry.location : document.head;
    if (code) el.innerHTML = code;
    if (source) el.src = source;
    return location.insertBefore(el, location.firstElementChild);
};

/**
 * addNonFuncScript
 * 
 * Check the cookies if the cookie exists.
 * If it exists it checks if the value is the value
 * of the cookie.
 * 
 * When both values are true the function will insert
 * the scripts in the desired locations.
 * 
 * @example
 * window.addEventListener('load', addNonFuncScript, false);
 * 
 * @since   1.0
 * @uses    getCookie
 * @uses    insertInlineScript
 * @param   {Event} event
 */
export const addNonFuncScript = (event) => {

    /** 
     * Cookie to find.
     * @type {String} 
     */
    const cookieName = 'COOKIENAME';

    /**
     * Value of cookie to check against .
     * @type {(String|Boolean)} 
     */
    const cookieValue = 'true';
    
    /** 
     * An array with objects that hold the script,
     * the type of script element and the location
     * to insert the element to.
     * 
     * @type        {Object[]} 
     * @property    {String} script Script string to insert
     * @property    {String} src Source of external script
     * @property    {String} type Type of script to insert (script|noscript)
     * @property    {HTMLElement} location Location to insert script
     */
    const scriptsArray = [];

    return ((name, value, scripts) => {
        let cookie = getCookie(name);
        if (cookie && cookie === value) {
            scripts.forEach((script) => {
                insertNonFuncScripts(script);
            });
        }
    })(cookieName, cookieValue, scriptsArray);

};