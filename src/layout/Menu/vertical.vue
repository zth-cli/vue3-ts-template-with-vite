<template>
  <div class="sidebar-container" :class="{ 'menu-collapse': isCollapse }">
    <div class="slide-logo">
      <Logo />
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-wraper">
      <SidebarMenu :collapse="isCollapse" :default-active="defaultActive" :collapse-transition="false" />
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { useDefaultActive } from './hooks/useDefaultActive'
import { Logo } from '@/layout/Logo'
import SidebarMenu from './SidebarMenu.vue'
import { useAppStore } from '@/store/modules/app'

const configStroe = useAppStore()
const isCollapse = computed(() => configStroe.collapse)
const isTablet = computed(() => configStroe.isTablet)
watch(isTablet, (val) => {
  if (val) {
    configStroe.collapse = val
  }
})

const { defaultActive } = useDefaultActive()
</script>
<style lang="scss">
@import './style.scss';
.sidebar-container {
  width: 208px;
  height: 100%;
  overflow: visible;
  font-size: 0;
  background-color: var(--menu-background);
  border-right: 1px solid var(--el-border-color-lighter);
  transition: width 0.2s ease-in;
  .el-scrollbar.sidebar-wraper {
    height: calc(100% - 60px);
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }
}
.slide-logo {
  width: 100%;
  height: 48px;
  color: var(--menu-text);
}
.menu-collapse {
  width: 54px !important;
  overflow: hidden;
  box-sizing: content-box;
}
</style>
