let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let path = require('path')
let dirlets = require('../base/dir-vars.config.js')
let pageArr = require('../base/page-entries.config.js')
let HashOutput = require('webpack-plugin-hash-output')
const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin')

let configPlugins = [
    /* 全局shimming */
    new webpack.ProvidePlugin({
        $: 'n-zepto',
        Zepto: 'n-zepto',
        'window.Zepto': 'n-zepto',
        'window.$': 'n-zepto',
        Vue: 'vue',
        vue: 'vue'
    }),
    /* 抽取出所有通用的部分 */
    new webpack.optimize.CommonsChunkPlugin({
        names: ['static/commons'], // chunk的名字,需要注意的是，chunk的name不能相同！！！
        filename: '[name]/commons.[chunkhash].js', //生成common.js [name]/
        minChunks: 4
    }),
    /* 抽取出webpack的runtime代码()，避免稍微修改一下入口文件就会改动commonChunk，导致原本有效的浏览器缓存失效 */
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: '../webpack_manifest/manifest.[hash].js' //生成mainfest文件到build文件外  因为会将内容输出插入html script标签中,不需要额外引入或放到cdn里,,production环境可以用chuckhash,不过直接用hash省事,不用上边的复杂配置了
    }),
    new InlineChunkWebpackPlugin({
        inlineChunks: ['manifest']
    }),
    /* 抽取出chunk的css */
    new ExtractTextPlugin('static/css/[name].[contenthash].css'),
    /* 配置好Dll */
    new webpack.DllReferencePlugin({
        context: dirlets.staticRootDir, // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
        manifest: require('../../manifest.json'), // 指定manifest.json
        name: 'dll' // 当前Dll的所有内容都会存放在这个参数指定变量名的一个全局变量下，注意与DllPlugin的name参数保持一致
    }),
    new HashOutput({
        manifestFiles: 'manifest' // 指定包含 manifest 在内的 chunk
    })
]

pageArr.forEach((page) => {
    const htmlPlugin = new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(dirlets.pagesDir, `./${page}/html`),
        chunks: ['manifest', page, 'static/commons'],
        hash: true, // 为静态资源生成hash值
        xhtml: true
    })
    configPlugins.push(htmlPlugin)
})

module.exports = configPlugins
