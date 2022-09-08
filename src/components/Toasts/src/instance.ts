import { createApp, App, ComponentPublicInstance } from 'vue'
import Toasts from './toasts.vue'

type publicInstance = ComponentPublicInstance & { id?: string; visible?: boolean }
const instances: publicInstance[] = []
let seed = 1

const toasts = (options) => {
  // 创建父容器
  const id = `toasts_${seed++}`
  const root: HTMLDivElement = document.createElement('div')
  root.setAttribute('data-id', id)
  document.body.appendChild(root)
  const ToastsApp: App = createApp(Toasts, {
    ...options,
    close: (id: string) => {
      if (instance.id === id) {
        removeInstance(instance)
        document.body.removeChild(root)
        ToastsApp.unmount()
      }
    },
  })
  const instance: publicInstance = ToastsApp.mount(root) // 返回根组件实例
  console.log(instance)

  instance.id = id

  instance.visible = true
  // 重制高度
  let verticalOffset = 0
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  //@ts-ignore
  instance.toastPosition.y = verticalOffset

  instances.push(instance)
  return instance
}

export default toasts

const removeInstance = (instance) => {
  if (!instance) {
    return
  }
  const len = instances.length
  const index = instances.findIndex((item) => {
    return item.id === instance.id
  })
  instances.splice(index, 1)
  if (len <= 1) {
    return
  }
  const h = instance.height
  for (let i = index; i < len - 1; i++) {
    //@ts-ignore
    instances[i].toastPosition.y = parseInt(instances[i].toastPosition.y - h - 16)
  }
}
