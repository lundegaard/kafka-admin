const commonPaths = require('./common-paths');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const config = {
  mode: 'production',
  entry: {
    app: `${commonPaths.appEntry}/index.js`,
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader',
          ],
        }),
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
          minSize: 1,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin([commonPaths.outputPath], {
      root: commonPaths.projectRoot,
    }),
    new ExtractTextPlugin({
      filename: 'styles.[contenthash].css',
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      {
        from: `${commonPaths.projectRoot}/public`,
        to: commonPaths.outputPath,
      },
    ]),
  ],
};

module.exports = config;
