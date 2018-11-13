/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file events.js
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
 * toggleClassOnScroll
 *
 * If scolled distance is higher than the offsetThreshold
 * the scrollClass is added to the target
 * 
 * @example
 * document.addEventListener('scroll', toggleClassOnScroll, false);
 *
 * @function
 * @since 	1.0
 * 
 * @returns {Function}
 */
export const toggleClassOnScroll = (() => {

    /**
     * Element to toggle classes on
     * @type    {HTMLElement}
     */
    let target = document.body;

    /** 
     * Class to add to the target
     * @type   {String} 
     */
    let scrollClass = '--scroll';

    /**
     * Threshold for the scrollTop to trigger on
     * @type    {Number}
     */
    let offsetThreshold = 100;

    /** 
     * Scroll switch. Keeps track of scroll state.
     * @type    {Boolean}
     */
    let scrolled = false;

    /**
     * Returns a closure function
     * @param   {Event} event
     * @returns {Function}
     */
    return (event) => {
        let top = document.scrollingElement.scrollTop || document.documentElement.scrollTop;
        if (top >= offsetThreshold) {
            if (!scrolled) {
                target.classList.add(scrollClass);
                scrolled = true;
            }
        } else {
            if (scrolled) {
                target.classList.remove(scrollClass);
                scrolled = false;
            }
        }
    };

})();

/**
 * tabFocus
 * 
 * Checks if user uses tabs and adds a
 * class that adds focus rings on elements
 * 
 * @param   {Event} event
 */
export const tabFocus = (event) => {

    let cls = '--tab',
        onKeyDown,
        onMouseDown;

    /**
     * onKeyDown
     * 
     * @param   {Event} e
     */
    onKeyDown = (e) => {
        if (e.keyCode === 9) {
            document.body.classList.add(cls);
            window.removeEventListener('keydown', onKeyDown);
            window.addEventListener('mousedown', onMouseDown);
        }
    };

    /**
     * onMouseDown
     * 
     * @param   {Event} e
     */
    onMouseDown = (e) => {
        document.body.classList.remove(cls);
        window.removeEventListener('mousedown', onMouseDown);
        window.addEventListener('keydown', onKeyDown);
    };

    // Listen for tabs
    window.addEventListener('keydown', onKeyDown);

};

/**
 * scrollBarMove
 * 
 * Creates a function that will size a element according
 * to the amount the user has scrolled the page.
 * For example, if the page has been scrolled to the half 
 * point, the element's size would be 50%. 3/4 scrolled 
 * and the element would be 75% in size, and so on.
 * 
 * @function
 * @since   1.0
 * 
 * @param   {(String|HTMLElement)} scrollBarElement
 * @returns {Function}
 */
export const scrollBarMove = (scrollBarElement) => {

    /**
     * Create variable for scrollBar.
     * @type    {null}
     */
    let scrollBar = null;

    /**
     * Get the scrollbar element.
     * @type    {}
     */
    if (!scrollBarElement) return;
    if ('string' === typeof scrollBarElement) {
        scrollBar = document.querySelector(scrollBarElement);
    } else if (scrollBarElement instanceof HTMLElement) {
        scrollBar = scrollBarElement
    }
    
    // Check if the element is not invalid.
    if (!scrollBar) return;

    /**
     * Return an anonymous function to create
     * a closure.
     */
    return () => {

        /**
         * The scrollable height of the document.
         * @type    {Number}
         */
        let scrollHeight = document.documentElement.scrollHeight;

        /**
         * The inner height of the window object.
         * @type    {Number}
         */
        let windowHeight = window.innerHeight;

        /**
         * The current scroll position.
         * @type    {Number}
         */
        let scrollTop = document.scrollingElement ? document.scrollingElement.scrollTop : document.documentElement.scrollTop;
        
        /**
         * The percentage of the amount scrolled.
         * @type    {Number}
         */
        let percentage = scrollTop / (scrollHeight - windowHeight) * 100;

        /**
         * Apply the transformation to the scrollbar.
         */
        scrollBar.style.webkitTransform = `translate3d(${percentage}%, 0, 0)`;
        scrollBar.style.mozTransform = `translate3d(${percentage}%, 0, 0)`;
        scrollBar.style.transform = `translate3d(${percentage}%, 0, 0)`;
    };

};