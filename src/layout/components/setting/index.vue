<template>
  <Panel v-bind="$attrs">
    <ul class="theme-list">
      <li class="theme-item">
        <el-divider><p>导航栏模式</p></el-divider>
        <MenuMode />
      </li>
      <li class="theme-item">
        <el-divider><p>系统主题</p></el-divider>
        <SysTheme />
      </li>
      <li class="theme-item">
        <el-divider><p>界面显示</p></el-divider>
        <PageSetting />
      </li>
    </ul>
  </Panel>
</template>
<script setup lang="ts">
import Panel from '../panel/inde.vue'
import MenuMode from './components/menu-mode.vue'
import SysTheme from './components/sys-theme.vue'
import PageSetting from './components/page-setting.vue'
import { ref } from 'vue'
const msg = ref('Hello World!')
</script>
<style lang="scss">
@import './style.scss';
</style>
