const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const terserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    entry: {
        app: './src/index'
    },
    output: {
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        // new webpack.NormalModuleReplacementPlugin(
        //     '/environments\/environment\.ts',
        //     'environment.prod.ts'
        // ),
        new terserWebpackPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
                output: {
                    comments: false
                }
            }
        })
    ]
})
