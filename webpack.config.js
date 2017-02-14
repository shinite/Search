var path = require('path');
var webpack = require('webpack');

     
 module.exports = {
     entry:  [
    'script!jquery/dist/jquery.min.js',
    './js/app.js'
],
     output: {
         path: __dirname,
    filename: './public/bundle.js'
     },
      externals:{
    jquery:'jQuery'
  },
  plugins:[
    new webpack.ProvidePlugin({
      '$':'jquery',
      'jQuery':'jquery'
    })
  ],
   resolve: {
    root: __dirname,
    alias:{
      SearchBox:'js/components/SearchBox.js',
      SearchResult:'js/components/SearchResult.js',
      ChildSearchResult:'js/components/ChildSearchResult.js',
      applicationStyles: 'styles/app.css',
    },
    extensions: ['', '.js', '.jsx']
  },  
     module: {
         loaders: [
             {
                 test: /\.js$/,
                  exclude: /node_modules/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }


             },
             {
              test: /\.css$/,
              loader: 'style-loader'
            }, {
              test: /\.css$/,
              loader: 'css-loader',
              query: {
                modules: true,  
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }



         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };