module.exports = ({config}) => {
  if (process.env.NODE_ENV !== 'production') {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    })

    config.resolve.extensions.push('.ts', '.tsx')
  }

  return config
}
