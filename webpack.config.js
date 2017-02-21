var path = require('path');
var webpack = require('webpack');

var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {
    // here because in production, config folder will not exist
}

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname),
    publicPath: 'build/',
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
        {test:/\.css$/, use: ['style-loader','css-loader']},
        {test:/\.scss$/, use: ['style-loader','css-loader','sass-loader']},
        {test:/\.less$/, use: ['style-loader','css-loader','less-loader']},
        // {test:/\.gif$/, use: ['url-loader?mimetype-image/png']},
        {test:/\.(jpe?g|png|gif|svg)$/, use:[
            {loader:'url-loader', options:{limit:40000}},
            'image-webpack-loader'
        ]},
        {test:/\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, use: 'url-loader?mimetype-application/font-woff'},
        {test:/\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: 'file-loader?name=[name].[ext]'}
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
        })
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
