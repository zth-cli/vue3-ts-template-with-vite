/*
 * @Author: 阮志雄
 * @Date: 2021-10-25 14:24:26
 * @LastEditTime: 2021-10-31 16:28:20
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \vue3-template-with-ts\types\router.d.ts
 */
import { RouteRecordRaw } from "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    // 是可选的
    isAdmin?: boolean;
    title?: string;
    [key: string]: any;
  }
}
// 通过扩展 RouteMeta 接口来输入 meta 字段
declare global {
  type RouteConfig = RouteRecordRaw & { hidden?: boolean }; //hidden 是可选属性,拓展路由属性
  
}
