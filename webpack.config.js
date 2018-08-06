var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: './index.js',
  output: {
    filename: './build/build.js'
  },
  devtool: 'source-map',
  // plugins: [
    // new webpack.optimize.UglifyJsPlugin({minimize: false})
  // ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve('./src/resources'),
      path.resolve('./src')
    ]
  }
}
