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
 * Get element by walking over the next siblings
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getNextSibling = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.nextElementSibling;
    }
    return el;
};

/**
 * Get element by walking over the previous siblings
 * Find the element with a CSS class
 *
 * @function
 * @since   1.0
 * @param   {HTMLElement} start Element to start from
 * @param   {String} cls CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getPrevSibling = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.previousElementSibling;
    }
    return el;
};

/**
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
    let el = start,
        sibs = [];
    if (el.parentElement.children) {
        let children = el.parentElement.children;
        sibs = Array.prototype.filter.call(children, (sib) => {
            return sib !== start;
        });
    }
    return sibs;
};

/**
 * Removes all the children of an element and returns the element.
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
 * Returns an object with all the values of a form
 * 
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element with elements
 * @returns {Object} Object with name/value pairs
 */
const getValues = (form) => {
    let values = {};
    for (let i = 0; i < form.elements.length; i += 1) {
        if (
            (
                form.elements[i].type !== 'submit' && 
                form.elements[i].type !== 'fieldset' 
            ) ||
            (
                form.elements[i].checked === true
            ) &&
            form.elements[i].value !== ''
        ) {
            values[form.elements[i].name] = form.elements[i].value;
        }
    }
    return values;
};

/**
 * Return an object with the selected fields
 *
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element with elements
 * @returns {Object} Object with name/value pairs
 */
const getSelectedValues = (form) => {
    let values = {};
    for (let i = 0; i < form.elements.length; i += 1) {
        let el = form.elements[i];
        if (
            el.tagName === 'SELECT' && 
            el.value !== ''
        ) {
            values[el.name] = el.value;
        }
    }
    return values;
};

/**
 * Return an object with the checked inputs
 *
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element with elements
 * @returns {Object} Object with name/value pairs
 */
const getCheckedInputs = (form) => {
    let values = {};
    for (let i = 0; i < form.elements.length; i += 1) {
        let el = form.elements[i];
        if (
            el.tagName === 'INPUT' && 
            (el.type === 'checkbox' || el.type === 'radio') &&
            el.checked === true
        ) {
            values[el.name] = el.value;
        }
    }
    return values;
};

/**
 * Returns an array with objects with values
 * 
 * @function
 * @since   1.0
 * @param   {HTMLFormElement} form Form element
 * @returns {Array} Array with objects
 */
const getValuesPerFieldset = (form) => {
    let fieldsets = [];
    for (let i = 0; i < form.elements.length; i += 1) {
        if (form.elements[i].type === 'fieldset') {
            let values = {},
                fs = form.elements[i];
            for (let j = 0; j < fs.elements.length; j += 1) {
                let el = fs.elements[j];
                if (
                    (
                        el.tagName === 'INPUT' ||
                        el.tagName === 'SELECT' ||
                        el.tagName === 'TEXTAREA'
                    ) && 
                    el.type !== 'submit'
                ) {
                    values[el.name] = el.value;
                }
            }
            fieldsets.push(values);
        }
    }
    return fieldsets;
};

/**
 * createQueryString
 * 
 * Converts an object into a string that can be used with a XMLHttpRequest
 * 
 * @since   1.0
 * @param   {Object} params Object with keys and values for the string
 * @returns {String} Queryable string
 */
const createQueryString = (params) => {
    if (!params || 'object' !== typeof params) throw new Error('params argument is not type of string');
    let query = [];
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            query.push(`${key}=${params[key]}`);
        }
    }
    query = query.join('&');
    return `?${query}`;
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
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};