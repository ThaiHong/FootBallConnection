// var ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log("ENVIROMENT IS: " + process.env.NODE_ENV);
var webpack = require("webpack");
var path = require('path');
var isProd = (process.env.NODE_ENV === 'production');

var output = {
    filename: 'bundle.js',
    publicPath: '/static/'
};

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
    var plugins = [];
    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.

    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }));
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    // Conditionally add plugins for Development
    else {
        plugins.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"dev"'
        }));
    }

    return plugins;
}

if(isProd) {
    output.path = path.resolve(__dirname, '../target/classes/static');
} else {
    output.path = path.resolve(__dirname, 'build');
}

webpackConfig = {
    entry: path.resolve(__dirname, './app/boot.js'),
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/,
            include: __dirname
        }
        ]
    },
    resolve: {
        root: [path.resolve(__dirname, 'node_modules')],
        extensions: ['', '.js']
    },
    devServer: {
        historyApiFallback: true
    }
};

webpackConfig.output = output;

webpackConfig.plugins = getPlugins();

module.exports = webpackConfig;
