# 💛 Babel Loader para JavaScript

Babel te permite hacer que tu código JavaScript sea compatible con todos los navegadores
Debes agregar a tu proyecto las siguientes dependencias
NPM


npm install -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime
Yarn


yarn add -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime
babel-loader nos permite usar babel con webpack
@babel/core es babel en general
@babel/preset-env trae y te permite usar las ultimas características de JavaScript
@babel/plugin-transform-runtime te permite trabajar con todo el tema de asincronismo como ser async y await
Debes crear el archivo de configuración de babel el cual tiene como nombre .babelrc

{
  "presets": [
    "@babel/preset-env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}
Para comenzar a utilizar webpack debemos agregar la siguiente configuración en webpack.config.js

{
...,
module: {
    rules: [
      {
        // Test declara que extensión de archivos aplicara el loader
        test: /\.js$/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader"
        },
        // Exclude permite omitir archivos o carpetas especificas
        exclude: /node_modules/
      }
    ]
  }
}
RESUMEN: Babel te ayuda a transpilar el código JavaScript, a un resultado el cual todos los navegadores lo puedan entender y ejecutar. Trae "extensiones" o plugins las cuales nos permiten tener características más allá del JavaScript común


## 📘 Loaders para CSS y preprocesadores de CSS

Ideas/conceptos claves
Un preprocesador CSS es un programa que te permite generar CSS a partir de la syntax única del preprocesador. Existen varios preprocesadores CSS de los cuales escoger, sin embargo, la mayoría de preprocesadores CSS añadirán algunas características que no existen en CSS puro, como variable, mixins, selectores anidados, entre otros. Estas características hacen la estructura de CSS más legible y fácil de mantener.

post procesadores son herramientas que procesan el CSS y lo transforman en una nueva hoja de CSS que le permiten optimizar y automatizar los estilos para los navegadores actuales.

Apuntes
Para dar soporte a CSS en webpack debes instalar los siguientes paquetes
Con npm


npm i mini-css-extract-plugin css-loader -D
Con yarn


yarn add mini-css-extract-plugin css-loader -D
css-loader ⇒ Loader para reconocer CSS
mini-css-extract-plugin ⇒ Extrae el CSS en archivos
Para comenzar debemos agregar las configuraciones de webpack

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	...,
	module: {
    rules: [
      {
        test: /\.(css|styl)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      }
    ]
  },
  plugins: [
		...
    new MiniCssExtractPlugin(),
  ]
}
Si deseamos posteriormente podemos agregar herramientas poderosas de CSS como ser:
pre procesadores
Sass
Less
Stylus
post procesadores
Post CSS
RESUMEN: Puedes dar soporte a CSS en webpack mediante loaders y plugins, además que puedes dar superpoderes al mismo con las nuevas herramientas conocidas como pre procesadores y post procesadores