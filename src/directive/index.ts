import debounce from './debounce'
import throttle from './throttle'
import copy from './copy'
import activeStyle from './activestyle'
import dragable from './dragable'
import resize from './resize'
import dialogDrag from './dialogdrag'
import auth from './permission'
import { App } from 'vue'
const directives = { debounce, throttle, dialogDrag, copy, dragable, resize, auth, activeStyle }
export default {
  install: (app: App) => {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
