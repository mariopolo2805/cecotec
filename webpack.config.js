// Modules
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

module.exports = (function makeWebpackConfig() {
  const config = {};

  config.entry = isTest ? undefined : { app: './src/app/app.js' };

  config.output = isTest
    ? {}
    : {
        path: `${__dirname}/dist`,
        publicPath: '/',
        filename: isProd ? '[name].[hash].js' : '[name].bundle.js',
        chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js',
      };

  if (isTest) {
    config.devtool = 'inline-source-map';
  } else if (isProd) {
    config.devtool = 'source-map';
  } else {
    config.devtool = 'eval-source-map';
  }

  // Initialize module
  config.module = {
    rules: [
      {
        test: /\.js$/,
        include: [`${__dirname}/src`],
        loader: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              failOnError: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        loader: isTest
          ? 'null-loader'
          : ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: [
                { loader: 'css-loader', query: { sourceMap: true } },
                { loader: 'postcss-loader' },
                { loader: 'sass-loader', query: { sourceMap: true } },
              ],
            }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
      },
    ],
  };

  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      test: /\.scss$/i,
      options: {
        postcss: {
          plugins: [autoprefixer],
        },
      },
    }),
  ];

  // Skip rendering index.html in test mode
  if (!isTest) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        inject: 'body',
      }),
      new ExtractTextPlugin({
        filename: 'css/[name].css',
        disable: !isProd,
        allChunks: true,
      })
    );
  }

  // Add build specific plugins
  if (isProd) {
    config.plugins.push(
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new CopyWebpackPlugin([
        {
          from: `${__dirname}/src/public`,
        },
      ])
    );
  }

  config.devServer = {
    contentBase: './src/public',
    stats: 'minimal',
    host: '0.0.0.0',
  };

  return config;
})();
