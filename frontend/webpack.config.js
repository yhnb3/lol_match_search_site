const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]'
            }
          },
        ],
      },
    ],
  },
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    historyApiFallback: true,
    compress: true,
    host:"0.0.0.0",
    port: 8080,
    hot: true,
    proxy: {
      '/api':{
        target: {
          host: "172.0.0.1",
          protocol: 'http:',
          port: 8000
        },
        changeOrigin:true,
        secure: false,
      }
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
};