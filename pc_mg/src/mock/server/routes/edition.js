const Router = require('koa-router')
const router = new Router()
const Mock = require('mockjs')
const { editions } = require('../model/edition')

function handleEdition (ctx, next) {
  const body = ctx.request.body
  const result = body && body.id
    ? Mock.mock({ code: -1, message: 'success' })
    : { code: -1, message: '缺少参数id' }
  ctx.body = result
}

router
  .get('/list', (ctx, next) => {
    ctx.body = Mock.mock({ code: 0, message: 'success', data: editions() })
  })
  .post('/qrcode', (ctx, next) => {
    const body = ctx.request.body.id
      ? Mock.mock({ code: 0, message: 'success', data: { path: '@image("130x130")' } })
      : { code: -1, message: '缺少参数id' }
    ctx.body = body
  })
  .post('/upload', handleEdition)
  .post('/aduit', handleEdition)
  .post('/aduitCancel', handleEdition)
  .post('/publish', handleEdition)
  .post('/rollback', handleEdition)
  .post('/stop', handleEdition)

module.exports = router
