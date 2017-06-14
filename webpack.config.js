/*
    ./webpack.config.js
*/
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'client/index.html'),
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: path.resolve(__dirname, './client/index.jsx'),
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
  },

  module: {
    rules: [
      { test: /\.js$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        },
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.join(__dirname, 'client'),
          path.join(__dirname, 'node_modules/react-mdl/extra'),
        ],
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [HtmlWebpackPluginConfig],

};

