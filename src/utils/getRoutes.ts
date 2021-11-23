import { RouteRecordRaw } from "vue-router";
const modules = import.meta.glob("../views/**/**.vue"); // 导出views所有的文件
// console.log(modules);

var addRoutes: Array<RouteRecordRaw> = [];
function addRouter(routeArr: Array<IrouteItem>): RouteConfig[] {
  if (routeArr.length < 1) {
    return;
  }
  routeArr.forEach((item) => {
    if (item.type === 1 && item?.children?.length > 0) {
      addRouter(item.children);
    } else if (item.type !== 1) {
      addRoutes.push({
        path: item.path,
        name: item.componentName,
        // component: (resolve) => require([`@/views/${item.componentPath}.vue`], resolve),
        // component: () => import(/* webpackChunkName: "[request]" */ `@/views/${item.componentPath}.vue`),
        component: modules[`../views/${item.componentPath}.vue`],
        meta: {
          title: item.title,
          isCache: false,
          requiresAuth: true,
        },
      });
    }
  });
  return addRoutes;
}
// 处理加载状态
// function lazyLoad(component: Promise<any>) {
//   const AsyncHandler = () => ({
//     component,
//     loading: require("@/components/notFound.vue").default,
//     error: require("@/components/error.vue").default,
//     delay: 200,
//     timeout: 10000,
//   });

//   return Promise.resolve({
//     functional: true,
//     render(
//       h: (
//         arg0: () => {
//           component: Promise<any>;
//           loading: any;
//           error: any;
//           delay: number;
//           timeout: number;
//         },
//         arg1: any,
//         arg2: any
//       ) => any,
//       { data, children }: any
//     ) {
//       return h(AsyncHandler, data, children);
//     },
//   });
// }
export default addRouter;
