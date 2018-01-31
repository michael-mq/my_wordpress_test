const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

function getLoaders() {
  return [
    {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015", "stage-0", "react"]
        }
      }
    }, {
      test: /\.(s)*css$/,
      loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader?sourceMap!sass-loader?sourceMap"})
    }, {
      test: /\.(ttf|eot|svg|woff)$/i,
      loader: "url-loader",
      query: {
        name: "fonts/[hash]-[name].[ext]"
      }
    }
  ];
}

function getPlugins() {
  return [
    new ExtractTextPlugin("css/dist/bundle.[hash].css"),
    function() {
      this.plugin("done", function(stats) {
        require("fs").writeFileSync(path.join("./bundle.hash.config"), stats.toJson()["hash"]);
      });
    }
  ];
}

module.exports = {
  getLoaders: getLoaders,
  getPlugins: getPlugins
}
