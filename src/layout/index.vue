<template>
  <el-container :class="['zth-layout', { 'zth-layout-mobile': isMobile }]">
    <SidebarContainer v-if="isVertical || isMobile">
      <Vertical />
    </SidebarContainer>
    <el-container class="zth-container">
      <el-header class="zth-header">
        <Header :is-horizontal="isHorizontal" />
      </el-header>
      <el-main class="zth-main">
        <Tags v-if="showTags" />
        <section class="zth-view">
          <MainView :is-horizontal="isHorizontal" />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Vertical from './Menu/vertical.vue'
import { SidebarContainer } from './SidebarContainer'
import { Header } from './Header'
import { MainView } from './Main'
import { Tags } from './Tags'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

const configStroe = useAppStore()
const menuMode = computed({
  get: () => configStroe.menuMode,
  set: (val) => {
    configStroe.menuMode = val
  },
})
const showTags = computed(() => configStroe.showTag)

const isMobile = computed(() => configStroe.isMobile)
const isCollapse = computed({
  get: () => configStroe.collapse,
  set: (val) => {
    configStroe.collapse = val
  },
})
const isVertical = computed(() => menuMode.value === 'vertical')
const isHorizontal = computed(() => menuMode.value === 'horizontal')

const marginLeft = computed(() => {
  return isMobile.value || isHorizontal.value ? '0' : isCollapse.value ? '54px' : '208px'
})

provide('layout-provide', { isVertical, isHorizontal, isCollapse, isMobile, menuMode })
</script>
<style lang="scss">
.zth-layout {
  height: 100vh;
  overflow: hidden;
  position: relative;
  .zth-header {
    padding: 0;
    height: auto;
    // box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: all 0.2s ease-in-out;
    z-index: 11;
  }
  .zth-container {
    height: 100vh;
    margin-left: v-bind('marginLeft');
    min-height: 100%;
    position: relative;
    transition: margin-left 0.2s ease-in;
  }
  .zth-main {
    padding: 0;
    display: flex;
    flex-direction: column;
    .zth-view {
      position: relative;
      box-sizing: border-box;
      overflow-x: hidden;
      width: 100%;
      flex: 1;
    }
  }
}
.hiden-sidebar-layout {
  .zth-container {
    margin-left: 54px !important;
  }
}
</style>
