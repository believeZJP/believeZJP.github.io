const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
    // entry: './assets/main.js',
    entry: {
        // tween: './assets/Tween.js',
        // tweenMax: './assets/TweenMax.js',
        // zepto: './assets/zepto.js',
        // pixi: './assets/pixi.js',
        // scroller: './assets/Scroller.js',
        // animate: './assets/Animate.js',
        main: './assets/main.js'
    },
    output: {
        // filename: 'bundle.js',
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',
            hash: true //向html引入的src链接后面增加一段hash值,消除缓存
        }),
        // 拷贝静态资源到dist指定目录
        new copyWebpackPlugin([
            {
                from: __dirname + '/images', //打包的静态资源目录地址
                to: './images' //打包到dist下面的public
            },
            {
                from: __dirname + '/lib', //打包的静态资源目录地址
                to: './lib' //打包到dist下面的public
            }
        ]),
        new uglifyjs(), //压缩js
    ],
    devServer: {
        // contentBase: './dist'
        contentBase: path.resolve(__dirname, 'dist'), //最好设置成绝对路径
        // host: 'localhost',
        host: '172.21.219.51',
        port: 8080,
        open: true
    }
};
