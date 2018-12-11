const mode = process.env.NODE_ENV || "development";
const path = require("path");

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry: {
        "script": "./src/js/script.js",
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        }
      ]
    },
    output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist/"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new ExtractTextPlugin({
            filename:  (getPath) => {
              return getPath('style.css').replace('css/js', 'css');
            },
            allChunks: true
        })
    ]
}