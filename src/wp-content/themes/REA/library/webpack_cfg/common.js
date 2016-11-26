"use strict";

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");
const srcPath = path.join(__dirname, "/../");
const webpack = require("webpack");
const BowerWebpackPlugin = require("bower-webpack-plugin");

function getLoaders() {
  return [
    // Add babel support
    {
      test: /.js?$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      // Add es2015 and react loading support
      query: {
        presets: ["es2015", "stage-0", "react"]
      }
    }, {
      test: /\.(s)*css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!postcss-loader!sass-loader?sourceMap")
    },
    {
      test: /\.(jpe?g|png|gif)$/i,
      loader: "url",
      query: {
        name: "img/[hash]-[name].[ext]",
        limit: 10000
      }
    },
    {
      test: /\.(ttf|eot|svg|woff)$/i,
      loader: "url",
      query: {
        name: "fonts/[hash]-[name].[ext]"
      }
    },
    {
      test: /\.json$/, loader: "json-loader"
    }
  ];
}

function getNode() {
  return {
    console: true,
    fs: "empty",
    tls: "empty",
    net: "empty"
  };
}

function getPreLoaders() {
  return [{
    test: /\.(js|jsx)$/,
    include: srcPath,
    loader: "eslint-loader"
  }
  ];
}

function getPlugins() {
  return [
    new ExtractTextPlugin("css/dist/bundle.[hash].css"),
    new webpack.optimize.DedupePlugin(),
    function () {
      this.plugin("done", function (stats) {
        require("fs").writeFileSync(
          path.join("./bundle.hash.config"),
          stats.toJson()["hash"]);
      });
    }
  ];
}

module.exports = {
  srcPath: srcPath,
  getPreLoaders: getPreLoaders,
  getLoaders: getLoaders,
  getNode: getNode,
  getPlugins: getPlugins
}
