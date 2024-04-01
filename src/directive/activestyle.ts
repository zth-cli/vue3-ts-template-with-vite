import { Directive, watchEffect } from 'vue'

/**
 * @description: 激活样式
 * @param {*} el
 * @param {*} binding
 * @example
 * <span v-active-style="[{'color':'red','font-size': '22px'},() => activeTab === index]"></span>
 */
const activeStyle: Directive = {
  mounted: (el: HTMLElement, { value }) => {
    const [style, fn] = value
    watchEffect(() => {
      Object.keys(style).forEach((key) => {
        el.style[key] = fn() ? style[key] : ''
      })
    })
  },
}
export default activeStyle
