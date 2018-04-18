/**
 * @author Control <info@controldigital.nl>
 * @file tabs.js
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
 * Class for creating tabs functionality
 * 
 * @class
 */
class Tabs {

    /**
     * Creates a new tabs instance
     * 
     * @constructor
     * @param {(String|HTMLElement)} element - Element holding all of the tabs
     * @param {Object} options - Options for Tabs class
     */
    constructor(element, options) {

        if (element) {
            if ('string' === typeof element) {
                this.element = document.querySelector(element);
                if (!this.element) return;
            } else if ('object' === typeof element && element instanceof HTMLElement) {
                this.element = element;
            }
        } else {
            throw new Error('No element argument is given. Please give argument as a HTMLElement or as a string');
        }

    }

}

/**
 * Class for creating accordeon functionality
 * 
 * @class
 */
class Accordeon {

    /**
     * Creates a new accordeon instance
     * 
     * @constructor
     * @param {(String|HTMLElement)} element - Element holding all of the accordeon items
     */
    constructor(element) {

        if (element) {
            if ('string' === typeof element) {
                this.element = document.querySelector(element);
                if (!this.element) return;
            } else if ('object' === typeof element && element instanceof HTMLElement) {
                this.element = element;
            }
        } else {
            throw new Error('No element argument is given. Please give argument as a HTMLElement or as a string');
        }

    }

}