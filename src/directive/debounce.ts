import type { Directive, DirectiveBinding } from 'vue'

// 定义扩展的HTMLElement接口
interface HTMLElementPlus extends HTMLElement {
  handleClick: () => any
}

/**
 * @description 防抖指令，用于处理点击事件的防抖操作
 * @param {HTMLElement} el
 * @param {DirectiveBinding} binding
 * @example
 * <button v-debounce:500="handleClick">点击</button>
 */
const debounce: Directive = {
  mounted(el: HTMLElementPlus, binding: DirectiveBinding) {
    // 异常处理优化：确保binding.value是函数类型
    if (typeof binding.value !== 'function' || binding.value === null) {
      throw new Error('callback must be a function')
    }

    let timer: number | null = null
    const callback = binding.value
    const delay = binding.arg ? parseInt(binding.arg) : 500
    el.handleClick = function () {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      timer = setTimeout(() => {
        callback()
        timer = null // 完成调用后，重置timer为null
      }, delay)
    }

    el.addEventListener('click', el.handleClick)
  },

  beforeUnmount(el: HTMLElementPlus) {
    // 移除事件监听器时，确保 handleClick 方法是可调用的
    if (typeof el.handleClick === 'function') {
      el.removeEventListener('click', el.handleClick)
    }
  },
}

export default debounce
