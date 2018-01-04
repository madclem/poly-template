const path = require('path');
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./base');
const defaultSettings = require('./defaults');

const config = Object.assign({}, baseConfig, {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:' + defaultSettings.port,
    'webpack/hot/dev-server',
    './src/js/index'
  ],
  cache: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'dist/index.html'
  	}),
    new OpenBrowserPlugin({ url: 'http://localhost:'+ defaultSettings.port })
  ],
  module: defaultSettings.getDefaultModules()

});

module.exports = config;
