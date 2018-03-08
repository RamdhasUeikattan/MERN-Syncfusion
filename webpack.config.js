'use strict';

const webpack = require('webpack');

let config = {
  entry: {
    myPages: [
      './app/main.js'
    ]
  },
  module: {
     loaders: [
       // Javascript: js, jsx
       {
         test: /\.jsx?$/,
         loader: 'babel-loader',
         exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          compact: false,
        },
       }
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  }
};

module.exports = config;