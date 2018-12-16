const { join } = require('path');

const devServer = {
  host: '127.0.0.1',
  port: 8080,
  contentBase: 'src'
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/',
  },
  mode: 'development',
  devServer,
};
