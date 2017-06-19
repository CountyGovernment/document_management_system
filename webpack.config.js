/*
    ./webpack.config.js
*/
const webpack = require('webpack');
const path = require('path');


const HtmlWebpackPlugin = require('html-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, './client/index'),
  ],
  target: 'web',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './client'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    loaders: [
      { test: /\.js|jsx$/, include: path.join(__dirname, 'client'), loaders: ['babel-loader'] },
      { test: /\.(scss|css)$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },

  plugins: [HtmlWebpackPluginConfig,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],


};
