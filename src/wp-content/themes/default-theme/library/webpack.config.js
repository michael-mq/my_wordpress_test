require("babel-polyfill");
const path = require("path");
const commonCfg = require("./webpack_cfg/common");

module.exports = {
  devtool: "source-map",
  entry: [
    "babel-polyfill", "./index.js"
  ],
  output: {
    path: path.resolve(__dirname, "./"),
    filename: "js/dist/bundle.[hash].js"
  },
  module: {
    rules: [...commonCfg.getLoaders()]
  },
  plugins: [...commonCfg.getPlugins()]
}
