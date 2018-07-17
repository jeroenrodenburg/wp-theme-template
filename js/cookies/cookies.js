/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file cookies.js
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


// Cookie notice element
const cookieNotice = document.getElementById('cookie');

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
const getCookie = (name) => {
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
const setCookie = (name, value, expire, path = '/', domain = location.hostname.replace(/^www\./i, "")) => {
    let date = new Date(),
        expires;
    date.setTime(date.getTime() + (expire * 24 * 3600 * 1000));
    expires = date.toUTCString();
    document.cookie = name + '=' + value + '; expires=' + expires + '; path=' + path + '; domain=' + domain;
    return getCookie(name);
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
const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    return document.cookie;
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
			throw new Error('DOMParser not supported.');
		}
	}
};

/**
 * toggleCookieNotice
 * 
 * @function
 * @since	1.0
 * @param 	{HTMLElement} notice Element of cookie notice to hide
 * @returns	{(Boolean|HTMLElement)}
 */
const toggleCookieNotice = (notice) => {
	if (!notice) return false;
	let toggleClass = 'hidden';
	notice.classList.toggle(toggleClass);
	return notice;
};

/**
 * appendToHead
 * 
 * Appends elements to the end of the head.
 * 
 * @function
 * @since	1.0
 * @param 	{Array} items 
 * @returns	{Boolean}
 */
const appendToHead = (items) => {
	return new Promise((resolve, reject) => {
		if (!items) reject(false);
		items.forEach((item) => {
			document.head.appendChild(item);
		});
		resolve(true);
	});
};

/**
 * appendToBody
 * 
 * Appends elements to the start to the body.
 * 
 * @function
 * @since	1.0
 * @param 	{Array} items 
 * @returns	{Boolean}
 */
const appendToBody = (items) => {
	return new Promise((resolve, reject) => {
		if (!items) reject(false);
		items.forEach((item) => {
			document.body.insertBefore(item, document.body.firstElementChild);
		});
		resolve(true);
	});
};

/**
 * getCookieName
 * 
 * Returns the cookie name set in WP Customizer
 * or else returns a default cookie.
 * 
 * @function
 * @since	1.0
 * @returns	{String}
 */
const getCookieName = () => {
	return cookieArgs.name ? cookieArgs.name : 'wp-cookie-consent';
};

/**
 * getCookieExpirationDate
 * 
 * Returns the amount of days for the
 * cookie to expire in a floating point
 * format or default year in days.
 * 
 * @function
 * @since	1.0
 * @returns	{Number}
 */
const getCookieExpirationDate = () => {
	return cookieArgs.expire ? parseFloat(cookieArgs.expire) : 365;
};

/**
 * getCookieDomain
 * 
 * Creates a cookie friendly URL for 
 * the domain parameter
 * 
 * @function
 * @since	1.0
 * @returns	{String}
 */
const getCookieDomain = () => {
	let url = window.location.host + window.location.pathname;
	let cookieDomain = url.replace("//", "/");
	return cookieDomain;
};

/**
 * getCookieScripts
 * 
 * Returns the scripts for in the head
 * as set in the WP Customizer.
 * 
 * @function
 * @since	1.0
 * @param	{String} data
 * @returns	{Array}
 */
const getCookieScripts = (data) => {
	if (!data) return [];
	let cookieDocument = parseHTML(data);
	let scripts = cookieDocument.getElementsByTagName('script');
	let noscripts = cookieDocument.getElementsByTagName('noscript');
	return [...scripts, ...noscripts];
};

/**
 * onFormSubmit
 * 
 * Submit event handler for 
 * the cookie form.
 * 
 * @function
 * @since	1.0
 * @param 	{Event} event 
 */
const onFormSubmit = (event) => {
	event.preventDefault();
};

/**
 * onAccept
 * 
 * @function
 * @since	1.0
 * @param	{Event} event 
 */
const onAccept = (event) => {
	let newCookie = setCookie(getCookieName(), 'true', getCookieExpirationDate(), '/');
	if (newCookie) {
		toggleCookieNotice(cookieNotice);
		Promise.all(
			appendToHead(getCookieScripts(cookieArgs.head)),
			appendToBody(getCookieScripts(cookieArgs.body))
		).then(() => {
			console.info('Scripts have been added');
		});
	}
	event.preventDefault();
};

/**
 * onRefuse
 * 
 * @function
 * @since	1.0
 * @param	{Event} event 
 */
const onRefuse = (event) => {
	let newCookie = setCookie(getCookieName(), 'false', getCookieExpirationDate(), '/');
	if (newCookie) toggleCookieNotice(cookieNotice);
	event.preventDefault();
};

/**
 * onDOMContentLoaded
 * 
 * Fires the logic for the cookie
 * when the DOM has loaded.
 * 
 * @function
 * @since	1.0
 * @param 	{Event} event
 */
const onDOMContentLoaded = (event) => {

	if (!cookieNotice || getCookie(getCookieName()) !== false) return;

	const cookieForm = document.getElementById('cookie-form');
	cookieForm.addEventListener('submit', onFormSubmit);

	const cookieAccept = document.querySelector('.js-cookie-accept');
	const cookieRefuse = document.querySelector('.js-cookie-refuse');
	cookieAccept.addEventListener('click', onAccept);
	if (cookieRefuse) cookieRefuse.addEventListener('click', onRefuse);

};

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);