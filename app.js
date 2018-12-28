const Koa = require('koa')
const json = require('koa-json')
const KoaRouter = require('koa-router')
const auth = require('./server/routes/auth')
const api = require('./server/routes/api')
const jwt = require('koa-jwt')
const path = require('path')
const historyApiFallback = require('koa2-history-api-fallback')
const serve = require('koa-static')
const router = KoaRouter()
const app = new Koa()
app.use(require('koa-bodyparser')())
app.use(json())

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms)
})

app.use(async function (ctx, next) { //  如果JWT验证失败，返回验证失败信息
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

router.use('/auth', auth.routes())
router.use('/api', jwt({ secret: 'vue-koa-demo' }), api.routes()) // 所有从/api/打头的请求都需要经过jwt验证。

app.use(router.routes())
app.use(historyApiFallback()) // 去掉history模式
app.use(serve(path.resolve('dist'))) // 将webpack打包好的项目目录作为Koa静态文件服务的目录
app.listen(3000, () => {
  console.log('Koa is listening in 3000')
})
module.exports = app
