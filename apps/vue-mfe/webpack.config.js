const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;


const config = (env, argv) => {
  const mode = argv.mode;
  const prod = mode === 'production';
  const assetsDir = 'assets';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: `${assetsDir}/[contenthash][ext]`,
      clean: true,
    },
    mode,
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          // options: {
          //   compilerOptions: {
          //     isCustomElement: tag => tag.startsWith('lit-')
          //   }
          // }
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css$/i,
          use: [
            'vue-style-loader',
            "style-loader",
            "css-loader"
          ],
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'stylus-loader'
          ]
        },
        {
          test: /\.ts(x)?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [
              /\.vue$/
            ]
          }
        },
        {
          test: /\.svg$/,
          type: 'asset/inline',
        },
        {
          test: /\.(png|jpeg|jpg|webp)$/,
          type: 'asset/resource',
          generator: {
            filename: `${assetsDir}/images/[contenthash][ext]`
          },
        },
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.vue',
        '.tsx',
        '.ts'
      ]
    },
    devtool: prod ? false : 'source-map',
    devServer: {
      port: 4202,
      open: true,
      static: {
        directory: './dist'
      },
      compress: true,
      historyApiFallback: {
        index: 'index.html'
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
      }),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: prod ? "[name].[contenthash].css" : "[name].[fullhash].css",
      }),
      new ModuleFederationPlugin({
        name: 'vueMfe',
        filename: "remoteEntry.js",
        exposes: {
          './vueMfe': './src/main.js',
        },
        shared: {
          vue: {eager: true, singleton: true},
          vuex: {eager: true, singleton: true},
          'vue-router': {eager: true, singleton: true},
        }
      }),
    ],
  };

};

module.exports = (env, argv) => {
  const result = config(env, argv);
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    result.output.filename = '[name].[fullhash].js';
  }
  return result;
};
