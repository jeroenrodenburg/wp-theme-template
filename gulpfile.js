/* jshint esversion: 6 */

// Get gulp packages
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

/**
 * Default gulp task
 * 
 * Run this by typing the following in the command line:
 * 
 * gulp
 * 
 * This will initiate gulp, perform the default task and continue watching
 * all of the files that are being wathed.
 * In this case that's all of the CSS files in the theme folder.
 */
gulp.task('default', () => {
  return gulp.src('*.css')
    .pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({compatibility: '*'}))
	.pipe(gulp.dest('./css/'));
});

// Watch for all the CSS files and execute 'default' when a change is made.
gulp.watch('*.css', ['default']);