/***
 * 节流 一段时间内首次触发时立即执行，此时间段内再次触发，不会执行
 *  例：<el-button v-throttle="2000">刷新</el-button>
 *  也可简写成：<el-button v-throttle>刷新</el-button>
 */
const throttle = {
  bind: (el: HTMLElement, binding: { [x: string]: any }) => {
    let throttleTime = binding.value // 防抖时间
    if (!throttleTime) {
      // 用户若不设置防抖时间，则默认2s
      throttleTime = 5000
    }
    let timer
    el.addEventListener(
      'click',
      (event) => {
        if (!timer) {
          // 第一次执行
          timer = setTimeout(() => {
            timer = null
          }, throttleTime)
        } else {
          event && event.stopImmediatePropagation()
        }
      },
      true
    )
  },
}
export default throttle
