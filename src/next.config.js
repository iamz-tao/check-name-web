const webpack = require('webpack')
const withImages = require('next-images')

module.exports = withImages({
  webpack: (config = {
    plugins: [],
    rules: [],
  }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          APP_ENV: JSON.stringify(process.env.APP_ENV),
        },
      }),
    )

    if (process.env.NODE_ENV !== 'production') {
      return Object.assign({}, config, {
        devtool: 'eval-source-map',
      })
    }

    //config.rules.push({
    //  test: /\.(png|jpg|gif)$/i,
    //  use: [
    //    {
    //      loader: 'url-loader',
    //      options: {
    //        limit: 8192,
    //      },
    //    },
    //  ],
    //})

    return config
  },
  webpackDevMiddleware: (defaultConfig) => {
    // Perform customizations to webpack dev middleware config

    // Important: return the modified config

    const config = {
      noInfo: false,
      quiet: false,
      stats: {
        colors: true,
      },
    }

    return Object.assign({}, defaultConfig, config)
  },
})
