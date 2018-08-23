/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file tools.js
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
 * getParent
 * 
 * Get element by walking up in the tree
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getParent = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.parentElement;
    }
    return el;
};

/**
 * getSiblings
 * 
 * Get all the siblings of given element
 * Goes to the parent en gets alls the children
 * Then it filters out the start element
 * 
 * @function
 * @since   1.0
 * @param   {HTMLElement} start  Element to start from
 * @returns {Array} Array of found siblings
 */
const getSiblings = (start) => {
    let children = start.parentElement.children;
    return Array.prototype.filter.call(children, (sib) => {
        return sib !== start;
    });
};

/**
 * getNextSiblingWithClass
 * 
 * Get element by walking over the next siblings
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getNextSiblingWithClass = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.nextElementSibling;
    }
    return el;
};

/**
 * getPrevSiblingWithClass
 * 
 * Get element by walking over the previous siblings
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getPrevSiblingWithClass = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.previousElementSibling;
    }
    return el;
};

/**
 * removeChildren
 * 
 * Removes all the children of an element 
 * and returns the element.
 * 
 * @example
 * const emptyParent = removeChildren(parentElement);
 * // emptyParent now has no children :(
 * 
 * @function
 * @since   1.0
 * @param   {HTMLElement} element HTMLElement to remove children of
 * @returns {HTMLElement} Returns the element with children removed
 */
const removeChildren = (element) => {
    while (element && element.firstElementChild) {
        element.removeChild(element.firstElementChild);
    }
    return element;
};

/**
 * parseString
 * 
 * Parses a string to a document
 * with the DOMParser API and returns
 * a XMLDocument, HTMLDocument or SVGDocument.
 * 
 * @function
 * @since 	1.0
 * @param 	{String} data String to convert to workable HTML
 * @param   {String} [mimeType='application/xml'] MimeType to convert the string to
 * @returns {(XMLDocument|HTMLDocument|SVGDocument)}
 */
const parseString = (data, mimeType = 'application/xml') => {
	if (data && 'string' === typeof data) {
    	if ('DOMParser' in window) {
			let parser = new DOMParser();
            return parser.parseFromString(data, mimeType);
    	} else {
			throw new Error('DOMParser not supported.');
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
 * getValues
 * 
 * Returns an object with all the values of a form
 * 
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element with elements
 * @returns {Object[]} Array with objects with name/value pairs
 */
const getValues = (form) => {
    return [...form.elements].filter((el) => {
        if (
            ((
                el.type !== 'submit' && 
                el.type !== 'button' && 
                el.type !== 'fieldset') || 
                el.checked === true ) && 
            el.value !== ''
        ) {
            return {
                name: el.name, 
                value: el.value
            };
        }
    });
};

/**
 * getSelectedValues
 * 
 * Return an array with the selected fields
 *
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element with elements
 * @returns {Object[]} Array with objects with name/value pairs
 */
const getSelectedValues = (form) => {
    return [...form.elements].filter((el) => {
        if (
            el.tagName === 'SELECT' && 
            el.value !== ''
        ) {
            return {
                name: el.name, 
                value: el.value
            };
        }
    });
};

/**
 * getCheckedValues
 * 
 * Return an array with the checked inputs
 *
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element with elements
 * @returns {Object[]} Array with objects with name/value pairs
 */
const getCheckedValues = (form) => {
    return [...form.elements].filter((el) => {
        if (
            el.tagName === 'INPUT' && 
            (el.type === 'checkbox' || 
            el.type === 'radio') &&
            el.checked === true
        ) {
            return {
                name: el.name, 
                value: el.value
            };
        }
    });
};

/**
 * getValuesPerFieldset
 * 
 * Returns an array with objects with values
 * 
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element
 * @returns {Array} Array with objects
 */
const getValuesPerFieldset = (form) => {
    return [...form.elements]
        .filter((el) => el.tagName === 'FIELDSET')
        .reduce((acc, cur) => {
            acc[cur.name] = [...cur.elements].filter((el) => {
                if (
                    (
                        el.tagName === 'INPUT' || 
                        el.tagName === 'SELECT' || 
                        el.tagName === 'TEXTAREA'
                    ) && 
                    el.type !== 'submit'
                ) return {
                    name: el.name,
                    value: el,value
                };
            });
            return acc;
        }, {});
};

/**
 * debounce
 * 
 * Returns a function, that, as long as it continues to be invoked, will not 
 * be triggered. The function will be called after it stops being called for 
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * 
 * @function
 * @since   1.0
 * @param   {Function} func Function to execute
 * @param   {Number} wait Time to wait before firing
 * @param   {Boolean} immediate Fire immediately or not
 */
const debounce = (func, wait, immediate) => {
	let timeout;
	return function() {
        let context = this;
        let args = arguments;
		let later = () => {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * getRandomInt
 * 
 * Generates a random number between a
 * min and a max value.
 * 
 * @function
 * @since   1.0
 * @param   {Number} min Min value
 * @param   {Number} max Max value
 * @returns {Number} Random number
 */
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * cssPropertyValueSupported
 *
 * Checks if the browser supports a property
 * Returns a boolean
 *
 * @function
 * @since	1.0
 * @param	{String} prop Property to evaluate
 * @param	{String} value Value of property to check
 * @returns	{Boolean}
 */
const cssPropertyValueSupported = (prop, value) => {
    let d = document.createElement('div');
    d.style[prop] = value;
    return d.style[prop] === value;
};

/**
 * linkTargetsBlank
 *
 * Select all the a tags with an 
 * rel="external" attribute and set 
 * the target attribute to '_blank'
 *
 * @param   {String} [query=a[rel="external"]]
 * @returns	{NodeList}
 */
const linkTargetsBlank = (query = 'a[rel="external"]') => {
    let links = document.querySelectorAll(query);
    links.forEach(link => link.setAttribute('target', '_blank'));
    return links;
};

/**
 * lazyLoadImages
 * 
 * Loops over the images and loads
 * the image in JS and adds it to the
 * DOM when the image has fully loaded.
 * Returns all of the selected images.
 * 
 * @function
 * @since   1.0
 * @param   {HTMLCollection} [images=document.images]
 * @returns {HTMLCollection} 
 */
const lazyLoadImages = (images = document.images) => {
    return [...images].forEach((image) => {
        if (image.hasAttribute('data-src')) {
            let src = image.getAttribute('data-src');
            let img = new Image();
            let imgLoaded = () => {
                image.src = src;
                image.removeAttribute('data-src');
            };
            img.addEventListener('load', imgLoaded, {once: true});
            img.src = src;
        }
    });
};