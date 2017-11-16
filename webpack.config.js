var path = require("path");
module.exports = {
  entry: './app_modules/main/OffersAround.js',
  output: {
    filename: './build/build.js'
  },
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
      path.resolve('./resources'),
      path.resolve('./app_modules')
    ]
  }
}
