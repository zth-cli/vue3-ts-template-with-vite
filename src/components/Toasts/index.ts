import toast from './src/instance'
import Toast from './src/toasts.vue'
import { App } from 'vue'
export default (app: App) => {
  app.component(Toast.name, Toast)
  app.config.globalProperties.$Toast = toast
}
