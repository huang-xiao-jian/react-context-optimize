/**
 * @description - webpack development configuration
 * @author - huang.jian
 */

// packages
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InjectExternalPlugin = require('@coco-platform/webpack-plugin-inject-external');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    main: path.resolve(process.cwd(), './src/main.tsx'),
  },
  output: {
    path: path.resolve(process.cwd(), 'dist', 'client'),
    publicPath: '/',
    filename: 'static/script/[name].bundle.js',
    chunkFilename: 'static/script/[id]_[name].chunk.js',
    crossOriginLoading: 'anonymous',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.mjs', '.json', '.ts', '.tsx'],
    alias: {
      // resolve antd icons too big issue
      '@ant-design/icons/lib/dist$': path.resolve('./src/antd-icons.ts'),
    },
  },
  module: {
    noParse: [/\.min\.js/],
    rules: [
      {
        test: /\.(js|jsx|mjs|mjsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), 'src'),
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.p?css$/,
        exclude: /node_modules/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(process.cwd(), 'src'),
          path.resolve(process.cwd(), 'public'),
        ],
        use: [
          { loader: require.resolve('style-loader') },
          { loader: require.resolve('css-loader') },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|bmp|mp3|woff|woff2|ttf|eot|svg)(\?.*)?$/,
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
    new webpack.ContextReplacementPlugin(/moment\/locale$/, /zh-cn/),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(process.cwd(), 'public', 'index.html'),
      favicon: path.join(process.cwd(), 'public', 'favicon.ico'),
    }),
    new InjectExternalPlugin({
      env: 'development',
      definition: 'bootcdn.stable.yml',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      openAnalyzer: false,
      reportFilename: '../analyzer/index.html',
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },
  devtool: 'cheap-module-source-map',
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    crypto: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: [
      {
        context: ['/data_analyze'],
        target: 'https://github.com',
        changeOrigin: true,
        secure: false,
      },
    ],
  },
};
