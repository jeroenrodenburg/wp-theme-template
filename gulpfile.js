/* jshint esversion: 6 */

// Get gulp packages
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const criticalCSS = require('gulp-penthouse');
const realFavicon = require('gulp-real-favicon');

// File where the favicon markups are stored
const faviconDataFile = 'faviconData.json';

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
		.pipe(minify())
		.pipe(gulp.dest('./dist/js/'));
});

/**
 * Critical CSS gulp task
 * 
 * Creates a critical CSS file.
 * The source of the file can be changed if needed
 * 
 * How it works
 * 
 * For options check out:
 * {@link https://www.npmjs.com/package/penthouse}
 * 
 */
gulp.task('critical', () => {

	/**
	 * List of URLs to check and create critical CSS files for.
	 * Add your own URL and filename to the array to create
	 * multiple critical CSS files
	 * 
	 * @type		{Object[]} An array of objects with an url and out parameter
	 * @property	{String} object.url The URL to get the critical styles from
	 * @property	{String} object.fileName The name and type of the output file
	 */
	const criticalPaths = [
		{
			url: '', // url from where we want penthouse to extract critical styles
			fileName: '', // output file name
		},
	];
	
	return criticalPaths.forEach((path) => {
		gulp.src('./dist/css/style.css')

			/**
			 * @property	{String} url The URL to extract the critical CSS from
			 * @property	{String} out The file that the function outputs
			 * @property	{Number} width Maximum width of page to check
			 * @property	{Number} height Maximum height of page to check
			 * @property	{String} userAgent Useragent to check the page with
			 */
			.pipe(criticalCSS({
				url: path.url,
				out: path.fileName,
				width: 1400,
				height: 900,
				userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' // pretend to be googlebot when grabbing critical page styles.
			}))
			.pipe(cleanCSS({compatibility: '*'}))
			.pipe(gulp.dest('./dist/critical/'));
	});
});

/**
 * Generate favicons
 * 
 * Creates multiple favicons and icons
 * for iOS, Android, MacOS and Windows.
 * 
 * For options check out:
 * {@link https://github.com/RealFaviconGenerator/gulp-real-favicon}
 */
gulp.task('favicon', (done) => {
	return realFavicon.generateFavicon({
		masterPicture: './media/favicons/favicon.png',
		dest: './media/favicons/',
		iconsPath: '/media/favicons/',
		design: {
			ios: {
				pictureAspect: 'backgroundAndMargin',
				backgroundColor: '#ffffff',
				margin: '14%',
				assets: {
					ios6AndPriorIcons: false,
					ios7AndLaterIcons: false,
					precomposedIcons: false,
					declareOnlyDefaultIcon: true
				}
			},
			desktopBrowser: {},
			windows: {
				pictureAspect: 'noChange',
				backgroundColor: '#2d89ef',
				onConflict: 'override',
				assets: {
					windows80Ie10Tile: false,
					windows10Ie11EdgeTiles: {
						small: true,
						medium: true,
						big: true,
						rectangle: true
					}
				}
			},
			androidChrome: {
				pictureAspect: 'noChange',
				themeColor: '#ffffff',
				manifest: {
					display: 'standalone',
					orientation: 'notSet',
					onConflict: 'override',
					declared: true
				},
				assets: {
					legacyIcon: false,
					lowResolutionIcons: false
				}
			},
			safariPinnedTab: {
				pictureAspect: 'silhouette',
				themeColor: '#5bbad5'
			}
		},
		settings: {
			scalingAlgorithm: 'Mitchell',
			errorOnImageTooSmall: false,
			readmeFile: false,
			htmlCodeFile: false,
			usePathAsIs: false
		},
		markupFile: faviconDataFile
	}, () => {
		done();
	});
});

/**
 * Default gulp task
 * 
 * Run this by typing the following in the command line:
 * 
 * gulp
 * 
 * This will initiate gulp, perform the default task and continue watching
 * all of the files that are being watched.
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