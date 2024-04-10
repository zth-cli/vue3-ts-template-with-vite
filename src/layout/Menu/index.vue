<template>
  <div
    class="horizontal-menu-main sidebar-container"
    :class="{ isCollapse: isCollapse, 'vertical-menu-main': props.menuMode === 'vertical' }"
  >
    <div v-if="props.menuMode === 'vertical'" class="slide-logo">
      <img src="@/assets/img/logo.png" />
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-wraper">
      <el-menu
        class="sidebar-el-menu"
        :mode="props.menuMode"
        unique-opened
        :collapse="isCollapse"
        :text-color="menuColor.textColor"
        router
      >
        <SidebarItem v-for="(item, index) in routeArr" :key="index" :item="item" :is-collapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, CSSProperties } from 'vue'
import { useMenuStore } from '@/store/menu'
import { SidebarItem } from './sidebarItem'
import bus from '@/utils/bus'

const menuStore = useMenuStore()
const isCollapse = ref<boolean>(false)

const routeArr = computed(() => menuStore.routes)
const { menuColor } = inject<any>('layout-provide')

const props = withDefaults(defineProps<{ menuMode?: 'horizontal' | 'vertical' }>(), {
  menuMode: 'vertical',
})

bus.on('swithCollapse', (bool: boolean) => {
  props.menuMode === 'vertical' ? (isCollapse.value = bool) : ''
})

const getSubMenuIconStyle = computed((): CSSProperties => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: isCollapse.value ? '0 auto' : '0 5px 0 0',
  }
})
</script>
<style lang="scss">
@import './style.scss';

.slide-logo {
  height: 36px;
  margin-left: 4px;
  // margin-top: 8px;
}
.isCollapse {
  width: 54px;
  overflow: hidden;
}
</style>
