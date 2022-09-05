import { defineStore } from 'pinia'
import { useTheme } from '@/hooks'
const { getTheme, setTheme } = useTheme()

export const useThemeStore = defineStore('theme', {
  state() {
    return {
      colorList: getTheme(),
    }
  },
  getters: {},
  actions: {
    setTheme(themeName?: string) {
      const list = setTheme(themeName)
      this.colorList = list
    },
  },
})
