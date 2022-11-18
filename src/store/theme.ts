import { defineStore, PiniaCustomStateProperties } from 'pinia'
import { useTheme } from '@/hooks'
import { menuCssVars, initMenuTheme, updataMenuTheme } from '@/styles/CsstoJs/menuCssVar'
import { headerCssVars, initHeaderTheme, updataHeaderTheme } from '@/styles/CsstoJs/headerCssVar'
const { getTheme, setTheme, getMode } = useTheme()

export const useThemeStore = defineStore('theme', {
  state() {
    return {
      isDark: getMode(),
      colorList: getTheme(),
      menuColor: initMenuTheme(),
      headerColor: initHeaderTheme(),
    }
  },
  getters: {
    menuCss: (state) => {
      // @ts-ignore
      if (state.isDark) {
        const el = document.documentElement
        return {
          backgroundColor: getComputedStyle(el).getPropertyValue(`--content-background`),
          textColor: '#CFD3DC',
          activeTextColor: '',
        }
      }
      // @ts-ignore
      return state.menuColor
    },
    headerCss: (state) => {
      // @ts-ignore
      if (state.isDark) {
        const el = document.documentElement
        return {
          backgroundColor: getComputedStyle(el).getPropertyValue(`--content-background`),
          textColor: '#CFD3DC',
          activeTextColor: '',
        }
      }
      // @ts-ignore
      return state.headerColor
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
    setHeaderTheme(index?: number) {
      if (!this.isDark) {
        this.headerColor = headerCssVars[index]
        updataHeaderTheme(index)
      }
    },
  },
})
