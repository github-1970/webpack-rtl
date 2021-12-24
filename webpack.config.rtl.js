const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackRTLPlugin = require('webpack-rtl-plugin');
const WebpackRTLPlugin = require('@automattic/webpack-rtl-plugin');
var HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
// var HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const ExcludeAssetsPlugin = require('@ianwalter/exclude-assets-plugin')

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],

      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]'
        }
      },
      {
        test: /\.(mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'video/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
      // excludeAssets: [/main.*.css/]
      excludeAssets: [/styles.css/]
    }),
    new ExcludeAssetsPlugin(),
    new HtmlWebpackTagsPlugin({
      tags: ['css/styles.rtl.css'],
      append: true
    }),
    new WebpackRTLPlugin({
      // filename: 'css/styles.rtl.css',
      options: {},
      plugins: [],
      diffOnly: false,
      minify: true,
    }),
  ],
};