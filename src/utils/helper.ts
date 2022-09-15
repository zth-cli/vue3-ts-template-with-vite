import type { App, Plugin } from 'vue'
import { isObject } from './types'
// 注册组件
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function camelize(str: string) {
  const camelizeRE = /-(\w)/g
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : ''
  })
}
