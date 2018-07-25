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
 * getVideo
 * 
 * Finds and returns a single video
 * 
 * @function
 * @since	1.0
 * @param	{(String|HTMLVideoElement)} videoElement
 * @returns	{HTMLVideoElement}
 */
const getVideo = (videoElement) => {
	return videoElement ?
		'string' === typeof videoElement ? 
			document.querySelector(videoElement) :
			videoElement instanceof HTMLVideoElement ?
				videoElement :
				null :
		document.querySelector('video');
};

/**
 * getVideos
 * 
 * Finds and returns a collection of videos
 * 
 * @function
 * @since	1.0
 * @param	{(String|HTMLVideoElement[])} videoElements
 * @returns	{HTMLVideoElement[]}
 */
const getVideos = (videoElements) => {
	return videoElements ?
		'string' === typeof videoElements ?
			document.querySelectorAll(videoElements) :
			videoElements instanceof NodeList ||
			videoElements instanceof HTMLCollection ?
				videoElements :
				[] : 
		document.querySelectorAll('video');
};

/**
 * playVideo
 * 
 * Plays the selected video or the first video encountered.
 * The functions returns a Promise from HTMLVideoElement.play()
 * 
 * @function
 * @since	1.0
 * @uses	getVideo
 * @param	{(String|HTMLVideoElement)} videoElement String or result of document.querySelector()
 * @returns	{Promise}
 */
const playVideo = (videoElement) => {
	let video = videoElement ?
		getVideo(videoElement) :
		null;
	if (video) return video.play();
};

/**
 * pauseVideo
 * 
 * Pauses the selected video or the first video encountered.
 * The functions returns the found video element.
 * 
 * @function
 * @since	1.0
 * @uses	getVideo
 * @param	{(String|HTMLVideoElement)} videoElement String or result of document.querySelector()
 * @returns	{HTMLVideoElement}
 */
const pauseVideo = (videoElement) => {
	let video = videoElement ?
		getVideo(videoElement) :
		null;
	if (video) video.pause();
	return video;
};

/**
 * playVideos
 * 
 * Plays all the videos selected and calls the play() method.
 * The function returns a Promise.all() to async play the videos.
 * 
 * @function
 * @since	1.0
 * @uses	getVideos
 * @param	{(String|HTMLVideoElement[])} videoElements String or result of document.querySelectorAll()
 * @returns	{Promise[]}
 */
const playVideos = (videoElements) => {
	let videos = videoElements ?
		getVideos(videoElements) :
		[];
	return Promise.all(
		Array.prototype.map.call(videos, video => video.play())
	);
};

/**
 * pauseVideos
 * 
 * Pauses all the videos selected and calls the pause() method.
 * The function returns a list of found videos.
 * 
 * @function
 * @since	1.0
 * @uses	getVideos
 * @param	{(String|HTMLVideoElement[])} videoElements String or result of document.querySelectorAll()
 * @returns	{(NodeList|HTMLCollection)}
 */
const pauseVideos = (videoElements) => {
	let videos = videoElements ?
		getVideos(videoElements) :
		[];
	Array.prototype.forEach.call(videos, (video) => {
		video.pause();
	});
	return videos;
};

/**
 * muteVideo
 * 
 * @function
 * @since	1.0
 * @uses	getVideo
 * @param 	{(String|HTMLVideoElement)} videoElement Selected video element
 * @param	{Boolean} [mute=true] True or False if the video should be muted
 * @returns	{(HTMLVideoElement|null)}
 */
const muteVideo = (videoElement, mute = true) => {
	let video = videoElement ?
		getVideo(videoElement) :
		null;
	if (video && mute) video.muted = mute;
	return video;
};

/**
 * setVolumeVideo
 * 
 * @function
 * @since	1.0
 * @uses	getVideo
 * @param 	{(String|HTMLVideoElement)} videoElement Selected video element
 * @param 	{Number} volume Decimal range value from 0 to 1
 * @returns	{(HTMLVideoElement|null)}
 */
const setVolumeVideo = (videoElement, volume = 1) => {
	let video = videoElement ?
		getVideo(videoElement) :
		null;
	if (video && volume && 'number' === typeof volume) video.volume = volume;
	return video;
};

/**
 * lazyLoadVideos
 * 
 * Gets all the videos containing a source with a data-src attribute.
 * The data-src value will be put in the src attribute to load the video.
 * 
 * @function
 * @since   1.0
 * @uses	getVideos
 * @param	{(String|HTMLVideoElement[])} videoElements String or result of document.querySelectorAll()
 * @returns {HTMLCollection} An array with all the found video elements on the page
 */
const lazyLoadVideos = (videoElements) => {
	let videos = videoElements ?
		getVideos(videoElements) :
		[];
	Array.prototype.forEach.call(videos, (video) => {
		if (!video.classList.contains('video--loaded')) {
			let sources = video.querySelectorAll('source');
			sources.forEach((source) => {
				if (source.hasAttribute('data-src')) 
					source.setAttribute('src', source.dataset.src);
			});
			video.addEventListener('canplaythrough', () => {
				video.classList.add('video--loaded');
				video.removeAttribute('data-src');
			});
			video.load();
		}
	});
	return videos;
};