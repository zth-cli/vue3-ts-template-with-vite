import type { Directive, DirectiveBinding } from 'vue'
/**
 * @description 拖拽指令
 * @example <div v-dragable>
 */
const dragable: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 如果传递了false就不启用指令，反之true undefined null 不传 则启动
    if (!binding.value && (binding.value ?? '') !== '') {
      return
    }
    // 判断拖拽的元素是否是绝对定位
    if (getComputedStyle(el).position !== 'absolute') {
      el.style.position = 'absolute'
    }
    // 设置不可选中
    el.style.userSelect = 'none'
    el.onmousedown = (eve: MouseEvent) => {
      el.style.zIndex = '1' //当前拖拽的在最前面显示
      const mx = eve.pageX //鼠标点击时的坐标
      const my = eve.pageY //鼠标点击时的坐标
      const dleft = el.offsetLeft //窗口初始位置
      const dtop = el.offsetTop
      const clientWidth = document.documentElement.clientWidth //页面的宽
      const oWidth = el.clientWidth //窗口的宽
      const maxX = clientWidth - oWidth // x轴能移动的最大距离
      const clientHeight = document.documentElement.clientHeight //页面的高
      const oHeight = el.clientHeight //窗口的高度
      const maxY = clientHeight - oHeight //y轴能移动的最大距离
      document.onmousemove = (e: any) => {
        e.preventDefault
        const x = e.pageX
        const y = e.pageY
        let left = x - mx + dleft //移动后的新位置
        let top = y - my + dtop //移动后的新位置
        if (left < 0) {
          left = 0
        }
        if (left > maxX) {
          left = maxX
        }
        if (top < 0) {
          top = 0
        }
        if (top > maxY) {
          top = maxY
        }

        el.style.left = left + 'px'
        el.style.top = top + 'px'
        el.style.marginLeft = '0'
        el.style.marginTop = '0'
      }
      document.onmouseup = () => {
        document.onmousemove = null
        el.style.userSelect = ''
      }
    }
  },
}
export default dragable
