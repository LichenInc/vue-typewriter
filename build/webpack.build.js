
var config = require('./webpack.config.js')
var webpack = require('webpack')
delete config.devServer

config.output = {
  filename: './dist/typewriter.js',
  library: 'VueTypewriter',
  libraryTarget: 'umd'
}

config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    beautify: true,
    mangle: false,
    compress: {
      dead_code: false
    }
  })
]

module.exports = config
