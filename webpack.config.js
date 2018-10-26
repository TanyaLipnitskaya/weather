const { join } = require('path');

const devServer = {
  host: '127.0.0.1',
  port: 8080,
  contentBase: 'src'
};

module.exports = {
  entry: {
    index: './src/index.js',
    // но на самом деле нужно делать так:
    // https://www.npmjs.com/package/serviceworker-webpack-plugin
    sw: './src/sw.js',
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  mode: 'development',
  devServer,
};
