/**
 * @description - postcss options
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');
const nested = require('postcss-nested');
const flexbugs = require('postcss-flexbugs-fixes');
const atImport = require('postcss-import');
const atUrl = require('postcss-url');
// const PXToViewport = require('postcss-px-to-viewport');

module.exports = {
  plugins: [
    atImport(),
    atUrl({
      basePath: path.resolve(__dirname, 'src'),
    }),
    flexbugs(),
    nested(),
    autoprefixer(),
    /* use self own dimension */
    // PXToViewport({
    //   viewportWidth: 375,
    //   viewportHeight: 667,
    //   unitPrecision: 5,
    //   selectorBlackList: [],
    // }),
  ],
};
