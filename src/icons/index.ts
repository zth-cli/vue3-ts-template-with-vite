import * as icons from '@element-plus/icons-vue'
import { App } from 'vue'

// 全局注册element-plus svg-icons
export default function RegisterIcons(app: App) {
  Object.keys(icons).forEach((key) => {
    app.component(key, icons[key])
  })
}

// 使用
// <el-icon><component is="Avatar" /></el-icon>
// https://www.cnblogs.com/-pdd/p/15617970.html
