<template>
  <li class="zth-menu-item" :data-level="subMenu.level" :style="{ 'padding-left': paddingLeft }">
    <slot></slot>
  </li>
</template>
<script setup lang="ts">
import { throwError } from '@/utils/error'
import { SubMenuProvider } from './types'
import useMenu from './use-menu'
const instance = getCurrentInstance()!
const props = defineProps<{ index: any }>()
const { parentMenu, indexPath } = useMenu(instance, toRef(props, 'index'))

const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value.uid}`)
if (!subMenu) {
  throwError('MenuItem', '无法注入SubMenu')
}
const baseLevelPadding = 20
const paddingLeft = computed(() => subMenu.level * baseLevelPadding + 20 + 'px')
</script>
<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
<style lang="scss">
.zth-menu-item {
  height: 50px;
  line-height: 50px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-right: 20px;
  list-style: none;
  cursor: pointer;
  position: relative;
  min-width: 200px;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
  color: #fff;
}
</style>
