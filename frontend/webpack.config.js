const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const ENV =
  process.env.NODE_ENV ||
  (process.argv.indexOf('--mode') !== '-1' &&
    process.argv[process.argv.indexOf('--mode') + 1]);
const ROOT_PATH = __dirname;
const IS_PROD = ENV === 'production';

module.exports = {
  mode: IS_PROD ? 'production' : 'development',
  entry: {
    app: path.resolve(ROOT_PATH, 'source', 'index.jsx'),
  },
  output: {
    path: path.resolve(ROOT_PATH, 'public'),
    publicPath: '/',
    filename: IS_PROD ? '[name]-[contenthash:8].js' : '[name]-[hash:8].js',
    chunkFilename: IS_PROD ? '[name]-[contenthash:8].js' : '[name]-[hash:8].js',
    assetModuleFilename: '~/[name]-[hash:8][ext][query]',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json', '*'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/inline',
        parser: { dataUrlCondition: { maxSize: 50000 } },
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(IS_PROD),
      __IS_PROD__: JSON.stringify(IS_PROD),
      __isDev__: JSON.stringify(!IS_PROD),
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, 'source', 'index.htm'),
    }),
    IS_PROD &&
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
  ].filter(Boolean),
  optimization: {
    usedExports: !IS_PROD,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',

    removeAvailableModules: IS_PROD,
    removeEmptyChunks: IS_PROD,

    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[/\\]node_modules[/\\]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  watchOptions: {
    aggregateTimeout: 300, // Delay the first rebuild (in ms)
    poll: 1000, // Poll using interval (in ms or a boolean)
    ignored: /node_modules/, // Ignore to decrease CPU usage
  },
  devtool: IS_PROD ? 'source-map' : 'eval-cheap-module-source-map',
  devServer: {
    port: process.env.PORT || 8080,
    contentBase: path.resolve(ROOT_PATH, 'public'),
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    hints: 'warning', // "error" or false are valid too
    maxEntrypointSize: 50000, // in bytes, default 250k
    maxAssetSize: 100000, // in bytes
  },
  stats: {
    preset: 'minimal',
  },
};
