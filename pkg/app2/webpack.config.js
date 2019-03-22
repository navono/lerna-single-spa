const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    singleSpaEntry: './src/singleSpaEntry',
    store: './src/store'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'release'),
    libraryTarget: 'umd',
    library: 'app2'
  },

  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            // options: {
            //   transpileOnly: true,
            //   getCustomTransformers: () => ({
            //     before: [
            //       TsImportPluginFactory({
            //         libraryName: 'antd',
            //         libraryDirectory: 'es',
            //         style: true,
            //       }),
            //     ],
            //   }),
            //   compilerOptions: {
            //     module: 'es2015',
            //   },
            // },
          },
        ],
      },
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
        ],
      },
    ]
  },

  mode: 'development',

  devtool: 'eval-source-map',
  // devtool: 'none',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './'),
    }
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    }
  }
};
