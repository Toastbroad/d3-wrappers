// Taken from https://github.com/wbkd/yet-another-webpack-es6-starterkit/blob/master/webpack-dev.config.js
module.exports = require('./webpack.config-helper')({
    isProduction: false,
    devtool: 'cheap-eval-source-map',
    port: 1337,
    mode: 'development'
  });