const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonPaths = require('./common-paths');

const port = process.env.PORT || 3000;

const config = {
  mode: 'development',
  // This configuration parameter is used to create a library file for this application.
  // It can be used to access some of the components of this application and extend them.
  output: {
    path: commonPaths.outputPath,
    publicPath: '',
    filename: 'sdp-admin-fe.js',
    library: 'sdp-admin-fe',
    libraryTarget: 'umd',
  },
  entry: {
    app: [
      'react-hot-loader/patch',
      `${commonPaths.appEntry}/index.js`,
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
    }),
  ],
  devServer: {
    contentBase: `${commonPaths.projectRoot}/public`,
    historyApiFallback: {
      disableDotRule: true,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    host: 'localhost',
    hot: true,
    port,
  },
};

module.exports = config;
