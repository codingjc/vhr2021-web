// 代理对象
let proxyObj = {
    '/': {
        ws: false,
        target: 'http://localhost:8081',
        changeOrigin: true,
        pathRewrite: {
            '^/':''
        }
    }
}

// 导出配置
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: proxyObj
    }
}