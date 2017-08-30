module.exports = {
    js: {
        //html5shiv: require('!!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/html5shiv.min.js'),
        //respond: require('!!file-loader?name=static/js/[name].[ext]!../../../vendor/ie-fix/respond.min.js'),
        //jquery: require('!!file-loader?name=static/js/[name].[ext]!jquery/dist/jquery.min.js'),
        hotcss: require('!!file-loader?name=static/js/[name].[ext]!../../../vendor/hotcss.js'),
    },
    images: {
        'login-bg': require('!!file-loader?name=static/img/[name].[ext]!../imgs/login-bg.jpg')
    },
    dll: {
      js: require('!!file-loader?name=static/dll/[name].[ext]!../../dll/dll.js'),
      css: require('!file-loader?name=static/dll/[name].[ext]!../../dll/dll.css'),
    },
}
