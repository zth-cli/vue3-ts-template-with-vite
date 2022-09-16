<template>
  <collapse-transition>
    <ul :class="['zth-menu', { 'zth-menu--collapse': collapse }]">
      <slot></slot>
    </ul>
  </collapse-transition>
</template>
<script setup lang="ts">
import { h, ref } from 'vue'
import { MenuProvider } from './types'
type menuProps = { mode?: boolean; uniqueOpened?: boolean; collapse?: boolean }
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
// 菜单是否时收起状态或者水平菜单
const isMenuPopup = computed<MenuProvider['isMenuPopup']>(() => {
  return props.collapse
})
watch(
  () => props.collapse,
  (value) => {
    if (value) {
      openedMenus.value = []
    }
  }
)
provide('rootMenu', reactive({ props, openedMenus, isMenuPopup, handleSubMenuClick }))
</script>
<script lang="ts">
export default {
  name: 'ZthMenu',
}
</script>
<style lang="scss">
.zth-menu {
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #001529;
  box-sizing: border-box;
  color: #fff;
  transition: all 0.3s;
  i {
    margin-right: 5px;
    width: 24px;
  }
}
.zth-menu--collapse {
  width: 64px;
}
</style>
