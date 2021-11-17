const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  // watch: true,
  // entry: {
  //   index: './src/index.js'
  // },
  // devtool: 'inline-source-map',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: false,
    port: 9003,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ]
};
