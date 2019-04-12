const path = require('path')
const webpack = require('webpack')
const ForksCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            './src/index'
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: resolve('dist'),
        hot: true
    },
    output: {
        filename: '[name].js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForksCheckerWebpackPlugin({
            async: false,
            watch: resolve('src'),
            tsconfig: resolve('tsconfig.json'),
            tslint: resolve('tslint.json')
        })
    ]
})
