// const { override, fixBabelImports } = require('customize-cra');

// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css',
//   }),
// );

// const rewireTypescript = require('react-app-rewire-typescript');
// module.exports = function override(config, env) {
//   // do stuff with the webpack config...
//   // config = rewireTypescript(config, env);
//   return config;
// };

const {
  getLoader,
  injectBabelPlugin
} = require("react-app-rewired");
const tsImportPluginFactory = require('ts-import-plugin');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule => rule.loader && typeof rule.loader === 'string' && rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [
        tsImportPluginFactory([{
          libraryDirectory: 'es',
          libraryName: 'antd',
          style: true,
        }]),
      ]
    })
  };

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#ff0000' },
  })(config, env);
  
  return config;
};