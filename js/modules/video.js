/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file video.js
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
 * playVideo
 * 
 * Plays the selected video or the first video encountered.
 * The functions returns a Promise from HTMLVideoElement.play()
 * 
 * @function
 * @since	1.0
 * @param	{(String|HTMLVideoElement)} videoElement String or result of document.querySelector()
 * @returns	{Promise}
 */
const playVideo = (videoElement) => {
	let video;
	if (videoElement) {
		if ('string' === typeof videoElement) {
			video = document.querySelectorAll(videoElement);
		} else if (videoElement instanceof HTMLVideoElement) {
			video = videoElement;
		}
	} else {
		video = document.querySelector('video');
	}
	if (video) return video.play();
};

/**
 * playVideos
 * 
 * Plays all the videos selected and calls the play() method.
 * The function returns a Promise.all() to async play the videos.
 * 
 * @function
 * @since	1.0
 * @param	{(String|HTMLVideoElement[])} videoElements String or result of document.querySelectorAll()
 * @returns	{Promise[]}
 */
const playVideos = (videoElements) => {
	let videos;
	if (videoElements) {
		if ('string' === typeof videoElements) {
			videos = document.querySelectorAll(videoElements);
		} else if (videoElements instanceof NodeList) {
			videos = videoElements;
		}
	} else {
		videos = document.querySelectorAll('video');
	}
	if (videos.length) {
		let videoPromises = Array.prototype.map.call(videos, (video) => {
			return video.play();
		});
		return Promise.all(videoPromises);
	}
};

/**
 * lazyLoadVideos
 * 
 * Gets all the videos containing a source with a data-src attribute.
 * The data-src value will be put in the src attribute to load the video.
 * 
 * @function
 * @since   1.0
 * @param	{(String|HTMLVideoElement[])} videoElements String or result of document.querySelectorAll()
 * @returns {HTMLCollection} An array with all the found video elements on the page
 */
const lazyLoadVideos = (videoElements) => {
	let videos;
	if (videoElements) {
		if ('string' === typeof videoElements) {
			videos = document.querySelectorAll(videoElements);
		} else if (videoElements instanceof NodeList) {
			videos = videoElements;
		}
	} else {
		videos = document.querySelectorAll('video');
	}
	videos.forEach((video) => {
			if (!video.classList.contains('video--loaded')) {
					let sources = video.querySelectorAll('source');
					sources.forEach((source) => {
							if (source.hasAttribute('data-src')) {
									source.setAttribute('src', source.dataset.src);
							}
					});
					video.addEventListener('canplaythrough', (event) => {
							video.classList.add('video--loaded');
							video.removeAttribute('data-src');
					});
					video.load();
			}
	});
	return videos;
};