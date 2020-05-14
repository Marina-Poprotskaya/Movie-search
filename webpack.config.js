const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = (env, options) => {
  const isProduction = options.mode === 'production'

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: [ './src/index.js', './scss/style.scss'],
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'script.js',
    },
   
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            },
          }
        },
      
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
        }, {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
            }
          ]
        }, {

          test: /\.html$/,
          loader: 'html-loader',

        }, {
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [{
            loader: 'file-loader',
            options: {
              outputPath: './fonts/Bangers/'
            }
          }]
        },
      ]
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        favicon: './img/favicon.ico'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new CopyWebpackPlugin([
        { from: './img/', to: './img' },
      ]),
    ]
  }
  return config;
}