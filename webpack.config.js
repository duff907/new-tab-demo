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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
          presets: ['es2015', 'react']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/newtab.html', to: 'newtab.html' },
      { from: 'src/manifest.json', to: 'manifest.json' },
      { from: 'assets', to: 'assets/' },
    ])
  ]
};

module.exports = [config];
