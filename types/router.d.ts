import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean
    title?: string
    isCahe?: boolean
    [key: string]: any
  }
}
// 通过扩展 RouteMeta 接口来输入 meta 字段
declare global {
  type RouteConfig = RouteRecordRaw & { hidden?: boolean } //hidden 是可选属性,拓展路由属性
}
