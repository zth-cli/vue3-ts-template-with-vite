<template>
  <li class="zth-sub-menu" :style="{ 'padding-left': paddingLeft }" :data-level="subMenu.level">
    <div class="zth-sub-menu__title" @click="handleClick">
      <slot name="title"></slot>
      <el-icon :size="14" class="zth-sub-menu__icon-arrow" :style="{ transform: opened ? 'rotateZ(180deg)' : 'none' }">
        <component is="ArrowDown" />
      </el-icon>
    </div>
    <collapse-transition>
      <ul v-show="opened" class="zth-menu">
        <slot />
      </ul>
    </collapse-transition>
  </li>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { MenuProvider, SubMenuProvider } from './types'
import useMenu from './use-menu'
const instance = getCurrentInstance()!
const { indexPath, parentMenu } = useMenu(
  instance,
  computed(() => props.index)
)
const subMenu = inject<SubMenuProvider>(`subMenu:${parentMenu.value!.uid}`)
const props = defineProps<{ index: any }>()
// inject
const rootMenu = inject<MenuProvider>('rootMenu')
const baseLevelPadding = 20
const paddingLeft = computed(() => (subMenu.level - 1) * baseLevelPadding + 20 + 'px')

const opened = computed(() => rootMenu.openedMenus.includes(props.index))
const handleClick = () => {
  if (rootMenu.props.collapse) {
    return
  }
  rootMenu.handleSubMenuClick({
    index: props.index,
    indexPath: [props.index],
    active: true,
  })
}
// provide
provide<SubMenuProvider>(`subMenu:${instance.uid}`, {
  level: subMenu.level + 1,
})
</script>
<script lang="ts">
export default {
  name: 'SubMenu',
}
</script>
<style lang="scss">
.zth-sub-menu {
  list-style: none;
  margin: 0;
  padding-left: 0;
  .zth-sub-menu__title {
    display: flex;
    align-items: center;
    height: var(--el-menu-item-height);
    line-height: var(--el-menu-item-height);
    font-size: var(--el-menu-item-font-size);
    padding: 0 var(--el-menu-base-level-padding);
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: border-color 0.3s, background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    color: #fff;
    .zth-sub-menu__icon-arrow {
      position: absolute;
      top: 50%;
      right: 20px;
      margin-top: -7px;
      transition: transform 0.3s;
      font-size: 12px;
      margin-right: 0;
      width: inherit;
      text-align: center;
      vertical-align: middle;
    }
    .zth-sub-menu__icon-arrow-open {
      transform: rotateZ(180deg);
    }
  }
}
</style>
