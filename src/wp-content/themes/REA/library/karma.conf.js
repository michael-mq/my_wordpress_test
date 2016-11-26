require("babel-polyfill");
const testCfg = require("./webpack_cfg/test");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const coverageReporter =  process.argv.includes("--autoWatch=true") ? { type: "html" } : { type: "text" };

module.exports = function (config) {
  config.set({
    basePath: "./",
    browsers: ["PhantomJS"],
    files: [
      "node_modules/babel-polyfill/dist/polyfill.js",
      "test/loadtests.js"
    ],
    port: 8000,
    captureTimeout: 60000,
    frameworks: ["jasmine"],
    singleRun: true,
    reporters: ["spec", "coverage"],
    preprocessors: {
      "test/loadtests.js": ["webpack", "sourcemap"]
    },
    webpack: {
      resolve: {
        alias: {
          "rui-browser-utils": "rui-browser-tools/dist/js/rui-browser-utils.js",
          "rui-debug-tools": "rui-browser-tools/dist/js/rui-debug-tools.js",
          "rui-advertorial-config": "rui-advertorial/dist/rui-advertorial-all.js",
          "rui-advertorial": "rui-advertorial/dist/rui-advertorial-all.js"
        },

        modulesDirectories: ["node_modules", "bower_components"]
      },
      module: {
        preLoaders: testCfg.getPreLoaders(),
        loaders: testCfg.getLoaders()
      },
      node: testCfg.getNode(),
      externals: {
        "cheerio": "window",
        "react/addons": true,
        "react/lib/ExecutionEnvironment": true,
        "react/lib/ReactContext": true
      },
      plugins: [new ExtractTextPlugin("css/dist/bundle.[hash].css")]
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      dir: "coverage/",
      reporters: [
        coverageReporter
      ]
    }
  });
};
