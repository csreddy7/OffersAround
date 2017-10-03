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
