const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

const prodConfig = merge(baseConfig, {
  target: 'electron-renderer',
  mode: 'production',
  devtool: 'source-map',
  entry: [
    paths.appIndexJs
  ],
  output: {
    path: paths.appBuild,
    // publicPath: '',
    filename: 'spa-bootstrap.js',
    libraryTarget: 'commonjs2'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../project.config.js')},
      { from: path.resolve(__dirname, '../libs/system.js') }
    ])
  ]
});

module.exports = prodConfig;
