const Router = require('koa-router')
const router = new Router()
const Mock = require('mockjs')
const { application, applicationList } = require('../model/application')

router
  .post('/list', (ctx, next) => {
    ctx.body = Mock.mock({ code: 0, message: 'success', data: applicationList })
  })
  .post('/detail', (ctx, next) => {
    ctx.body = Mock.mock({ code: 0, message: 'success', data: application })
  })

module.exports = router
