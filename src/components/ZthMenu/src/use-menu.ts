import { computed } from 'vue'

import type { ComponentInternalInstance, Ref } from 'vue'

export default function useMenu(instance: ComponentInternalInstance, currentIndex: Ref<string>) {
  const indexPath = computed(() => {
    let parent = instance.parent!
    const path = [currentIndex.value]
    while (parent.type.name !== 'ZthMenu') {
      if (parent.props.index) {
        path.unshift(parent.props.index as string)
      }
      parent = parent.parent!
    }
    return path
  })

  // 返回父级实例['ZthMenu', 'SubMenu']
  const parentMenu = computed(() => {
    let parent = instance.parent
    while (parent && !['ZthMenu', 'SubMenu'].includes(parent.type.name!)) {
      parent = parent.parent
    }
    return parent!
  })

  return {
    parentMenu,
    indexPath,
  }
}
