<template>
  <div class="sidebar-container" :class="{ 'menu-collapse': isCollapse }">
    <div class="slide-logo">
      <!-- <img src="@/assets/img/logo.png" /> -->
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-wraper">
      <SidebarMenu :collapse="isCollapse" :collapse-transition="false" />
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SidebarMenu from './SidebarMenu.vue'
import bus from '@/utils/bus'

const isCollapse = ref<boolean>(false)
bus.on('swithCollapse', (bool: boolean) => {
  isCollapse.value = bool
})
</script>
<style lang="scss">
@import './style.scss';

.slide-logo {
  height: 36px;
  margin-left: 4px;
  // margin-top: 8px;
}
.menu-collapse {
  width: 54px !important;
  overflow: hidden;
  box-sizing: content-box;
}
</style>
