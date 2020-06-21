// Modulo de nodeJS para manejar rutas
const path = require("path");

// Modulo que se encarga de procesar el html
const HTMLWebpackPlugin = require("html-webpack-plugin");

// Modulo que se encarga de procesar el html
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Encargado de la configuración de las entradas, salidas, el modo de desarrollo, loaders, plugins, etc...
const webpackInitConfig = {
  // Entorno de desarrollo
  mode: "development",

  // Herramineta devtool para debug
  devtool: "inline-source-map",

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
          // { loader: "style-loader", options: { sourceMap: true } },
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
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
  ],
};

module.exports = webpackInitConfig;
