var precss = require('precss')
var rucksack = require('rucksack-css')
var webpack = require('webpack')
var path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootPath = process.cwd()
const envVariables = process.env

const webpackConfig = {
  entry: [
    path.join(rootPath, 'app/index.js')
  ],
  output: {
    path: path.join(rootPath, 'static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        include: /app/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules|libs/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader?name=assets/[name].[ext]'
      },
      {
        test: /\.(json)$/,
        loader: 'json-loader'
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: [
    precss(),
    rucksack({
      autoprefixer: true
    })
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.DefinePlugin({
      'global.GENTLY': false // https://github.com/visionmedia/superagent/wiki/Superagent-for-Webpack
    }),
    //new ExtractTextPlugin("style.css")
  ],
  devServer: {
    contentBase: './static',
    hot: true
  }
}

if (envVariables.NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      dead_code: true,
      drop_debugger: true,
      drop_console: true
    },
    comments: false
  }))
  webpackConfig.devtool = 'source-map'
} else {
  webpackConfig.devtool = 'eval-source-map'
}

module.exports = webpackConfig
