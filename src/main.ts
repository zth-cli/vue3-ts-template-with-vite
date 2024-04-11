import { createApp } from 'vue'
import pinia from '@/store'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from '@vueuse/motion'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/es/components/message/style/css'
import './styles/index.scss'
import directives from './directive'
// 安装toasts
import toasts from './components/Toasts'
import RegisterIcons from './icons/index'
import { Playground } from './components/Playground'

const app = createApp(App)

RegisterIcons(app)
app.component('Playground', Playground)
app.use(pinia)
app.use(toasts)
app.use(router)
app.use(MotionPlugin)
app.use(directives)
app.mount('#app')
