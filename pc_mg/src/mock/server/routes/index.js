// const compose = require('koa-compose')
// const glob = require('glob')
// const { resolve } = require('path')

// const registerRouter = () => {
//   const routers = []
//   glob.sync(resolve(__dirname, './', '**/*.js'))
//     .filter(value => (value.indexOf('index.js') === -1))
//     .map(router => {
//       routers.push(require(router).routes())
//       routers.push(require(router).allowedMethods())
//     })
//   return compose(routers)
// }

// module.exports = registerRouter
const Router = require('koa-router')
const editionRouter = require('./edition')
const applicationRouter = require('./application')

const router = new Router({ prefix: '/v1' })
router
  .use('/edition', editionRouter.routes())
  .use('/apps', applicationRouter.routes())

module.exports = router
