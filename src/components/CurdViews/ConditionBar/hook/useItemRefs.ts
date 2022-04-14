import { onBeforeUpdate, onUpdated } from 'vue'

export const useItemRefs = () => {
  let itemRefs = []
  const setItemRef = (el: any) => {
    if (el) {
      itemRefs.push(el)
    }
  }
  onBeforeUpdate(() => {
    itemRefs = []
  })
  onUpdated(() => {
    // console.log(itemRefs)
  })
  return {
    itemRefs,
    setItemRef,
  }
}
