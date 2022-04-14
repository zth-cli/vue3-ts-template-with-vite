import debounce from './debounce'
// import throttle from './throttle'
// import copy from './copy'
import dialogDrag from './dialogdrag'
import permission from './permission'
const directives = { debounce, dialogDrag, permission }
export default {
  install: (app) => {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  },
}
