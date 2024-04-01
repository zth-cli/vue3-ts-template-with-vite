import type { Directive, DirectiveBinding } from 'vue'
interface HTMLElementPlus extends HTMLElement {
  copyValue: any
  handleClick: any
}
/**
 * @description 复制指令，用于复制文本内容到剪贴板
 * @example <span v-copy="'复制的内容'">复制</span>
 */
const copy: Directive = {
  mounted(el: HTMLElementPlus, binding: DirectiveBinding) {
    el.copyValue = binding.value
    el.handleClick = async function () {
      try {
        await navigator.clipboard.writeText(this.copyValue)
      } catch (error) {
        console.error('复制失败: ', error)
      }
    }
    el.addEventListener('click', el.handleClick)
  },
  updated(el: HTMLElementPlus, binding: DirectiveBinding) {
    el.copyValue = binding.value
  },
  beforeUnmount(el: HTMLElementPlus) {
    el.removeEventListener('click', el.handleClick)
  },
}

export default copy
