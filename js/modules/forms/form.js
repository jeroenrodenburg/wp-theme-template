/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file form.js
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
 * isInputElement
 * 
 * Checks if a form element is not of a certain type.
 * This can be used to filter out unwanted elements.
 * 
 * @function
 * @since   1.0
 * 
 * @param   {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element 
 * @returns {Boolean}
 */
export const isInputElement = element => ['submit', 'button', 'fieldset'].every((type) => type !== element.type);

/**
 * isValidElement
 * 
 * Checks if the element has name and value properties
 * so we can use it for extracting the data.
 * 
 * @function
 * @since   1.0
 * 
 * @param   {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element
 * @returns {Boolean}
 */
export const isValidElement = element => element.name && element.value;

/**
 * isCheckedValue
 * 
 * Checks if the element is a radio or checkbox and if
 * it has a checked value.
 * 
 * @function
 * @since   1.0
 * 
 * @param   {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element 
 * @returns {Boolean}
 */
export const isCheckedValue = element => ['radio', 'checkbox'].some((type) => element.type === type) && element.checked;

/**
 * isSelectableValue
 * 
 * Checks if the element is a select element
 * with a single or multiple selectable options.
 * 
 * @function
 * @since   1.0
 * 
 * @param   {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element 
 * @returns {Boolean}
 */
export const isSelectableElement = element => ['select-one', 'select-multiple'].some((type) => element.type === type && element.options);

/**
 * isMultiSelect
 * 
 * Checks if the element has options and multiselect.
 * 
 * @function
 * @since   1.0
 * 
 * @param   {(HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement)} element
 * @returns {Boolean}
 */
export const isMultiSelect = element => element.options && element.multiple;

/**
 * FormValues
 * 
 * Mimics the behaviour of the more
 * modern FormData class
 * 
 * @class
 * @since    1.0
 */
export class FormValues {

	/**
	 * Creates a new instance.
	 * 
	 * Has a single optional argument
	 * from which to extract the keys and
	 * values from.
	 * 
	 * @constructor
	 * @param	{HTMLFormElement=} form
	 * @returns	{FormValues}
	 */
	constructor(form) {
		this.entries = [];
		if (form && form instanceof HTMLFormElement) {
			[...form.elements].forEach((el) => {
				if (el.name) {
					if (el.type === 'select-one' || el.type === 'select-mulitple') {
						[...el.selectedOptions].forEach((option) => {
							if (option.value !== '') {
								this.add([el.name, option.value]);
							}
						});
					} else if (el.type === 'checkbox' || el.type === 'radio') {
						if (el.checked === true && el.value !== '')
							this.add([el.name, el.value]);
					} else if (el.type !== 'fieldset') {
						if (el.value !== '')
							this.add([el.name, el.value]);
					}
				}
			});
		}
	}

	/**
	 * get
	 * 
	 * Returns the value of
	 * the selected key
	 * 
	 * @param	{String} key
	 * @returns	{*}
	 */
	get(key) {
		if (this.has(key))
			return this.entries
				.filter((entry) => entry[0] === key)[0][1];
	}

	/**
	 * getAll
	 * 
	 * Returns all values of a 
	 * selected key in an array.
	 * 
	 * @param	{String} key
	 * @returns	{Array}
	 */
	getAll(key) {
		if (this.has(key))
			return this.entries
				.filter((entry) => entry[0] === key)
				.map((entry) => entry[1]);
	}

	/**
	 * has
	 * 
	 * Returns a boolean which checks 
	 * if a value is present
	 * 
	 * @param	{String} key
	 * @returns	{Boolean}
	 */
	has(key) {
		return this.entries
			.some((entry) => entry[0] === key);
	}

	/**
	 * add
	 * 
	 * Adds a new entry to the
	 * list.
	 * 
	 * @param	{String} key
	 * @param	{*} value
	 * @returns	{FormValues}
	 */
	add(key, value) {
		this.entries
			.push([key, value]);
		return this;
	}

	/**
	 * update
	 * 
	 * Adds a new entry to the
	 * list.
	 * 
	 * @param	{String} key
	 * @param	{*} value
	 * @returns	{FormValues}
	 */
	update(key, value) {
		if (this.has(key)) 
			this.entries
				.forEach((entry) => {
					if (entry[0] === key) 
						entry[1] = value;
				});
		return this;
	}

	/**
	 * remove
	 * 
	 * Removes a key from the 
	 * entries list.
	 * 
	 * @param	{String} key
	 * @returns	{FormValues}
	 */
	remove(key) {
		this.entries = this.entries
			.filter((entry) => key !== entry[0]);
		return this;
	}

	/**
	 * keys
	 * 
	 * Returns an array with
	 * only the keys.
	 * 
	 * @returns	{Array}
	 */
	keys() {
		return this.entries
			.map((entry) => entry[0]);
	}

	/**
	 * values
	 * 
	 * Returns an array with
	 * only the values.
	 * 
	 * @returns	{Array}
	 */
	values() {
		return this.entries
			.map((entry) => entry[1]);
	}

	/**
	 * toQuery
	 * 
	 * Returns a string suitable
	 * for a GET or POST request
	 * 
	 * @returns	{String}
	 */
	toQueryString() {
		return this.entries
			.map((entry) => `${entry[0]}=${entry[1]}`)
			.join('&');
	}

}