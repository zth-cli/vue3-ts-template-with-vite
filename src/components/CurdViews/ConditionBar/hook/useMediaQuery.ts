import { Ref, ref } from 'vue'

export const useMediaQuery = (tools: Ref<any>, itemRefs: Ref<Array<any>>) => {
  const ellipsis = ref<boolean>(false)
  const toolsMediaQuery = () => {
    // 对查询条件过多，进行条件部分隐藏
    if (tools.value) {
      ellipsis.value = false
      let sonWidth = 0
      const parentWidth = tools.value.offsetWidth // 获取实例元素
      const sonElements = itemRefs.value
      console.log(sonElements)
      if (sonElements.length) {
        sonElements.forEach((item) => {
          sonWidth += Number(item.offsetWidth)
        })
        if (sonWidth >= parentWidth - 50) {
          ellipsis.value = true
        }
      }
    }
  }
  return {
    toolsMediaQuery,
    ellipsis,
  }
}
