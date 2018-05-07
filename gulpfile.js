/* jshint esversion: 6 */

// Get gulp packages
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const critical = require('critical').stream;

/**
 * CSS gulp task
 * 
 * Autoprefixes the CSS with the use of autoprefixer
 * and minifies the CSS to the selected folder.
 * 
 * For options check out:
 * https://github.com/postcss/autoprefixer#options
 * 
 */
gulp.task('css', () => {
	return gulp.src('*.css')
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
 * https://babeljs.io/docs/usage/api/
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
 * For options check out:
 * https://github.com/addyosmani/critical
 * 
 */
gulp.task('critical', function () {
    return gulp.src('dist/*.html')
        .pipe(critical({
			base: '/test', 
			inline: true,
			src: 'URLOFPAGE',
			dimensions: [1170, 1440],
			css: ['./dist/css/*.css']
		}))
		.on('error', (err) => { 
			console.log(err); 
		})
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
gulp.watch(['*.css', './js/script.js'], ['default']);