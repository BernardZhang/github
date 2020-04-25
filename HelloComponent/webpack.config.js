const webpack = require('webpack');
const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    devtool: 'source-map',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        // filename: 'hellocompoent.js'
    },
    optimization: {
        usedExports: true,
        minimize: false,
        sideEffects: false
    },
    // externals: ['react', 'react-dom', /^antd\//],
    externals: ['react', 'react-dom', 'antd', 'lodash'],
    // externals: {
    //     lodash: {
    //         commonjs: 'lodash',
    //         commonjs2: 'lodash',
    //         amd: 'lodash',
    //         root: '_'
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            modules: false,
                            javascriptEnabled: true,
                            // modifyVars: {
                            // 	hack: `true; @import "~@/styles/base/variables.less";`
                            // }
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
