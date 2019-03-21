const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsImportPluginFactory = require('ts-import-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = {
  // absolute path for project root
  context: path.resolve(__dirname, '../src'),

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.tsx?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  TsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true,
                  }),
                ],
              }),
              compilerOptions: {
                module: 'es2015',
              },
            },
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     // MiniCssExtractPlugin.loader,
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //     },
      //   ],
      // },
      // {
      //   test: /\.less$/,
      //   // test: /\.module\.less$/,
      //   use: [
      //     // MiniCssExtractPlugin.loader,
      //     'style-loader',
      //     'css-loader',
      //     // {
      //     //   loader: `less-loader?{"modifyVars":${JSON.stringify(
      //     //     themeVariables,
      //     //   )}}`,
      //     // },
      //   ],
      // },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: [
      //     // MiniCssExtractPlugin.loader,
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //     },
      //     {
      //       loader: 'sass-loader',
      //       options: { sourceMap: true },
      //     },
      //   ],
      // },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]',
      },
    ],
  },

  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name].css',
    // }),

    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      components: path.resolve(__dirname, '../src/renderer/components/index.ts'),
      internalComp: path.resolve(__dirname, '../src/renderer/components/internals/index.ts'),
      util: path.resolve(__dirname, '../src/renderer/util'),
      appConstants: path.resolve(__dirname, '../src/renderer/appConstants.ts'),
      appInterfaces: path.resolve(
        __dirname,
        '../src/renderer/appInterfaces.ts',
      ),
      i18n: path.resolve(__dirname, '../src/renderer/i18n.ts'),
      log: path.resolve(__dirname, '../src/renderer/logger.ts'),
      proto: path.resolve(__dirname, '../src/proto'),
    },
  },
};

module.exports = baseConfig;
