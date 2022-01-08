const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackRTLPlugin = require('webpack-rtl-plugin');
const WebpackRTLPlugin = require('@automattic/webpack-rtl-plugin');
// var HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const ExcludeAssetsPlugin = require('@ianwalter/exclude-assets-plugin')

// for production
require('dotenv').config()
const IS_PROD = (process.env.MODE_ENV == 'production');
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: IS_PROD ? "[name].[contenthash].bundle.min.js" : "[name].[contenthash].bundle.js",
    clean: true
  },
  mode: process.env.MODE_ENV,
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
            presets: ['@babel/preset-env'],
			plugins: ['@babel/plugin-transform-runtime']
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
      template: 'templates/index.html',
      // excludeAssets: [/main.*.css/]
      excludeAssets: [/styles.css/]
    }),
    new ExcludeAssetsPlugin(),
    // new HtmlWebpackTagsPlugin({
    //   tags: ['css/styles.rtl.css'],
    //   append: true
    // }),
    new WebpackRTLPlugin({
      // filename: 'css/styles.rtl.css',
      options: {},
      plugins: [],
      diffOnly: false,
      minify: true,
    }),
  ],
  optimization: {
    minimize: IS_PROD,
    minimizer: [
      new HtmlMinimizerPlugin({ parallel: true }),
      new CssMinimizerPlugin({ parallel: true }),
      new TerserPlugin({
        parallel: true,
        extractComments: false
      }),
    ],
  },
};