const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = (env) => {
  const isProduction = env === 'production'
  let PUBLIC_PATH = 'http://localhost:8080/'
  if (isProduction) {
    PUBLIC_PATH = 'https://elcafedelaplata.net/'
  }

  const config = {
    mode: env,
    entry: {
      app: path.join(__dirname, 'src/app.js'),
      vendors: [
        'moment/moment.js',
      ],
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'assets/js/[name]-[hash].js',
      publicPath: PUBLIC_PATH,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: !isProduction ? 'source-map' : false,
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          exclude: /(node_modules|public)/,
          use: [
            'babel-loader',
            'eslint-loader',
          ],
        }, {
          test: /\.(scss|sass)$/i,
          loaders: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: !isProduction,
                },
              }, {
                loader: 'sass-loader',
                options: {
                  sourceMap: !isProduction,
                  outputStyle: isProduction ? 'compressed' : 'expanded',
                },
              },
            ],
          }),
        }, {
          test: /\.(jpeg|jpg|png|gif|svg)$/i,
          loader: 'file-loader?hash=sha512&digest=hex&publicPath=/&name=assets/img/[hash].[ext]',
        },
        {
          test: /\.(eot|ttf|woff|woff2|otf)$/,
          loader: 'file-loader?hash=sha512&digest=hex&publicPath=/&name=assets/fonts/[hash].[ext]',
        }, {
          test: /\.(json)$/,
          loader: 'json-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin([
        'public',
      ]),
      new HtmlWebpackPlugin({
        template: './src/app.html',
        path: path.join(__dirname, 'public'),
        filename: 'index.html',
        inject: 'body',
      }),
      new ExtractTextPlugin({
        filename: 'assets/css/[hash].css',
        allChunks: true,
      }),
      new CopyWebpackPlugin([
        { context: './src/assets/files', from: '*', to: 'assets/files' },
        { context: './src', from: 'manifest.json' },
        { context: './src', from: 'browserconfig.xml' },
        { context: './src/assets/favicons', from: 'favicon.ico' },
        { context: './src/assets/favicons', from: '*', to: 'assets/favicons' },
      ], {
        copyUnmodified: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
      }),
      new webpack.ProvidePlugin({
        moment: 'moment',
      }),
    ],
  }

  if (isProduction) {
    config.plugins.push(new UglifyJSPlugin())
    config.plugins.push(new SWPrecacheWebpackPlugin({
      cacheId: 'elcafedelaplata-app',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'assets/js/service-worker.js',
      minify: isProduction,
      navigateFallback: `${PUBLIC_PATH}index.html`,
      staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/, /browserconfig\.xml$/],
    }))
  }

  return config
}
