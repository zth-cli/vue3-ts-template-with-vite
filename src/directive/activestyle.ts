import { ref, watchEffect } from 'vue'

/**
 * Implement the custom directive
 * Make sure the list item text color changes to red when the `toggleTab` is toggled
 *
 */
export const activeStyle = {
  mounted: (el: HTMLElement, { value }) => {
    const [style, fn] = value
    watchEffect(() => {
      Object.keys(style).forEach((key) => {
        el.style[key] = fn() ? style[key] : ''
      })
    })
  },
}
//  v-active-style="[{'color':'red','font-size': '22px'},() => activeTab === index]"
