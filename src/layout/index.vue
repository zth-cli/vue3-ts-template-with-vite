<template>
  <el-container class="layout">
    <el-aside v-if="menuMode === 'vertical'" width="auto">
      <Vertical></Vertical>
    </el-aside>
    <el-container style="overflow: hidden; position: relative">
      <el-header class="zth-header">
        <Header :menu-mode="menuMode"></Header>
      </el-header>
      <el-main class="zth-main">
        <Tags v-if="showTags"></Tags>
        <section class="zth-view">
          <MainView :menu-mode="menuMode" />
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Vertical from './Menu/vertical.vue'
import { Header } from './Header'
import { MainView } from './Main'
import { Tags } from './TagsView'
import { useConfigStroe } from '@/store/modules/appSetting'
import { computed } from 'vue'

const configStroe = useConfigStroe()

const menuMode = computed(() => configStroe.menuMode)
const showTags = computed(() => configStroe.showTag)
provide('layout-provide', { menuMode, showTags })
</script>
<style lang="scss">
.layout {
  height: 100vh;
  overflow: hidden;
  .zth-header {
    padding: 0;
    height: auto;
    // box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
    border-bottom: 1px solid var(--el-border-color-lighter);
    transition: all 0.2s ease-in-out;
    z-index: 11;
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
</style>
