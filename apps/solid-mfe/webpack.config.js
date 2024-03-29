const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const postcss = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        ["postcss-preset-env"],
      ],
    },
  },
}

const cssModules = {
  loader: 'css-loader',
  options: {
    esModule: true,
  }
}

const config = (env, argv) => {
  const mode = argv.mode;
  const prod = mode === 'production';
  const assetsDir = 'assets';


  return {
    entry: [
      './src/index.tsx'
    ],
    mode,
    output: {
      path: path.resolve(__dirname, '../../dist/solid-mfe'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: `${assetsDir}/[contenthash][ext]`,
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.ts(x)?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            postcss,
          ],
          exclude: /\.module\.css$/
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            cssModules,
            postcss,
          ],
          include: /\.module\.css$/
        },
        {
          test: /\.styl$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'stylus-loader',
            postcss,
          ],
          exclude: /\.module\.styl$/
        },
        {
          test: /\.styl$/,
          use: [
            'style-loader',
            cssModules,
            'stylus-loader',
            postcss,
          ],
          include: /\.module\.styl$/
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            postcss,
          ],
          exclude: /\.module\.scss$/
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            cssModules,
            'sass-loader',
            postcss,
          ],
          include: /\.module\.scss$/
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
        }
      ]
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js',
        '.jsx'
      ],
    },
    devtool: prod ? false : 'source-map',
    devServer: {
      port: 4203,
      open: true,
      static: {
        directory: './dist/solid-mfe'
      },
      compress: true,
      historyApiFallback: {
        index: 'index.html'
      },
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'solidMfe',
        filename: "remoteEntry.js",
        exposes: {
          './solidMfe': './src/main.tsx',
        },
        shared: {
          "solid-js": {eager: true, requiredVersion: '1.6.8', strictVersion: true, singleton: true },
          "solid-app-router": {eager: true, requiredVersion: '0.4.2', strictVersion: true, singleton: true },
        }
      }),
      new HtmlWebpackPlugin({
        templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
        filename: 'index.html',
      }),
      new MiniCssExtractPlugin({
        filename: prod ? "[name].[contenthash].css" : "[name].[fullhash].css",
      }),
    ],
  }
};

module.exports = (env, argv) => {
  const result = config(env, argv);
  if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    result.output.filename = '[name].[fullhash].js';
  }
  return result;
};
