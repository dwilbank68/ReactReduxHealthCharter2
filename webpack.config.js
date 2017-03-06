var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    'react', 'lodash', 'redux', 'react-redux', 'react-dom',
    'redux-form', 'redux-thunk'
];

// var envFile = require('node-env-file');
//
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
//
//
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
//
// try {
//     envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
// } catch (e) {
//     // here because in production, config folder will not exist
// }

// const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        // path: path.resolve(__dirname),
        path: path.join(__dirname, 'dist'),
        // publicPath: 'build/',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
                // query: {
                //     presets: ['react', 'es2015', 'stage-1']
                // },
            },
            // {test:/\.css$/, use: ['style-loader','css-loader']},
            // {test:/\.scss$/, use: ['style-loader','css-loader','sass-loader']},
            // {test:/\.less$/, use: ['style-loader','css-loader','less-loader']},
            // {test:/\.gif$/, use: ['url-loader?mimetype-image/png']},
            {
                test:/\.(jpe?g|png|gif|svg)$/,
                use:[
                    {loader:'url-loader', options:{limit:40000}},
                    'image-webpack-loader'
                ]
            },
            {test:/\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, use: 'url-loader?mimetype-application/font-woff'},
            {test:/\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: 'file-loader?name=[name].[ext]'},
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
            // {
            //     loader: ExtractTextPlugin.extract({
            //         loader: ['css-loader', 'less-loader']
            //     }),
            //     test: /\.less$/
            // }
            // {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=public/fonts/[name].[ext]'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                X_APP_ID: JSON.stringify(process.env.X_APP_ID),
                X_APP_KEY: JSON.stringify(process.env.X_APP_KEY)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.optimize.UglifyJsPlugin(),          // production only
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
};
