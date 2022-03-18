import { createApp, App } from 'vue'
import Toasts from './toasts.vue'
import Bus from './toastsBus'

const instances = []
let seed = 1

const toasts = (options) => {
  // 创建父容器
  const id = `toasts_${seed++}`
  const root: HTMLDivElement = document.createElement('div')
  root.setAttribute('data-id', id)
  document.body.appendChild(root)
  const ToastsConstructor: App = createApp(Toasts, options)
  const instance = ToastsConstructor.mount(root)
  //@ts-ignore
  instance.id = id
  //@ts-ignore
  instance.visible = true
  // 重制高度
  let verticalOffset = 0
  instances.forEach((item) => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  //@ts-ignore
  instance.toastPosition.y = verticalOffset

  Bus.on('closed', (id) => {
    //@ts-ignore
    if (instance.id === id) {
      removeInstance(instance)
      document.body.removeChild(root)
      ToastsConstructor.unmount()
    }
  })
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
