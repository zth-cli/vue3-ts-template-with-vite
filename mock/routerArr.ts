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
    id: "0514",
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
];
export default routeArr;
