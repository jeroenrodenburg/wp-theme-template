/* jshint esversion: 6 */

/**
 * @author Control <info@controldigital.nl>
 * @file gutenberg.js
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
 * Destructuring of wp.blocks.registerBlcokType
 * @type    {Function}
 */
const { registerBlockType } = wp.blocks;

/**
 * Destructuring of wp.element.createElement
 * @type    {Function}
 */
const { createElement } = wp.element;

/**
 * Destructuring of wp.editor.RichText
 * @type    {Object}
 */
const { RichText } = wp.editor;

/**
 * Style of the gutenberg block in the editor
 * @type    {Object}
 */
const blockStyle = { 
    backgroundColor: '#900', 
    color: '#fff', 
    padding: '20px' 
};

/**
 * Register the block.
 * This inserts the block into the 
 * editor. All properties may be edited
 * for further customization.
 */
registerBlockType( 'control/gutenberg-boilerplate', {
    title: 'Hello World',
    icon: 'universal-access-alt',
    category: 'layout',
    edit() {
        return createElement( 'p', { style: blockStyle }, 'Hello Editor' );
    },
    save() {
        return createElement( 'p', { style: blockStyle }, 'Hello Saved Content' );
    },
} );

