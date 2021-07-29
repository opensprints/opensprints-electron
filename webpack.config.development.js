/* eslint max-len: 0 */
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

const port = process.env.PORT || 3000;

export default merge(baseConfig, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  entry: [
    `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`,
    'babel-polyfill',
    'react-hot-loader/patch',
    './app/index'
  ],

  output: {
    publicPath: `http://localhost:${port}/dist/`
  },

  module: {
    rules: [
      {
        test: /\.global\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap' }
        ]
      },

      {
        test: /^((?!\.global).)*\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' }
        ]
      }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/canvas$/),
    new webpack.IgnorePlugin(/jsdom$/),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  target: 'electron-renderer'
});
