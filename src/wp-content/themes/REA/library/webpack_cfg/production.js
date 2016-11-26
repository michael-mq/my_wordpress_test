const webpack = require("webpack");

function getLoaders() {
  return [
    { test: /\.modernizrrc$/, loader: "modernizr" }
  ]
}

module.exports = {
  devtool: "source-map",
  getPlugins: function () {
    return [
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": "\"production\""
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      })
    ];
  },
  getLoaders: getLoaders
}
