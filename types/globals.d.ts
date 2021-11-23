interface ServerConfigs {
  Version?: string;
  Title?: string;
  FixedHeader?: boolean;
  HiddenSideBar?: boolean;
  KeepAlive?: boolean;
  Locale?: string;
  Layout?: string;
}
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
// 礼品创建、编辑、列表中的每一项，都会是这个数据类型。
declare interface IGiftItem {
  id: string | number;
  name: string;
  desc: string;
  [key: string]: any;
}

// 全局相应的类型定义
// 而且一般来说，我们不确认，接口返回的类型到底是什么（可能是null、可能是对象、也可能是数组），所以使用范型来定义interface
declare interface IRes<T> {
  code: number;
  msg: string;
  data: T;
}
// 接口返回数据类型定义

declare interface IGiftInfo {
  list: Array<IGiftItem>;
  pageNum: number;
  pageSize: number;
  total: number;
}