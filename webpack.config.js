const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      minify = require('html-minifier').minify,
      IS_DEV = (process.env.NODE_ENV === 'dev'), /* Is the current build a development build */
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
            IS_DEV: IS_DEV
        }),

        /*new webpack.ProvidePlugin({
            // lodash
            '_': 'lodash'
        }),*/

        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            title: appHtmlTitle,
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                minifyJS: true
            },
            hash: true
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
                            sourceMap: IS_DEV
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
                            sourceMap: IS_DEV
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: IS_DEV,
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

            // IMAGES & FONTS
            {
                test: /\.(jpe?g|png|svg|gif|woff|woff2|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};