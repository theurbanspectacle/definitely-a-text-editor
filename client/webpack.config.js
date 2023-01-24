const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      // The app won't load without this simple option. Webpack 5 issue: https://github.com/jantimon/html-webpack-plugin/issues/1588
      publicPath: '',
    },
    plugins: [
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: './src-sw.js',
      }),
      new HtmlWebpackPlugin({
        title: 'D.A.T.E - Definitely a text editor',
        template: './index.html',
      }),
      new WebpackPwaManifest({
        name: 'D.A.T.E. PWA',
        short_name: 'date',
        description: 'D.A.T.E. Text editor',
        background_color: '#ffffff',
        inject: true,
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        fingerprints: false,
        start_url: '/',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            size: '500x500',
          },
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  };
};
