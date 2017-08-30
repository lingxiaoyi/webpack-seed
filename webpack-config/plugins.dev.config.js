let webpack = require('webpack')
let pluginsConfig = require('./inherit/plugins.config.js')

pluginsConfig.push(new webpack.DefinePlugin({
    IS_PRODUCTION: false
}))

//pluginsConfig.push(new webpack.HotModuleReplacementPlugin())   //先关闭 不然改变样式一直刷新页面

module.exports = pluginsConfig
