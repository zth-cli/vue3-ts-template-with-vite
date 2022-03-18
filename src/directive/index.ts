import debounce from './debounce'
// import throttle from './throttle'
// import copy from './copy'
import dialogDrag from './dialogdrag'
const directives = { debounce, dialogDrag }
export default {
  install: (app) => {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    })
  }
}
