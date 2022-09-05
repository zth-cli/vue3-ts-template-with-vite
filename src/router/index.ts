import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
} from 'vue-router'
import Main from '@/layout/index.vue'
import { getStorge } from '@/utils/auth'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// import { store } from '@/store/index'
import pinia from '@/store'
import { useMenuStore } from '@/store/menu'
const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    hidden: false, // 拓展路由属性
    meta: {
      title: '首页',
    },
    children: [],
  },
  {
    path: '/redirect',
    component: Main,
    meta: {
      title: '重载',
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/Redirect/index.vue'),
        meta: {
          title: '重载',
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: '登录',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    //  处理路由切换滚动行为
    return new Promise((resolve) => {
      if (savedPosition) {
        return savedPosition
      }
      if (from.meta.saveSrollTop) {
        const top: number = document.documentElement.scrollTop || document.body.scrollTop
        resolve({ left: 0, top })
      }
    })
  },
})

let asyncRouterFlag = 0
router.beforeEach(async (to: RouteLocationNormalized, from, next) => {
  Nprogress.start()
  const store = useMenuStore(pinia)
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  if (to.path === '/login') {
    next()
  } else if (!getStorge('token')) {
    //如果不需要登录验证，或者已经登录成功，则直接放行
    //进入的不是登录路由
    next({ path: '/login' })
  } else {
    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
    if (to.meta.title) {
      document.title = to.meta.title
    }
    // 添加flag防止多次获取动态路由和栈溢出
    if (!asyncRouterFlag && store.routes.length === 0) {
      asyncRouterFlag++
      await store.getUserMenu()
      next({ ...to, replace: true })
    } else {
      next()
    }
  }
})
router.afterEach(() => {
  //...
  Nprogress.done()
})

export default router
