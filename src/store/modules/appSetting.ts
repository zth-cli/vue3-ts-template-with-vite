interface AppSettingState {
  menuMode: string | boolean //导航模式
  navTheme?: string //导航风格
  headerSetting?: string //顶部设置
  sidebarLogo?: boolean
  showFooter?: string //页脚
  tagsBar?: boolean //多标签
  crumbsSetting?: string //面包屑
  permissionMode?: string //权限模式
  isPageAnimate?: boolean //是否开启路由动画
  pageAnimateType?: string //路由动画类型
  showThemeBar?: boolean
}
const env = import.meta.env

function checkStorange(key: string) {
  const temp = env['VITE_' + key]
  return localStorage.getItem(key) != null ? localStorage.getItem(key) : temp
}

const appSettings = {
  state: (): AppSettingState => ({
    sidebarLogo: checkStorange('sidebarLogo') === 'true' ? true : false,
    menuMode: checkStorange('menuMode'),
    tagsBar: checkStorange('tagsBar') === 'true' ? true : false,
    showThemeBar: checkStorange('showThemeBar') === 'true' ? true : false
  }),

  mutations: {
    CHANGE_SETTING: (state: AppSettingState, { key, value }: any) => {
      if (state.hasOwnProperty(key)) {
        state[key] = value
        localStorage.setItem(key, value)
      }
    }
  },

  actions: {
    changeSetting({ commit, state, getters }: any, data: any) {
      console.log(1)

      commit('CHANGE_SETTING', data)
    }
  }
}

export default appSettings
