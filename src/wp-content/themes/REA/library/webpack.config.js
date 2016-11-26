"use strict";

require("babel-polyfill");
const commonCfg = require("./webpack_cfg/common");
const stagingCfg = require("./webpack_cfg/staging");
const productionCfg = require("./webpack_cfg/production");
const devCfg = require("./webpack_cfg/dev");
const path = require("path");
const autoprefixer = require("autoprefixer");

let PRELOADERS,
  DEVTOOL,
  DEBUG,
  PLUGINS,
  LOADERS,
  ENTRY = {
    main: ["babel-polyfill", "./index.js", "./src/main.js"]
  };

if (process.argv.includes("--release")) {
  process.env.REACT_WEBPACK_ENV = "release";
  PRELOADERS = [];
  DEBUG = false;
  LOADERS = productionCfg.getLoaders();
  DEVTOOL = process.argv.includes("--staging") ? stagingCfg.devtool : productionCfg.devtool;
  PLUGINS = process.argv.includes("--staging") ? stagingCfg.getPlugins() : productionCfg.getPlugins();
} else {
  process.env.REACT_WEBPACK_ENV = "dev";
  PRELOADERS = [];
  DEVTOOL = devCfg.devtool;
  DEBUG = true;
  PLUGINS = devCfg.getPlugins();
  LOADERS = devCfg.getLoaders();
}

module.exports = {

  entry: ENTRY,

  devtool: DEVTOOL,

  debug: DEBUG,

  output: {
    path: "./",
    filename: "js/dist/bundle.[name].[hash].js"
  },

  resolve: {
    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ["", ".js", ".json"],

    // Make sure root is src
    root: commonCfg.srcPath,

    alias: {
      "rui-browser-utils": "rui-browser-tools/dist/js/rui-browser-utils.js",
      "rui-debug-tools": "rui-browser-tools/dist/js/rui-debug-tools.js",
      "rui-advertorial-config": "rui-advertorial/dist/rui-advertorial-all.js",
      "rui-advertorial": "rui-advertorial/dist/rui-advertorial-all.js",
      "rui-social": "rui-core/dist/js/rui-social.js",
      "modernizr$": path.resolve(__dirname, ".modernizrrc"),
      "rui-header-footer": "rui-header-footer/dist/rui-header-footer.js"
    },

    // remove other common values
    modulesDirectories: ["node_modules", "bower_components"]
  },
  plugins: [...commonCfg.getPlugins(), ...PLUGINS],
  module: {
    preLoaders: [...commonCfg.getPreLoaders(), ...PRELOADERS],
    loaders: [...commonCfg.getLoaders(), ...LOADERS],
    noParse: [ /qs.js/ ]
  },
  postcss: [ autoprefixer({ browsers: ["last 2 versions"] }) ],
  node: commonCfg.getNode()
}
