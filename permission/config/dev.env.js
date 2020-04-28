'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  // 网站
  WEB_HOST: JSON.stringify('http://localhost:9090'),
  // 请求后台地址
  API_URL: '"http://10.96.153.20:3000"',
  // 上传图片地址
  UPLOAD_URL: JSON.stringify('https://storage.xgeeklab.com')
})
