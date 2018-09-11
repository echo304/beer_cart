var webpack = require('webpack');
var path = require('path');

// variables
var isProduction = process.argv.indexOf('-p') >= 0;
var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [
      './src/index.tsx'
    ]
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      app: path.resolve(__dirname, 'src/app/')
    }
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: ['react-hot-loader/babel'],
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: isProduction ? 'tsconfig.json' : 'tsconfig.dev.json'
            }
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS
        ]
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' }
    ]
  },
  optimization: {
    splitChunks: {
      name: true,
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: -10
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
};