const webpack = require('webpack');
const metadata = [
  "// ==UserScript==",
  "// @name        Trakt.tv Watch Now Alternative",
  "// @namespace   https://github.com/sergeyhist/trakt-watch-now-alternative/blob/main/trakt-watch-now-next.user.js",
  "// @match       *://trakt.tv/*",
  "// @version     4.6.3",
  "// @author      Hist",
  "// @description Alternative version for trakt.tv watch now modal",
  "// @run-at      document-start",
  "// @downloadURL https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js",
  "// @updateURL   https://github.com/sergeyhist/trakt-watch-now-alternative/raw/main/trakt-watch-now-next.user.js",
  "// @homepageURL https://github.com/sergeyhist/trakt-watch-now-alternative",
  "// ==/UserScript==",
  ""
];

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'trakt-watch-now-next.user.js'
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: metadata.join('\n'),
      raw: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['css-loader', 'sass-loader']
      }
    ]
  }
}
