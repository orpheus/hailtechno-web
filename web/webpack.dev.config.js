const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('config')
const path = require('path')

const common = require('./webpack.common')
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: config.get('port'),
    hot: 'only',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'static'),
      staticOptions: {},
      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
      // Can be:
      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
      publicPath: '/public/',
      // Can be:
      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
      serveIndex: true,
      // Can be:
      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
      watch: true
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules']
  },
  optimization: {
    runtimeChunk: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  output: {
    pathinfo: false
  }
})
