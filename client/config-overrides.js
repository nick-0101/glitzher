const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#f5222d',
        '@border-radius-base': '4px',
        '@heading-color': 'rgba(39,50,68,255)',
        '@text-color': ' rgba(39,50,68,255)',
        '@text-color-secondary': 'rgb(167,179,194)',
      },
    },
  })
);
