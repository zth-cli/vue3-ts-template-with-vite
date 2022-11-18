<template>
  <el-container class="layout">
    <el-aside v-if="menuMode === 'vertical'" width="auto">
      <Menu></Menu>
    </el-aside>
    <el-container style="overflow: hidden; position: relative">
      <el-header class="zth-header">
        <Header></Header>
      </el-header>
      <el-main class="zth-main">
        <Tags v-if="showTags"></Tags>
        <section class="zth-view">
          <MainView />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { Menu } from './Menu'
import { Header } from './Header'
import { MainView } from './Main'
import { Tags } from './TagsView'
import { useConfigStroe } from '@/store/appSetting'
import { useThemeStore } from '@/store/theme'
import { computed } from 'vue'

const themeStroe = useThemeStore()
const configStroe = useConfigStroe()

const menuMode = computed(() => configStroe.menuMode)
const showTags = computed(() => configStroe.tagsBar)
const menuColor = computed(() => (menuMode.value === 'horizontal' ? themeStroe.headerCss : themeStroe.menuCss))
const headerColor = computed(() => themeStroe.headerCss)

const mrt = computed(() => (!showTags.value ? '12px' : '0px'))
const viewHeight = computed(() => (!showTags.value ? '100%' : 'calc(100% - 44px)'))

provide('layout-provide', { menuMode, menuColor, headerColor, showTags })
</script>
<style lang="scss">
.layout {
  height: 100vh;
  overflow: hidden;
  .zth-header {
    padding: 0;
    height: auto;
    box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    transition: all 0.2s ease-in-out;
    z-index: 11;
  }
  .zth-main {
    padding: 0;
    .zth-view {
      box-sizing: border-box;
      padding-top: v-bind('mrt');
      width: 100%;
      height: v-bind('viewHeight');
      overflow: hidden;
    }
  }
}
</style>
