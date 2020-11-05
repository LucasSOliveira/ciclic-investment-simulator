/* eslint-disable */
const path = require('path')
const setAlias = (dir) => path.resolve(__dirname, dir)

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        utils: setAlias('src/assets/utils'),
        scss: setAlias('src/assets/scss'),
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: "@import 'src/assets/scss/variables.scss';",
      },
    },
  },
}
