// webpack.config.js
var path = require("path");
/*module.exports = {
	entry: '../src/entry.js', //演示单入口文件
	output: {
		path: path.join(__dirname, 'out'),  //打包输出的路径
		filename: 'bundle.js',			  //打包后的名字
		publicPath: "./out/"				//html引用路径，在这里是本地地址。
	}
};*/

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var jsPath = __dirname+ '/app/js/';
module.exports = {
//	entry: '../src/entry.js', //演示单入口文件
	entry: {
		index: jsPath + "index.js",
		index2: jsPath + "index2.js"
	},
	output: {
		path: path.join(__dirname, 'build'),  //打包输出的路径
//		filename: '[name].bundle.js',			  //打包后的名字
		filename: '[name].[chunkhash:8].js',
		publicPath: "build"				//html引用路径，在这里是本地地址。
	},
	module: {
		loaders: [
//			{test: /\.js$/, loader: "babel"},
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")}
//			{test: /\.(jpg|png|svg)$/, loader: "url?limit=8192"},
//			{test: /\.scss$/, loader: "style!css!sass"}
		]
	},
	plugins: [
//		new webpack.optimize.CommonsChunkPlugin('common.js'),
		new ExtractTextPlugin("[name].[chunkhash:8].css")
	]
};