'use strict';

/**
 * Default test configuration.
 */
const WebpackBaseConfig = require('./Base');
const webpack = require('webpack');

class WebpackTestConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      devtool: 'inline-source-map',
      externals: {
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true,
        'react/lib/ReactContext': true,
      },
      module: {
        preLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'isparta-instrumenter-loader',
            include: [
              this.srcPathAbsolute
            ]
          }
        ],
        loaders: [
          {
            test: /\.css$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]'
            ]
          },
          {
            test: /\.sass$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
              'sass'
            ]
          },
          {
            test: /\.scss$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
              'sass'
            ]
          },
          {
            test: /\.less$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
              'less'
            ]
          },
          {
            test: /\.styl$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]-[local]-[hash:base64:5]',
              'stylus'
            ]
          },
          {
            test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
            loader: 'null-loader'
          },
          {
            test: /\.json$/,
            loader: 'json'
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            query: {
              presets: ['airbnb']
            },
            include: [].concat(
              this.includedPackages,
              [
                this.srcPathAbsolute,
                this.testPathAbsolute
              ]
            )
          }
        ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('test'),
            APP_ENV: JSON.stringify('test'),
            ADD_DEV_ROUTES: JSON.stringify(false),
            ADD_LOGGER_MW: JSON.stringify(false),
            ADD_REDUX_DEV_TOOLS: JSON.stringify(false),
            SHOW_ENV_NOTICE: JSON.stringify(false),
            MOCK_API: JSON.stringify(false),
            USE_AUTH_TOKEN: JSON.stringify(true),
            HEADER_AUTH_TOKEN: JSON.stringify('Token 159fee651c44f38dde1592bf5df323a4a6c0c2eb'),
            ADD_CSRF_TOKEN_FROM_COOKIE: JSON.stringify(false)
          }
        })
      ]
    };
  }

  /**
   * Set the config data.
   * Will remove the devServer config value as we do not need it in test environments
   * This function will always return a new config
   * @param {Object} data Keys to assign
   * @return {Object}
   */
  set config(data) {

    const baseSettings = this.defaultSettings;
    delete baseSettings.devServer;
    this._config = Object.assign({}, baseSettings, data);
    return this._config;
  }

  /**
   * Get the global config
   * @param {Object} config Final webpack config
   */
  get config() {
    return super.config;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'test';
  }
}

module.exports = WebpackTestConfig;
