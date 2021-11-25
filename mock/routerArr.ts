/*
 * @Author: 阮志雄
 * @Date: 2021-11-03 18:42:45
 * @LastEditTime: 2021-11-25 20:29:27
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\mock\routerArr.ts
 */
interface IrouteItem {
  title: string;
  componentName?: string;
  componentPath?: string;
  icon?: String;
  parentId: number;
  id: string;
  type: number;
  path?: string;
  children?: Array<IrouteItem>;
  [key: string]: any;
}
const routeArr: Array<IrouteItem> = [
  {
    title: "dashboard",
    icon: "el-icon-coffee-cup",
    parentId: 0,
    id: "05",
    type: 1,
    children: [
      {
        title: "首页",
        componentName: "Home",
        componentPath: "Home",
        icon: "el-icon-house",
        parentId: 0,
        id: "0501",
        type: 3,
        path: "/home",
      },
      {
        title: "分析页",
        componentName: "Analysis",
        componentPath: "Analysis/index",
        icon: "el-icon-house",
        parentId: 0,
        id: "0502",
        type: 3,
        path: "/analysis",
      },
    ],
  },
  {
    title: "列表页面",
    icon: "el-icon-s-grid",
    parentId: 0,
    id: "06",
    type: 1,
    children: [
      {
        title: "基础列表",
        componentName: "BasicTable",
        componentPath: "BasicTable/index",
        icon: "el-icon-house",
        parentId: 6,
        id: "0601",
        type: 3,
        path: "/basci-table",
      },
      {
        title: "列表布局",
        componentName: "viewTable",
        componentPath: "viewTable/index",
        icon: "el-icon-house",
        parentId: 6,
        id: "0602",
        type: 3,
        path: "/view-table",
      },
    ],
  },
];
export default routeArr;
