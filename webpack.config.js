import webpack from 'webpack'
import path from 'path'

const config = env => ({
  entry: path.join(__dirname, 'src', 'app', 'index'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'source-map',
  resolve: {
    extensions: [ '.jsx', '.js', '.json' ],
    alias: {
      '~': __dirname
    }
  },
  devServer: devServer(env),
  module: {
    rules: [{
      test: /jsx?$/,
      include: path.join(__dirname, 'src', 'app'),
      exclude: /node_modules/,
      use: babel(env)
    }, 
    {
      test: /\.(jpeg|jpg|png)$/,
      use: 'url-loader'
    },
    {
      test: /\.(css|scss|sass)$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  }
})

export default config(process.env)