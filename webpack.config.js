const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
var pathout = './build/'
var pathentry = './src/index.js'
const nodeModules = fs
  .readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce(
  (modules, module) => Object.assign(modules, { [module]: `commonjs ${module}` }),
  {}
  )

const config = {
  entry: pathentry,
  output: {
    filename: 'index.js',
    path: path.join(process.cwd(), pathout)
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          env: {
            production: {
              presets: ['es2016', 'es2017']
            },
            development: {
              presets: ['latest-minimal']
            }
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  target: 'node',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ],
  externals: nodeModules
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      }
    })
  )
}

module.exports = config
