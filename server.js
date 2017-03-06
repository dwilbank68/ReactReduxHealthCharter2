var express = require('express');
var path = require('path');
// var compression = require('compression');

var app = express();

// server routes must be here, above the catch-all route...

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config');
    app.use(
        webpackMiddleware(
            webpack(webpackConfig)
        )
    );

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'src', 'index.html'));
    });


} else {
    app.use(express.static('dist'));
    // send all requests to index.html so browserHistory in React Router works
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
}



// app.use(compression());

// serve our static stuff like index.css
// app.use(express.static(path.join(__dirname, 'public')));

// send all requests to index.html so browserHistory in React Router works
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })

var PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
    console.log('Listening at:' + PORT)
})