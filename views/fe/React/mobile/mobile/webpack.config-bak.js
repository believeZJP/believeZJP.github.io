var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
    {
        name: "browser",
        entry: {
            main: './src/main.js'
        },
        output: {
            path: './public/resources',
            filename: 'bundle.js'
        },
        devtool: 'inline-source-map',
        debug:true,
        module: {
            loaders: [
                { test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel-loader?optional=runtime','strict-loader'] },
                { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
                { test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)([\?]?.*)$/, exclude: /node_modules/, loader: 'url-loader' }
            ]
        },
        plugins: [
            new ExtractTextPlugin("styles.css")
        ]
    }
];

