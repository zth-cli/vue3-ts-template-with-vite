import debounce from './debounce'
// import throttle from './throttle'
// import copy from './copy'
import { activeStyle } from './activestyle'
import dialogDrag from './dialogdrag'
import permission from './permission'
const directives = { debounce, dialogDrag, permission, activeStyle }
export default {
  install: (app) => {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
