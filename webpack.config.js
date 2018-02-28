const webpack = require('webpack');
const path = require('path');

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
};

module.exports = [config];
