// Modulo de nodeJS para manejar rutas
const path = require("path");

// Plugin que se encarga de procesar el html
const HTMLWebpackPlugin = require("html-webpack-plugin");

// Plugin que se encarga de procesar el html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Plugin para optimizar el codigo css en producción
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// Encargado de la configuración de las entradas, salidas, el modo de desarrollo, loaders, plugins, etc...
const webpackInitConfig = {
  // Entorno de desarrollo
  mode: "production",

  // Herramineta devtool para debug
  devtool: "none",

  // Forma de resolver los modulos
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
  },

  // Configuraciones de entrada
  entry: {
    app: ["@babel/polyfill", "./src/js/index.js"],
  },

  // Configuraciones de salida
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },

  // Configuraciones de loaders (babel, typescript, css, sass, files (images))
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_module|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // { loader: "style-loader"},
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img",
              // publicPath: 'images/',
            },
          },
        ],
      },
    ],
  },

  // Configuraciones de plugins
  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css",
    }),
    new OptimizeCssAssetsPlugin(),
  ],
};

module.exports = webpackInitConfig;
