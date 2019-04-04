const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const paths = require('./paths');

const PORT = process.env.PORT || 3080;

const devConfig = merge(baseConfig, {
  target: 'electron-renderer',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    // contentBase: [paths.outPutPath, '/'],
    // contentBase: './dist',conta
    // contentBase: paths.appPublic,
    // publicPath: '/',
    watchContentBase: true,
    hot: true,
    port: PORT,
    historyApiFallback: true,
    stats: {
      colors: true,
    },
  },

  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${PORT}/`,
    // dev-server: 遇到错误会重新刷新浏览器
    // only-dev-server: 遇到错误不会重新刷新浏览器，React App推荐使用。因为不会重置状态
    'webpack/hot/only-dev-server',
    paths.appIndexJs,
  ],

  output: {
    pathinfo: true,
    // publicPath: '/',
    path: paths.appBuild,
    filename: 'spa-bootstrap.js',
    libraryTarget: 'commonjs2',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    // dev only
    new webpack.HotModuleReplacementPlugin(),

    // new webpack.NoEmitOnErrorsPlugin(),

    // new webpack.LoaderOptionsPlugin({
    //   debug: true,
    // }),

    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    new CopyWebpackPlugin([
      {from: path.resolve(__dirname, '../project.config.js')},
    ])
  ],
  node: {
    __dirname: false,
    __filename: false
  },
});

module.exports = devConfig;
