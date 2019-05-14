const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonPaths = require('./common-paths');

const config = {
  output: {
    filename: '[name].[hash].js',
    path: commonPaths.outputPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        loader: 'eslint-loader',
        test: /\.js$/,
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          fix: true,
          failOnError: false,
        },
      },
      {
        use: ['babel-loader'],
        test: /\.js$/,
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${commonPaths.projectRoot}/public/index.html`,
      favicon: `${commonPaths.projectRoot}/public/favicon.ico`,
    }),
  ],
};

module.exports = config;
