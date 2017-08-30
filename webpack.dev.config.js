module.exports = {
    entry: require('./webpack-config/entry.config.js'),

    output: require('./webpack-config/output.config.js'),

    //module: require('./webpack-config/module.dev.config.js'),
    module: require('./webpack-config/module.dev.extract.config.js'), //将css提取出来防止加载css太慢.导致JS计算某些高度出错

    resolve: require('./webpack-config/resolve.config.js'),

    plugins: require('./webpack-config/plugins.dev.config.js'),

    externals: require('./webpack-config/externals.config.js'),

    devtool: 'inline-source-map',

    devServer: require('./webpack-config/vendor/devServer.config.js')
}
