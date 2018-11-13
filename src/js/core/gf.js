/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file gf.js
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
 * Adds a focus class to the label of an input element in Gravity Forms.
 * This enables the label to be manipulated on focus.
 * 
 * @example
 * HTMLFormElement.addEventListener('focusin', gfFocusLabel, false);
 * 
 * @function
 * @since	1.0
 * @param 	{Event} event 
 */
export const gfFocusLabel = (event) => {
	if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
		let parent = event.target.parentNode;
		if (parent.classList.contains('ginput_container')) {
			let label = parent.previousSibling;
			if (label.classList.contains('gfield_label')) {
				label.classList.add('gfield_label--focus');
			}
		}
	}
};

/**
 * Removes a focus class to the label of an input element in Gravity Forms
 * This enables the label to be manipulated on blur.
 * 
 * @example
 * HTMLFormElement.addEventListener('focusout', gfBlurLabel, false);
 * 
 * @function
 * @since	1.0
 * @param 	{Event} event 
 */
export const gfBlurLabel = (event) => {
	if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
		if (event.target.value === '') {
			let parent = event.target.parentNode;
			if (parent.classList.contains('ginput_container')) {
				let label = parent.previousSibling;
				if (label.classList.contains('gfield_label')) {
					label.classList.remove('gfield_label--focus');
				}
			}
		}
	}
};