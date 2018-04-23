const path = require('path');
const webpack = require('webpack');
// HTML
const HtmlWebpackPlugin = require('html-webpack-plugin');
// media
const LinkMediaHtmlWebpackPlugin = require('link-media-html-webpack-plugin');
const commonJS = require("babel-core").transform("code", {
	plugins: ["transform-es2015-modules-commonjs"]
});
//.[contenthash] for unique filename
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
	filename: "./css/[name].css",
	allChunks: true,

});
/*Clean up build folder*/ 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cleanBuildFolder = new CleanWebpackPlugin(['dest'], { root: path.resolve(__dirname , '..'), verbose: true })
// split common code into other files.
const commonCunk = new webpack.optimize.CommonsChunkPlugin({
	name: "vendor",
	minChunks: Infinity
})
// our service worker will wait

module.exports = env => {
	return{
		entry: {
			vendor: ['babel-polyfill','lodash','bootstrap'],
			app: './src/index.js'
		},
		output: {
			path: path.resolve(__dirname, '../dest/'),
			//publicPath: '/build/',
			filename: './js/[name]_bundle.js'
		},
		watch: false,
		module: {
			rules: [
			{
				test: /\.html$/,
				use:['html-loader']
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{ loader: 'css-loader' }, { loader: 'postcss-loader'}, {loader: 'sass-loader'}],
					// use style-loader in development
					fallback: "style-loader",
					publicPath: "/build"
				})
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-es2015', 'react'],
						plugins: ['babel-plugin-transform-object-assign','babel-plugin-transform-class-properties','babel-plugin-transform-object-rest-spread']
					}
				}
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets/images/',
							publicPath: './',
							useRelativePath: process.env.NODE_ENV === "production",
							fallback: 'file-loader'
						}
					}
				]
			},
			{
				test: /\.html$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name:'[name].[ext]'
						}
					}
				],
				exclude: path.resolve(__dirname, 'src/index.html')
			}
		]
		},
		plugins: [
			cleanBuildFolder,
			extractSass,
			commonCunk,
			new LinkMediaHtmlWebpackPlugin()
		]
}
};
// not working right now
//const namedModule = new webpack.NamedModulesPlugin();
//const hotModule = new webpack.HotModuleReplacementPlugin();