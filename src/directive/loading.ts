import { createApp, defineComponent, nextTick } from 'vue'
// 使用 Vue.extend构造组件子类
const Comp = defineComponent({ name: 'Loading', template: '<p>loading</p>' })
const app = createApp(Comp)

// 定义一个名为loading的指令
const loading = {
  /**
   * 只调用一次，在指令第一次绑定到元素时调用，可以在这里做一些初始化的设置
   * @param {*} el 指令要绑定的元素
   * @param {*} binding 指令传入的信息，包括 {name:'指令名称', value: '指令绑定的值',arg: '指令参数 v-bind:text 对应 text'}
   */
  mounted(el: any, binding: any) {
    const instance = app.mount(document.createElement('div'))
    el.appendChild(instance.$el)
    el.instance = instance
    nextTick(() => {
      el.instance.visible = binding.value
    })
  },
  update(el: any, binding: any) {
    // 通过对比值的变化判断loading是否显示
    if (binding.oldValue !== binding.value) {
      el.instance.visible = binding.value
    }
  },
  unmounted(el: any) {
    const mask = el.instance.$el
    if (mask.parentNode) {
      mask.parentNode.removeChild(mask)
    }
    el.instance.$destroy()
    el.instance = undefined
  },
}
export default loading
