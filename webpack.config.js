const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
    //devtool: 'cheap-source-map',  vtool: "cheap-module-source-map", // 生产环境推荐,
    context: __dirname + '/src',
    entry: './index.js',
    devServer: {
        historyApiFallback: true,
        port: 8081
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude:/(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs']   //添加组件的插件配置
            }
        },
        {
            test:/\.css$/,
            // loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' //本地化使用
            loader: 'style-loader!css-loader!autoprefixer-loader'
        },
        {
            test:/\.scss$/,
            loader: ['style-loader', 'css-loader', 'autoprefixer-loader', 'sass-loader']
        },
        {
            test:/\.json$/,
            loader: 'json-loader'
        },
        {
            test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=8192'
        }
        // ,
        //  {
        //     test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|mp3)(\?|$)/,
        //     exclude: /node_modules/,
        //     loader: 'file-loader?name=[name].[ext]',
        // }
        // ,
        // {
        //     test:/\.less$/,
        //     loader: 'style-loader!css-loader!less-loader'
        // }
        ]
    },
        plugins: [       
            new webpack.optimize.UglifyJsPlugin(),          
            new HtmlWebpackPlugin({
                template: 'index.html'
            })
        ]
};

module.exports = config;