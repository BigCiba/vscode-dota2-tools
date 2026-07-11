//@ts-check

'use strict';

const path = require('path');
const webpack = require('webpack');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: './src/extension.ts', // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            // Unique instance so it does not share state with the webview bundle's loader.
            options: { instance: 'extension' }
          }
        ]
      }
    ]
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};

// React webview bundle for the unified sidebar (the "API" tab). Runs in the webview
// (browser context), reuses the ModDota site's API components, and imports the API
// data directly from the sibling @moddota/dota-data repo via a resolve alias.
/** @type WebpackConfig */
const webviewConfig = {
  target: 'web',
  mode: 'none',
  // Minify the bundle so the webview reloads/parses it faster when switching back to the
  // API tab (cuts the ~3.6 MB dev bundle to roughly a third), reducing tab-switch lag.
  optimization: {
    minimize: true,
  },

  entry: './src/webview-api/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'sidebar.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      // The site's data scope files import from "@moddota/dota-data/...". Point that
      // at the local sibling build (files/ + lib/) so current local data is bundled.
      '@moddota/dota-data': path.resolve(__dirname, '../../dota/dota-data'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              // Distinct instance so this transpile-only config does not collide with the
              // extension bundle's ts-loader (which type-checks against the strict root tsconfig).
              instance: 'webviewSidebar',
              configFile: path.resolve(__dirname, 'tsconfig.webview.json'),
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // React and its deps read process.env.NODE_ENV; webpack mode 'none' does not define it,
    // so without this the bundle throws "process is not defined" in the webview (blank page).
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log",
  },
};

module.exports = [extensionConfig, webviewConfig];
