const path = require('path')
const webpack = require('webpack')

const __PROD__ = process.env.NODE_ENV === 'production'

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: !__PROD__
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: true,
              modules: true,
              minimize: __PROD__,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
            }
          }
        ]
      },
      { 
        test: /\.jpe?g$|\.svg$|\.png$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ]
  .concat(__PROD__ ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ] : []),
  devServer: {
    historyApiFallback: true
  }
}
