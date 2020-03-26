'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: JSON.stringify('development'),
  // 网站
  WEB_HOST: JSON.stringify('https://crowd-test.xgeeklab.com'),
  // WEB_HOST: JSON.stringify('http://localhost:8080'),
  // 请求后台地址
  API_URL: '"https://crowd-test.xgeeklab.com"',
  // API_URL: JSON.stringify('http://localhost:3000'),
  // 微信appId
  APPID: JSON.stringify('wxe430a46847072d87'),
})
