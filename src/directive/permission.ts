import { Directive } from 'vue'

// 权限到按钮,v-permission="{ action: ['admin'], effect: 'disabled' }"

const permission: Directive = {
  mounted(el: HTMLButtonElement, binding) {
    if (binding.value === undefined) {
      return
    }
    const { action, effect } = binding.value

    // 此处应该权限判断

    if (action.includes('admin')) {
      if (effect === 'disabled') {
        el.disabled = true
        el.style['disabled'] = 'disabled'
        el.classList.add('n-button--disabled')
      } else {
        el.remove()
      }
    }
  },
}
export default permission
