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
      './src/index.js'
    ],
    mode,
    output: {
      path: path.resolve(__dirname, 'dist'),
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
          loader: 'babel-loader',
          exclude: /node_modules/
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
    devtool: prod ? false : 'source-map',
    devServer: {
      port: 4200,
      open: true,
      static: {
        directory: './dist'
      },
      compress: true,
      historyApiFallback: {
        index: 'index.html'
      },
    },
    resolve: {
      extensions: [
        '.tsx',
        '.ts',
        '.js',
        '.jsx',
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'reactShell',
        remotes: {
          preactMfe: 'preactMfe@http://localhost:4201/remoteEntry.js',
          vueMfe: 'vueMfe@http://localhost:4202/remoteEntry.js',
          solidMfe: 'solidMfe@http://localhost:4203/remoteEntry.js',
        },
        shared: {
          react: {eager: true},
          'react-dom': {eager: true},
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
    optimization: {
      minimize: prod,
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
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
