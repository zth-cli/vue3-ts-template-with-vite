import { SET_USERMENU } from '../mutation-types'
import router from '@/router'
import addRouter from '@/utils/getRoutes'
import { getAsyncRoutes } from '@/api'
import Main from '@/layout/index.vue'

interface State {
  routes: []
}
const Menus = {
  state: (): State => ({
    routes: JSON.parse(localStorage.getItem('menu')) || [],
  }),
  mutations: {
    [SET_USERMENU]: (state: { routes: any }, menu: any) => {
      state.routes = menu
      // localStorage.setItem('menu', JSON.stringify(menu))
    },
  },
  actions: {
    GetUserMenu({ commit }) {
      return new Promise((resolve, reject) => {
        let asyncRoutes = []
        getAsyncRoutes()
          .then((res) => {
            if (res.list.length < 1) {
              resolve([])
              return
            }
            asyncRoutes = [].concat(res.list)
            const routes = addRouter(asyncRoutes)
            router.options.routes.splice(0, 1, {
              path: '/',
              name: 'Main',
              component: Main,
              redirect: routes[0].path,
              children: routes,
            })
            router.options.routes.push(
              {
                component: () => import('../../views/Error/404.vue'),
                meta: { title: '404', isCache: false, requiresAuth: true },
                name: '404error',
                path: '/404error',
              },
              {
                path: '/:path(.*)*',
                redirect: '/404error',
              }
            )
            router.options.routes.forEach((item) => {
              router.addRoute(item)
            })
            commit(SET_USERMENU, asyncRoutes)
            resolve(routes)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
  getters: {},
}
export default Menus
