import { RouteRecordRaw } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import NotError from '@/views/Error/404.vue'
const modules = import.meta.glob('../views/**/**.vue') // 导出views所有的文件
// console.log(modules);

const addRoutes: Array<RouteRecordRaw> = []
function addRouter(routeArr: Array<IrouteItem>): RouteConfig[] {
  if (routeArr.length < 1) {
    return
  }
  routeArr.forEach((item) => {
    if (item.type === 1 && item?.children?.length > 0) {
      addRouter(item.children)
    } else if (item.type !== 1) {
      addRoutes.push({
        path: item.path,
        name: item.componentName,
        // component: (resolve) => require([`@/views/${item.componentPath}.vue`], resolve),
        // component: () => import(/* webpackChunkName: "[request]" */ `@/views/${item.componentPath}.vue`),
        component: modules[`../views/${item.componentPath}.vue`],
        // component: lazyLoad(item.componentPath),
        meta: {
          frameSrc: item.frameSrc ? item.frameSrc : '',
          parentId: item.parentId,
          rId: item.id,
          title: item.title,
          isCache: false,
          requiresAuth: true,
        },
      })
    }
  })
  return addRoutes
}
// 处理加载状态
function lazyLoad(componentPath: string) {
  return defineAsyncComponent({
    // 加载函数
    loader: () => import(`../views/${componentPath}.vue`),

    // 加载异步组件时使用的组件
    loadingComponent: NotError,
    // 展示加载组件前的延迟时间，默认为 200ms
    delay: 200,

    // 加载失败后展示的组件
    errorComponent: NotError,
    // 如果提供了一个 timeout 时间限制，并超时了
    // 也会显示这里配置的报错组件，默认值是：Infinity
    timeout: 3000,
  })
}
export default addRouter
