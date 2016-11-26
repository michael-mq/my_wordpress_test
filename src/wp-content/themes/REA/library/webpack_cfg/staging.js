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
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": "\"staging\""
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ];
  },
  getLoaders: getLoaders
}
