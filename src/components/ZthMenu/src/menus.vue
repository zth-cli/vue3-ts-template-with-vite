<template>
  <zth-menu>
    <template v-for="(item, index) in model" :key="index">
      <sub-menu v-if="item.children?.length" :index="item.id" :data="item.children">
        <template #title>
          <el-icon :size="20">
            <component is="setting" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
      </sub-menu>
      <menu-item v-else :index="item.id">
        {{ item.title }}
      </menu-item>
    </template>
  </zth-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { MenuProvider } from './types'
type menuProps = { model: Array<any>; mode?: boolean; uniqueOpened?: boolean }
const emit = defineEmits(['close', 'open'])
const props = defineProps<menuProps>()
// 展开菜单id唯一标识集合
const openedMenus = ref<MenuProvider['openedMenus']>([])
// 展开菜单
const openMenu = (index, indexPath) => {
  if (openedMenus.value.includes(index)) {
    return
  }
  // 将不在该菜单路径下的其余菜单收起
  openedMenus.value.push(index)
  emit('open', index, indexPath)
}
// 折叠菜单
const closeMenu = (index, indexPath) => {
  const i = openedMenus.value.indexOf(index)
  if (i !== -1) {
    openedMenus.value.splice(i, 1)
  }
  emit('close', index, indexPath)
}

// 点击subMenu方法
const handleSubMenuClick = ({ index, indexPath }) => {
  const isOpened = openedMenus.value.includes(index)

  if (isOpened) {
    closeMenu(index, indexPath)
  } else {
    openMenu(index, indexPath)
  }
}
</script>
<script lang="ts">
export default {
  name: 'ZthMenus',
}
</script>
