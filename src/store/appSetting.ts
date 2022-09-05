import { defineStore } from 'pinia'
interface AppSettingState {
  menuMode: string | boolean //导航模式
  navTheme?: string //导航风格
  headerSetting?: string //顶部设置
  sidebarLogo?: string
  showFooter?: string //页脚
  tagsBar?: string //多标签
  crumbsSetting?: string //面包屑
  permissionMode?: string //权限模式
  isPageAnimate?: string //是否开启路由动画
  pageAnimateType?: string //路由动画类型
  showThemeBar?: string
}
const env = import.meta.env
export function checkStorange(key: string) {
  const temp = env['VITE_' + key]
  return localStorage.getItem(key) !== null ? localStorage.getItem(key) : temp
}

export const useConfigStroe = defineStore('useConfigStroe', {
  state(): AppSettingState {
    return {
      sidebarLogo: checkStorange('sidebarLogo'),
      menuMode: checkStorange('menuMode') || 'vertical',
      tagsBar: checkStorange('tagsBar'),
      showThemeBar: checkStorange('showThemeBar'),
    }
  },
  actions: {
    changeConfig({ key, value }) {
      localStorage.setItem(key, value)
      this[key] = value ? value : ''
    },
  },
})
