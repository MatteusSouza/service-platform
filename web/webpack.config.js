const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  // console.log(env.DEV_ENV);
  // console.log(argv.mode);

  switch(env.DEV_ENV) {
    case 'production':
        env.URL = 'http://localhost';
        env.PORT = 8080;
        break;
    case 'development':
      env.URL = 'http://localhost';
      env.PORT = '8080';
      break;
    case 'test':
        env.URL = 'http://localhost';
        env.PORT = '3001'
        break;
}
  return {
    entry: './src/app.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode:'production',
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html', // Caminho para o novo arquivo HTML
        template: './public/index.html', // Caminho para o template HTML
      }),
      new webpack.DefinePlugin({
        DEV_ENV: JSON.stringify(env.DEV_ENV),
        URL: JSON.stringify(env.URL),
        PORT: JSON.stringify(env.PORT),
        // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
}