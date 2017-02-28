var path = require('path');
var webpack = require('webpack');

var envFile = require('node-env-file');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('stylesheets/[name].css');
// const extractLESS = new ExtractTextPlugin('stylesheets/[name].less');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {
    // here because in production, config folder will not exist
}

// const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    // path: path.resolve(__dirname),
    path: path.join(__dirname, 'dist'),
    // publicPath: 'build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015', 'stage-1']
            },
        },
        // {test:/\.css$/, use: ['style-loader','css-loader']},
        // {test:/\.scss$/, use: ['style-loader','css-loader','sass-loader']},
        // {test:/\.less$/, use: ['style-loader','css-loader','less-loader']},
        // // {test:/\.gif$/, use: ['url-loader?mimetype-image/png']},
        {test:/\.(jpe?g|png|gif|svg)$/, use:[
            {loader:'url-loader', options:{limit:40000}},
            'image-webpack-loader'
        ]},
        {test:/\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, use: 'url-loader?mimetype-application/font-woff'},
        {test:/\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: 'file-loader?name=[name].[ext]'},
        {
            test: /\.s?css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //resolve-url-loader may be chained before sass-loader if necessary
                use: ['css-loader', 'less-loader']
            })
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
        new ExtractTextPlugin({ filename: './style.css'})
    ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // sassLoader: {
  //   includePaths: [
  //     path.resolve(__dirname, './node_modules/foundation-sites/scss')
  //   ]
  // },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
