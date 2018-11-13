/**
 * Webpack Config
 * 
 * @file webpack.config.js
 */

const path = require('path');

module.exports = {
	entry: {
		App: "./js/app.js",
		Vendor: "./js/vendor.js"
	},
	output: {
		path: path.resolve(__dirname, "dist/js"),
		filename: "[name]-min.js"
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
        		use: [ 'style-loader', 'postcss-loader' ]
			}
		]
	},
	mode: 'production'
}
