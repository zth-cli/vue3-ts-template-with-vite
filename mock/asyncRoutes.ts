// 根据角色动态生成路由
import { MockMethod } from 'vite-plugin-mock'
import routeArr from './routerArr'

// 添加不同按钮权限到/permission/button页面中
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority]
  return routes
}

export default [
  {
    url: '/api/getAsyncRoutes',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        list: routeArr
      }
    }
  }
] as MockMethod[]
