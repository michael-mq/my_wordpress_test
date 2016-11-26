var webpack = require("webpack");

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
          "NODE_ENV": "\"development\""
        }
      })
    ];
  },
  getLoaders: getLoaders
}
