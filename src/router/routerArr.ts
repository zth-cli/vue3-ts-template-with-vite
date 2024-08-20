import { RouteMeta } from 'vue-router'
interface IrouteItem {
  title: string
  componentName?: string
  componentPath?: string
  icon?: string
  frameSrc?: string
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
    title: '首页',
    componentName: 'Home',
    componentPath: 'Home/index',
    icon: 'house',
    parentId: 0,
    id: 501,
    type: 3,
    path: '/home',
    mate: {
      isCahe: true,
    },
  },
  {
    title: '分析页',
    componentName: 'Analysis',
    componentPath: 'Analysis/index',
    icon: 'Histogram',
    parentId: 0,
    id: 502,
    type: 3,
    path: '/analysis',
  },
  {
    title: '表格页面',
    icon: 'document',
    parentId: 0,
    id: 6,
    type: 1,
    children: [
      {
        title: '基础布局',
        componentName: 'curdTable',
        componentPath: 'curdView/curdTable/index',
        icon: '',
        parentId: 6,
        id: 601,
        type: 3,
        path: '/curd-table',
      },
      {
        title: 'tree布局',
        componentName: 'treeTable',
        componentPath: 'curdView/treeTable/index',
        icon: '',
        parentId: 6,
        id: 602,
        type: 3,
        path: '/tree-table',
      },
      {
        title: '基础布局V2',
        componentName: 'CurdViewsV2',
        componentPath: 'curdView/curdTableV2/index',
        icon: '',
        parentId: 6,
        id: 603,
        type: 3,
        path: '/curd-tablev2',
      },
      {
        title: 'select布局V2',
        componentName: 'selectTableV2',
        componentPath: 'curdView/selectTableV2/index',
        icon: '',
        parentId: 6,
        id: 604,
        type: 3,
        path: '/select-tablev2',
      },
      {
        title: '表单',
        componentName: 'zthForm',
        componentPath: 'curdView/zthForm/index',
        icon: '',
        parentId: 6,
        id: 605,
        type: 3,
        path: '/zth-form',
      },
    ],
  },
  {
    title: '异常界面',
    icon: 'circle-close',
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
        path: '/404',
      },
      {
        title: '500页面',
        componentName: '500',
        componentPath: 'Error/500',
        parentId: 7,
        id: 702,
        type: 3,
        path: '/500',
      },
    ],
  },
  {
    title: '外部界面',
    icon: 'connection',
    parentId: 0,
    id: 8,
    type: 1,
    children: [
      {
        title: 'Vue3',
        componentName: 'Vue3',
        componentPath: 'Iframe/index',
        frameSrc: 'https://v3.cn.vuejs.org/guide/introduction.html',
        parentId: 8,
        id: 801,
        type: 3,
        path: '/Vue3',
      },
      {
        title: 'Vuex',
        componentName: 'Vuex',
        componentPath: 'Iframe/index',
        frameSrc: 'https://next.vuex.vuejs.org/zh/',
        parentId: 8,
        id: 802,
        type: 3,
        path: '/Vuex',
      },
      {
        title: '掘金',
        componentName: 'juejin',
        componentPath: 'Iframe/index',
        frameSrc: 'https://juejin.cn/',
        parentId: 8,
        id: 803,
        type: 3,
        path: '/juejin',
      },
      {
        title: 'VueUse',
        componentName: 'vueuse',
        componentPath: 'Iframe/index',
        frameSrc: 'https://vueuse.org/',
        parentId: 8,
        id: 804,
        type: 3,
        path: '/vueuse',
      },
      {
        title: '百度',
        componentName: 'baidu',
        componentPath: 'Iframe/index',
        frameSrc: 'http://10.172.246.206:8095/baidu',
        parentId: 8,
        id: 805,
        type: 3,
        path: '/baidu',
      },
    ],
  },
]
export default routeArr
