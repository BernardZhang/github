const path = require('path');

module.exports = {
    mode: 'development',
    // watch: true,
    // entry: {
    //   index: './src/index.js'
    // },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000
    },
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
          }
        ]
    }
};
