const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    output: {
        path: resolve('dist')
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader?exportAsEs6Default'
                }
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                exclude: [resolve('node_modules')],
                options: {
                    emitErrors: true
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [resolve('src'), resolve('node_modules')]
    },
    plugins: [
        new CleanWebpackPlugin({
            verbose: true,
            root: resolve('')
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('static'),
                to: 'static',
                ignore: ['.*']
            },
            {
                from: resolve(
                    'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'
                ),
                to: 'static/js'
            }
            // {
            //     from: resolve('node_modules/evolve-base-assets/dist/fonts'),
            //     to: 'static/fonts'
            // }
        ])
        // new webpack.IgnorePlugin(/vertx/)
    ]
}
