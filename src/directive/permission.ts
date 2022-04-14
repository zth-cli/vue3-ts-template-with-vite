import { ObjectDirective } from 'vue'

// 权限到按钮,v-permission="{ action: ['admin'], effect: 'disabled' }"

const permission: ObjectDirective = {
  mounted(el: HTMLButtonElement, binding) {
    if (binding.value === undefined) {
      return
    }
    const { action, effect } = binding.value

    // 此处应该权限判断
    // eslint-disable-next-line no-constant-condition
    if (false) {
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
