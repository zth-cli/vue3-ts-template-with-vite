import { defineStore } from 'pinia'
import { useTheme } from '@/hooks'
import { menuCssVars, initMenuTheme, updataMenuTheme } from '@/styles/CsstoJs/menuCssVar'
const { getTheme, setTheme, getMode } = useTheme()

export const useThemeStore = defineStore('theme', {
  state() {
    return {
      isDark: getMode(),
      colorList: getTheme(),
      menuColor: initMenuTheme(),
    }
  },
  getters: {
    menuCss: (state) => {
      if (state.isDark) {
        const el = document.documentElement
        return {
          backgroundColor: getComputedStyle(el).getPropertyValue(`--content-background`),
          textColor: '#CFD3DC',
          activeTextColor: '',
        }
      }
      return state.menuColor
    },
  },
  actions: {
    setSysTheme(themeName?: string) {
      const list = setTheme(themeName)
      this.colorList = list
      this.isDark = getMode()
      this.menuColor = initMenuTheme()
    },
    setMenuTheme(index?: number) {
      if (!this.isDark) {
        this.menuColor = menuCssVars[index]
        updataMenuTheme(index)
      }
    },
  },
})
