const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    './index/index': './src/scripts/index.js',
  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, 'src/images/'),
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: { loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [(isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          }),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              }
            },
            'postcss-loader',
          ]
        },
        {
          test: /\.(png|jpg|gif|ico|svg)$/i,
          use: [
            'file-loader?name=./images/[name].[ext]',
            {
              loader: 'image-webpack-loader',
              options: {
                outputPath: 'images',
                esModule: false,
             },
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: 'file-loader?name=./vendor/[name].[ext]'
        },
      ]
    },
  plugins: [ 
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),

    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      chunks: ['./index/index'],
      filename: 'index.html'
    }),
    
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};