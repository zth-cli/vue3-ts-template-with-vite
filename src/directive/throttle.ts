import type { Directive, DirectiveBinding } from 'vue'
interface HTMLElementPlus extends HTMLElement {
  handleClick: () => any
  disabled: boolean
}
/**
 * @description 节流指令，用于处理点击事件的节流操作
 * @param {HTMLElement} el
 * @param {DirectiveBinding} binding
 * @example
 * <button v-throttle:1000="handleClick">按钮</button>
 */

const throttle: Directive = {
  mounted(el: HTMLElementPlus, binding: DirectiveBinding) {
    // 异常处理优化：确保binding.value是函数类型
    if (typeof binding.value !== 'function' || binding.value === null) {
      throw new Error('callback must be a function')
    }
    let timer: number | null = null
    const callback = binding.value
    const delay = binding.arg ? parseInt(binding.arg) : 1000
    el.handleClick = function () {
      if (timer) {
        clearTimeout(timer)
      }
      if (!el.disabled) {
        el.disabled = true
        callback()
        timer = setTimeout(() => {
          el.disabled = false
        }, delay)
      }
    }
    el.addEventListener('click', el.handleClick)
  },
  beforeUnmount(el: HTMLElementPlus) {
    el.removeEventListener('click', el.handleClick)
  },
}

export default throttle
