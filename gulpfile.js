/* jshint esversion: 6 */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

gulp.task('default', () => {
  return gulp.src('*.css')
    .pipe(autoprefixer({
		browsers: ['last 2 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({compatibility: '*'}))
    .pipe(gulp.dest('./css/'));
});

gulp.watch('*.css', ['default']);