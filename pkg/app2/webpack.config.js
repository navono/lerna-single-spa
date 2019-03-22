const path = require('path');

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
    ]
  },

  mode: 'development',

  devtool: 'eval-source-map',
  // devtool: 'none',

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
