const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const fs = require("fs");
let nodeModules = {};
fs.readdirSync("node_modules").forEach(function(module) {
  if (module !== ".bin") nodeModules[module] = "commonjs " + module;
});

module.exports = [
  {
    name: "browser",
    entry: path.join(__dirname, "src/client/index.js"),
    output: {
      path: path.join(__dirname, "dist/public/"),
      filename: "build.js"
    },
    module: {
      loaders: [
        {
          test: /.js$/,
          loader: "babel-loader",
          include: path.resolve(__dirname, "src")
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, "src"),
          loader: ExtractTextPlugin.extract([
            "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
            "sass-loader"
          ])
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({ filename: "style.css", allChunks: true }),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]
  }
];
