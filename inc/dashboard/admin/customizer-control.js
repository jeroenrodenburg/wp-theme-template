/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file customizer-control.js
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

(function ($) {
	'use strict';

	wp.customize.bind('ready', function() {
		var customize = this;
		
		// Privacy policy active / inactive
        customize('cookie_read_more_active', function(value) {

			// Get privacy policy fields
			var cookiePolicyButton = customize.control('cookie_read_more_label').container.find('input');
			var cookiePolicyPage = customize.control('cookie_read_more_page').container.find('select');

			// Disabled fields on default
			cookiePolicyButton.prop('disabled', !value.get());
			cookiePolicyPage.prop('disabled', !value.get());

			// Enable fields when checkbox is checked
			value.bind(function(to) {
				cookiePolicyButton.prop('disabled', !to);
				cookiePolicyPage.prop('disabled', !to);
			});
		});

		// Privacy policy active / inactive
        customize('cookie_refuse_active', function(value) {

			// Get privacy policy fields
			var cookieRefuseButton = customize.control('cookie_refuse_label').container.find('input');

			// Disabled fields on default
			cookieRefuseButton.prop('disabled', !value.get());

			// Enable fields when checkbox is checked
			value.bind(function(to) {
				cookieRefuseButton.prop('disabled', !to);
			});
		});

		// Privacy policy active / inactive
        customize('cookie_revoke_active', function(value) {

			// Get privacy policy fields
			var cookieRevokeButton = customize.control('cookie_revoke_label').container.find('input');

			// Disabled fields on default
			cookieRevokeButton.prop('disabled', !value.get());

			// Enable fields when checkbox is checked
			value.bind(function(to) {
				cookieRevokeButton.prop('disabled', !to);
			});
		});

    } );

})(jQuery);