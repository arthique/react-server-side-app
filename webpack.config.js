const path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
    new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [];
var clientLoaders = isProduction ? productionPluginDefine.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, sourceMap: false })
]) : [];

var commonLoaders = [
    {
        test: /\.json$/,
        loader: 'json-loader'
    }
];

module.exports = [
    {
        entry: path.join(__dirname,'./src/server.js'),
        output: {
            path: path.join(__dirname,'./dist'),
            filename: 'server.js',
            libraryTarget: 'commonjs2',
            publicPath: '/'
        },
        target: 'node',
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: false,
            __dirname: false
        },
        externals: nodeExternals(),
        plugins: productionPluginDefine,
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    loader: 'css-loader/locals'
                },
                {
                    test: /\.(ttf|eot|otf|svg|png)$/,
                    loader: 'file-loader?emitFile=false'
                },
                {
                    test: /\.(woff|woff2)$/,
                    loader: 'url-loader?emitFile=false'
                }
            ].concat(commonLoaders)
        }
    },
    {
        entry: path.join(__dirname, './src/app/browser.js'),
        output: {
            path: path.join(__dirname, './dist/assets'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        plugins: clientLoaders.concat([
            new ExtractTextPlugin('styles.css', {
                allChunks: true
            })
        ]),
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('css-loader!sass-loader')
                }
                ,
                {
                    test: /\.(ttf|eot|otf|svg|png)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2)$/,
                    loader: 'url-loader'
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss']
        }
    }
];