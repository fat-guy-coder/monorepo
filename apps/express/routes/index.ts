import { Express, Request, Response,type Router as ExpressRouter } from 'express'


// 路由配置接口
interface RouterConf {
  path: string,
  router: ExpressRouter,
  meta?: any
}

// 路由配置
// 这里需要确保 menu 中的 router 字段是 ExpressRouter 类型，否则类型不兼容
const routerConf: Array<RouterConf> = []

function routes(app: Express) {
  // 根目录
  routerConf.forEach((conf) => app.use(conf.path, conf.router))
}


export { routerConf }

export default routes