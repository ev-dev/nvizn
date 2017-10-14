const path = require('path')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, 'src', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'bower_components')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['react-app']
        }
      }, 
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, 
      {
        test: /\.(svg|ttf|eot|eof|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', '.scss', '*']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/public/')
  },
  plugins: isDev 
    ? [new LiveReloadPlugin({ appendScriptTag: true })]
    : []
}