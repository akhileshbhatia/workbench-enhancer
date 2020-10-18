const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.tsx'),
    background: path.join(__dirname, 'src/background.ts')
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx$/,
        use: 'ts-loader'
      },
      {
        exclude: /node_modules/,
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}
