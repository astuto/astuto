const { environment } = require('@rails/webpacker')
const erb =  require('./loaders/erb')
const typescript =  require('./loaders/typescript')
const webpack = require('webpack')

environment.loaders.prepend('typescript', typescript)
environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: ['popper.js', 'default']
  })
)

environment.loaders.prepend('erb', erb)
module.exports = environment
