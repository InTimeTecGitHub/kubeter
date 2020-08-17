module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.scss$/,
    use: [{loader: 'style-loader'}, { loader: 'css-loader' }, { loader: 'sass-loader' }],
  },
  {
    test: /\.css$/,
    use: [{loader: 'style-loader'}, { loader: 'css-loader' }],
  },
  {
    test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
    use: "url-loader?limit=100000"
  }
];
