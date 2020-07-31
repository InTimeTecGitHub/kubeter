const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.scss$/,
  use: [{loader: 'style-loader'}, { loader: 'css-loader' }, { loader: 'sass-loader' }],
});
rules.push({
  test: /\.css$/,
  use: [{loader: 'style-loader'}, { loader: 'css-loader' }],
});
rules.push({
  test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
  use: "url-loader?limit=100000"
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.scss', '.css']
  },
};
