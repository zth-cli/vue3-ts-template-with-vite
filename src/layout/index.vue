<template>
  <el-container class="layout">
    <el-aside width="auto">
      <Slidebar></Slidebar>
    </el-aside>
    <el-container style="overflow: hidden;position: relative;">
      <el-header class="zth-header">
        <Header></Header>
      </el-header>
      <el-main class="zth-main">
        <!-- <Tags></Tags> -->
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component class="child-view" :is="Component" />
            <!-- <keep-alive>
              
            </keep-alive> -->
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { RouterView } from "vue-router"
import Slidebar from "./Slidebar.vue";
import Header from "./Header.vue";
import Tags from "./Tags.vue";
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
