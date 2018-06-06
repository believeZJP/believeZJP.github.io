const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        // 设置基本目录结构
        // contentBase: path.resolve(__dirname, 'dist'),
        contentBase: './',
        // 服务器的IP地址，可以是IP也可以是localhost
        host: 'localhost',
        // 服务端压缩是否开启
        compress: true,
        // 配置服务端口
        port: 8089
    },
    mode: 'development'
};