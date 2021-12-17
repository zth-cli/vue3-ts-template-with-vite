import toast from './instance'
import Toast from './toasts.vue'
import { App } from 'vue'
export default (app: App) => {
  app.component(Toast.name, Toast)
  app.config.globalProperties.$Toast = toast
}
