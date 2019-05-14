const webpackMerge = require('webpack-merge');

const buildValidations = require('./build-utils/build-validations');

const commonConfig = require('./build-utils/webpack.common');

module.exports = (env) => {
  if (!env) {
    throw new Error(buildValidations.ERR_NO_ENV_FLAG);
  }

  const envConfig = require(`./build-utils/webpack.${env}.js`);
  return webpackMerge(
    commonConfig,
    envConfig,
  );
};
