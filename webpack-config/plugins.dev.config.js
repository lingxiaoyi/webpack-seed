let webpack = require('webpack')
let pluginsConfig = require('./inherit/plugins.config.js')

pluginsConfig.push(new webpack.DefinePlugin({
    IS_PRODUCTION: false
}))

//pluginsConfig.push(new webpack.HotModuleReplacementPlugin())

module.exports = pluginsConfig
