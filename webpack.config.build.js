const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {

    devtool: 'cheap-module-source-map',

    output: {
        path: path.join(__dirname, '_dist'),
        filename: '[name].[chunkhash].min.js'
    },

    plugins: webpackConfig.plugins.concat([
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),

        new CleanWebpackPlugin(['_dist'])
    ])

});
