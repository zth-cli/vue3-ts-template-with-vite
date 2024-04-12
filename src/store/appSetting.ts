import { defineStore } from 'pinia'
interface AppSettingState {
  menuMode: string //导航模式
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

export const useConfigStroe = defineStore(
  'useConfigStroe',
  () => {
    const sidebarLogo = ref(true)
    const menuMode = ref('vertical')
    const tagsBar = ref(true)
    const showThemeBar = ref(true)

    // watch menuMode, 给body元素的layout添加属性
    watch(
      () => menuMode.value,
      (newValue) => {
        document.body.setAttribute('layout', newValue)
      },
      {
        immediate: true,
      },
    )

    return {
      sidebarLogo,
      menuMode,
      tagsBar,
      showThemeBar,
    }
  },
  {
    persist: {
      key: '_appSetting',
      storage: localStorage,
    },
  },
)
