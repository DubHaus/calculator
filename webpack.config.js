const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractLoader = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  let config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if(isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  }
  return config;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractLoader({
      filename: 'style.css'
    })
  ],
  optimization : optimization(),
  devServer: {
    port: 4020,
    hot: isDev
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: MiniCssExtractLoader.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          }
        },
        'css-loader']
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      loader: ['file-loader']
    }]
  }
}