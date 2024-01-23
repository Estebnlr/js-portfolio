const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        // test: /\.(woff|woff2)$/,
        // use: {
        //   loader: "url-loader",
        //   options: {
        //     // limit => limite de tamaño
        //     limit: 10000,
        //     // Mimetype => tipo de dato
        //     mimetype: "application/font-woff",
        //     // name => nombre de salida
        //     name: "[name].[contenthash].[ext]",
        //     // outputPath => donde se va a guardar en la carpeta final
        //     outputPath: "./assets/fonts/",
        //     publicPath: "../assets/fonts/",
        //     esModule: false,
        //   },
        // }

        // 💡Solución fuentesSi las fuentes aparecen en la carpeta images en dist y el navegador no lo reconoce no es porque algo en el código esté mal, me tomó un buen rato revisarlo, no pierdan el tiempo, es un problema que da el cambio de versiones en Webpack y en css-loader. La solución a esto la dió Luc en una respuesta en Loaders de este curso, no es necesario cambiar versiones solo modificar el código y cambiar :
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[hash][ext]",
        },
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(),
    new CleanWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  }
}