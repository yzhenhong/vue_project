
module.exports = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '医疗接入平台（客户端）'
      return args
    })
    if (process.env.NODE_ENV === 'test') {
      config.module
        .rule('instrumenter')
        .test(/\.(js|ts)$/)
        .use('istanbul-instrumenter-loader')
        .loader('istanbul-instrumenter-loader')
        .options({ esModules: true })
        .end()
    }
  },
  devServer: {
    proxy: {
      '/v1': {
        // target: 'http://localhost:7000',
        target: 'http://10.96.153.36:8081', // lucong's machine
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'none' : 'source-map'
  }
}
