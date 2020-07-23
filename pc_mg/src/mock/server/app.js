const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const chalk = require('chalk')
const router = require('./routes')

app.use(bodyParser())
app.use(router.routes())

app.listen(7000)
console.log('mock server running at:')
console.log(`-- Local:    ${chalk.blue('http://localhost:7000')}`)
// console.log(`-- Local:    ${chalk.blue('http://localhost:8080')}`)
