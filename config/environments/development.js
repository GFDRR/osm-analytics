'use strict'

const path = require('path')

const indexPath = path.join(process.cwd(), 'static/index.html')

module.exports = function(app) {
  // Webpack middleware
  const webpack = require('webpack')
  const webpackMiddleware = require('webpack-dev-middleware')
  const config = require('../webpack.config.js')

  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.get('*', (req, res) => {
    res.write(middleware.fileSystem.readFileSync(indexPath))
    res.end()
  })
}
