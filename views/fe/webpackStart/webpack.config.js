var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
  entry: APP_PATH,
  //输出的文件名 合并以后的js会命名为bundle.js
  output: {
    path: BUILD_PATH,
//  filename: 'bundle.js'
//   filename: '[name].[hash].js'
     filename: '[name].[chunkhash].js'
  },
  //安装webpack-dev-server后添加
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
   module: {
    loaders: [
	  //css模块配置
    //		原生加载css文件时
      /*{
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: APP_PATH
      }*/
     //	加载less和sass文件
     {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: APP_PATH
     },
     //图片模块加载
     {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },
      //添加ES6的支持
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH,
        query: {
          presets: ['es2015']
        }
      },
     
    ]
  },
  
  //添加我们的插件 会自动生成一个html文件
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app'
    })
  ]
};