const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      minify = require('html-minifier').minify,
      dev_mode = (process.env.NODE_ENV === 'dev'), /* Is the current build a development build */
      dirNode = 'node_modules',
      dirApp = path.join(__dirname, 'src'),
      dirAssets = path.join(__dirname, 'assets'),
      appHtmlTitle = 'Factor RH Creativo';

module.exports = {
    entry: {
        /*vendor: [
            'lodash'
        ],*/
        bundle: path.join(dirAssets, 'index')
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: dev_mode
        }),

        /*new webpack.ProvidePlugin({
            // lodash
            '_': 'lodash'
        }),*/

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle,
            favicon: './assets/img/favicon.ico',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true
            },
            hash: false
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: dev_mode
                        }
                    },
                ]
            },

            // CSS / SASS
            {
                test: /\.scss/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: dev_mode
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: dev_mode,
                            includePaths: [dirAssets]
                        }
                    }
                ]
            },

            // EJS
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/i,
                loaders: [
                    'file-loader?{name: "[path][name].[ext]"}'
                ]
            },
            // SVG & FONTS
            {
                test: /\.(svg|woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};