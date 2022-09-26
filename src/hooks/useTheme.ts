import { hexToRgba, getDarkColor } from '@/utils'
/**
 * 主题切换
 * @param theme
 * @description 基于element-plus
 */
export const DARK_MODE = 'dark'
export function useTheme() {
  const getTheme = () => {
    const el = document.documentElement
    const colorValues: Array<{ [x: string]: string }> = []
    const mainColors = ['primary', 'warning', 'danger', 'success']
    mainColors.forEach((item) => {
      const color = getComputedStyle(el).getPropertyValue('--color-' + item)
      color && colorValues.push({ label: item, value: color })
    })
    return colorValues
  }
  const setTheme = (theme?: string) => {
    const localTheme = localStorage.getItem('_theme_') || ''
    const el = document.documentElement
    const themeStr = theme === 'default' ? '' : theme
    el.setAttribute('class', theme ? themeStr : localTheme)
    el.setAttribute('data-mode', theme ? themeStr : localTheme)
    localStorage.setItem('_theme_', theme ? themeStr : localTheme)
    // 获取 css 变量
    const light = [3, 5, 7, 8, 9]
    const colorValues = getTheme()
    const isDark = theme === DARK_MODE
    colorValues.forEach((item) => {
      const darkerColor = getDarkColor(item.value, 0.1)
      el.style.setProperty(`--el-color-${item.label}-dark-2`, `${darkerColor}`)
      light.forEach((ele, index) => {
        const colorLight = isDark
          ? getDarkColor(item.value.trim(), 0.1 * ele - 0.1)
          : hexToRgba(item.value, 1 - 0.1 * ele)
        el.style.setProperty(`--el-color-${item.label}-light-${ele}`, colorLight as string)
      })
    })
    return colorValues
  }
  const getMode = () => {
    return localStorage.getItem('_theme_') === DARK_MODE
  }
  return {
    getTheme,
    setTheme,
    getMode,
  }
}
