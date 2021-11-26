<template>
  <el-container class="layout">
    <el-aside width="auto">
      <Menu></Menu>
    </el-aside>
    <el-container style="overflow: hidden; position: relative">
      <el-header class="zth-header">
        <Header></Header>
      </el-header>
      <el-main class="zth-main">
        <!-- <Tags></Tags> -->
       <MainView/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { Menu } from './Menu'
import { Header } from './Header'
import { MainView } from './Main'
import { Tags } from './Tags'
</script>
<style lang="scss">
.layout {
  height: 100vh;
  overflow: hidden;
  .zth-header {
    padding: 0;
    height: auto;
  }
  .zth-main {
    padding: 0;
  }
}
</style>
