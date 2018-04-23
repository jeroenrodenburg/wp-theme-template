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
 * @function
 * @since 	1.0
 */
const toggleClassOnScroll = (() => {

    // Modify these variables
    let target = document.body,
        scrollClass = '--scroll',
        offsetThreshold = 100;

    // Scroll switch
    let scrolled = false;

    // Returns a closure function
    return () => {
        let top = document.scrollingElement.scrollTop;
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