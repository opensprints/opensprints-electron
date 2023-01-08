import webpack from 'webpack';
// import ExtractTextPlugin from 'extract-text-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const config = merge(baseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    './app/index'
  ],

  output: {
    publicPath: '../dist/'
  },

  module: {
    rules: [
      {
        test: /\.global\.css$/,
        loader: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]

      },

      {
        test: /^((?!\.global).)*\.css$/,
        loader: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            }
          ]

      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true
      }
    }),
    // new ExtractTextPlugin({
    //   filename: 'style.css',
    //   allChunks: true })
  ],

  target: 'electron-renderer'
});

export default config;
