import { RouteMeta } from 'vue-router'
interface IrouteItem {
  title: string
  componentName?: string
  componentPath?: string
  icon?: String
  frameSrc?:string,
  parentId: number
  id: number
  type: number
  path?: string
  children?: Array<IrouteItem>
  meta?: RouteMeta
  [key: string]: any
}
const routeArr: Array<IrouteItem> = [
  {
    title: 'Dashboard',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: 5,
    type: 1,
    children: [
      {
        title: '首页',
        componentName: 'Home',
        componentPath: 'Home',
        icon: 'el-icon-house',
        parentId: 5,
        id: 501,
        type: 3,
        path: '/home',
        mate: {
          isCahe: true
        }
      },
      {
        title: '分析页',
        componentName: 'Analysis',
        componentPath: 'Analysis/index',
        icon: 'el-icon-house',
        parentId: 5,
        id: 502,
        type: 3,
        path: '/analysis'
      }
    ]
  },
  {
    title: '列表页面',
    icon: 'el-icon-s-grid',
    parentId: 0,
    id: 6,
    type: 1,
    children: [
      {
        title: '基础列表',
        componentName: 'BasicTable',
        componentPath: 'BasicTable/index',
        icon: 'el-icon-house',
        parentId: 6,
        id: 601,
        type: 3,
        path: '/basci-table'
      },
      {
        title: '列表布局',
        componentName: 'viewTable',
        componentPath: 'viewTable/index',
        icon: 'el-icon-house',
        parentId: 6,
        id: 602,
        type: 3,
        path: '/view-table'
      }
    ]
  },
  {
    title: '异常界面',
    icon: 'el-icon-error',
    parentId: 0,
    id: 7,
    type: 1,
    children: [
      {
        title: '404页面',
        componentName: '404',
        componentPath: 'Error/404',
        parentId: 7,
        id: 701,
        type: 3,
        path: '/404'
      },
      {
        title: '500页面',
        componentName: '500',
        componentPath: 'Error/500',
        parentId: 7,
        id: 702,
        type: 3,
        path: '/500'
      }
    ]
  },
  {
    title: '外部界面',
    icon: 'el-icon-link',
    parentId: 0,
    id: 8,
    type: 1,
    children: [
      {
        title: 'Vue3',
        componentName: 'Vue3',
        componentPath: 'Iframe/index',
        frameSrc:'https://v3.cn.vuejs.org/guide/introduction.html',
        parentId: 8,
        id: 801,
        type: 3,
        path: '/Vue3'
      },
      {
        title: 'Vuex',
        componentName: 'Vuex',
        componentPath: 'Iframe/index',
        frameSrc:'https://next.vuex.vuejs.org/zh/',
        parentId: 8,
        id: 802,
        type: 3,
        path: '/Vuex'
      }
    ]
  }
]
export default routeArr
