/***
 * 防抖 单位时间只触发最后一次
 *  例：<el-button v-antiSnake>刷新</el-button>
 *  也可简写成：<el-button v-debounce>刷新</el-button>
 */
const debounce = (el: HTMLElement, binding: { arg: any; value: () => void }) => {
  const deTime = binding.arg ? binding.arg : 1000
  let timer
  el.addEventListener('click', () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      binding.value()
    }, deTime)
  })
}
export default debounce
