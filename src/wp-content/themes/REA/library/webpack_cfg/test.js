const commonCfg = require("./common");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

function getPreLoaders() {
  return [
    // transpile and instrument only testing sources with isparta
    {
      test: /\.js$/,
      include: path.join(__dirname, "/../src"),
      loader: "isparta"
    }
  ];
}

function getPlugins() {
  return [
    new ExtractTextPlugin("css/dist/bundle.[hash].css")
  ];
}

module.exports = {
  devtool: "eval",
  getPreLoaders: getPreLoaders,
  getLoaders: commonCfg.getLoaders,
  getNode: commonCfg.getNode,
  getPlugins: getPlugins
}
