const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
//devtool: "source-map",
module.exports = merge(common, {
  mode: "development",
  watch: true,
  externals: [nodeExternals({ allowlist: ["webpack/hot/poll?1000"] })],
  plugins: [new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
});
