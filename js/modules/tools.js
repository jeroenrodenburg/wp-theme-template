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
 * @param   {HTMLElement} start - Element to start from
 * @param   {String} cls - CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getParent = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.parentElement;
    }
    return el;
}

/**
 * Get element by walking over the next siblings
 * Find the element with a CSS class
 *
 * @function
 * @param   {HTMLElement} start - Element to start from
 * @param   {String} cls - CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getNextSibling = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.nextElementSibling;
    }
    return el;
}

/**
 * Get element by walking over the previous siblings
 * Find the element with a CSS class
 *
 * @function
 * @param   {HTMLElement} start - Element to start from
 * @param   {String} cls - CSS class to find the element with
 * @returns {HTMLElement}
 */	
const getPrevSibling = (start, cls) => {
    let el = start;
    while (el && !el.classList.contains(cls)) {
        el = el.previousElementSibling;
    }
    return el;
}

/**
 * Get all the siblings of given element
 * Goes to the parent en gets alls the children
 * Then it filters out the start element
 * 
 * @function
 * @param   {HTMLElement} start  - Element to start from
 * @returns {Array} - Array of found siblings
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
}

/**
 * Return an object with the selected fields
 *
 * @function
 * @param   {HTMLFormElement} form - Form element with elements
 * @returns {Object} - Object with name/value pairs
 */
const getSelectedValues = (form) => {
    let values = {};
    for (let i = 0; i < form.elements.length; i += 1) {
        if (form.elements[i].tagName === 'SELECT' && form.elements[i].value !== '') {
            values[form.elements[i].name] = form.elements[i].value;
        }
    }
    return values;
};