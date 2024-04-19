import { defineStore } from 'pinia'
import { useTheme } from '@/hooks'
const { getTheme, setTheme, getDarkMode, getThemeMode } = useTheme()

export const useThemeStore = defineStore('theme', {
  state() {
    return {
      isDark: getDarkMode(),
      colorList: getTheme(),
    }
  },
  actions: {
    setSysTheme(themeName?: string) {
      const list = setTheme(themeName)
      this.colorList = list
      this.isDark = getDarkMode()
    },
    getThemeMode() {
      return getThemeMode
    },
  },
})
