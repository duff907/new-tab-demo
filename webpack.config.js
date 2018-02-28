const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
  entry: [
    './src/js/index.js'
  ],
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/newtab.html', to: 'newtab.html' },
      { from: 'assets', to: 'assets/' },
    ])
  ]
};

module.exports = [config];
