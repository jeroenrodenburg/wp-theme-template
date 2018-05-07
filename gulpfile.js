/* jshint esversion: 6 */

// Get gulp packages
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const criticalCss = require('gulp-penthouse');

/**
 * CSS gulp task
 * 
 * Autoprefixes the CSS with the use of autoprefixer
 * and minifies the CSS to the selected folder.
 * 
 * For options check out:
 * {@link https://github.com/postcss/autoprefixer#options}
 * 
 */
gulp.task('css', () => {
	return gulp.src('./style.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: '*'}))
		.pipe(gulp.dest('./dist/css/'));
});

/**
 * JS gulp task
 * 
 * Parses the JavaScript and turns ES6 code 
 * into legacy code for older browsers.
 * 
 * For options check out:
 * {@link https://babeljs.io/docs/usage/api/}
 * 
 */
gulp.task('js', () => {
	return gulp.src('./js/script.js')
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(gulp.dest('./dist/js/'));
});

/**
 * Critical CSS gulp task
 * 
 * Creates a critical CSS file.
 * The source of the file can be changed if needed
 * 
 * How it works
 * @property	{String} out The file that the function outputs
 * @property	{String} url The URL to extract the critical CSS from
 * @property	{Number} width Maximum width of page to check
 * @property	{Number} height Maximum height of page to check
 * @property	{String} userAgent Useragent to check the page with
 * 
 * For options check out:
 * {@link https://www.npmjs.com/package/penthouse}
 * 
 */
gulp.task('critical', function () {
	return gulp.src('./dist/css/style.css')
		.pipe(criticalCss({
			out: 'critical.php', // output file name
			url: 'http://localhost:8888', // url from where we want penthouse to extract critical styles
			width: 1400,
			height: 900,
			userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' // pretend to be googlebot when grabbing critical page styles.
		}))
		.pipe(gulp.dest('./dist/critical/'));
});

/**
 * Default gulp task
 * 
 * Run this by typing the following in the command line:
 * 
 * gulp
 * 
 * This will initiate gulp, perform the default task and continue watching
 * all of the files that are being wathed.
 * 
 */
gulp.task('default', ['css', 'js']);

/**
 * Watch gulp task
 * 
 * Watch for all the CSS files and execute 'default' 
 * when a change is made in the files in the paths.
 * 
 */
gulp.watch(['./style.css', './js/script.js'], ['default']);